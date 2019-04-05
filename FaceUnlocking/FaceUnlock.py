import cv2
import grpc
import Comms_pb2
import Comms_pb2_grpc
import numpy as np
import pickle
import time
import os
from NetworkTools import IPExtractor

cascade = cv2.CascadeClassifier("./data/haarcascade_frontalface_alt2.xml")
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("./TrainingData/train.yml")

labels = {}
with open("./TrainingData/training-labels.pkl", 'rb') as f:
    loaded_labels = pickle.load(f)
    labels = {v:k for k,v in loaded_labels.items()}
    print(labels)

def notify_server(user_id:str = None):
    ip = IPExtractor.extract_local_IP()
    with grpc.insecure_channel(ip + ':4536') as channel:
        stub = Comms_pb2_grpc.ConnectionCommsStub(channel)
        response = stub.FaceUnlock(Comms_pb2.UnlockRequest(user=user_id))
    

def run_unlock():

    video_capture = cv2.VideoCapture(0)
    positive_id = []

    while True:
        ret, frame = video_capture.read() 
        greyscale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = cascade.detectMultiScale(greyscale, scaleFactor=1.1, minNeighbors=5) 
        for(x,y,w,h) in faces:
            region_of_interest = greyscale[y:y+h, x:x+w]
            id_, dist = recognizer.predict(region_of_interest)
            print(id_)
            print(dist)
            if dist <= 60 : # if the distance is acceptable
                positive_id.append(dist)
                print(labels[id_])
            if len(positive_id) == 10:
                notify_server(labels[id_])
                positive_id.clear()
                time.sleep(60)
        
run_unlock()