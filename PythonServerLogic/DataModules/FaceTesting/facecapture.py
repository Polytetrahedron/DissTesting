import cv2
import dlib
import numpy as np
import pickle
import time
import os

cascade = cv2.CascadeClassifier("./DataModules/FaceTesting/data/haarcascade_frontalface_alt2.xml")
#recognizer = cv2.face.LBPHFaceRecognizer_create()
# recognizer.read()

# labels = {}
# with open("./FaceUnlocking/TrainingData/training-labels.pkl", 'rb') as f:
#     loaded_labels = pickle.load(f)
#     labels = {v:k for k,v in loaded_labels.items()}
#     print(labels)

def run_analyser(user:str = None):

    picturecounter = 0
    breakout = False

    video_capture = cv2.VideoCapture(0)

    while(breakout == False):
    #ret is a retrun code that indicates end of frames (webcams dont run out of frames so this isn't used)
        ret, frame = video_capture.read() 
    
    # this converts the image in the frame to grayscale this is standard practice in fce detection
        greyscale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = cascade.detectMultiScale(greyscale, scaleFactor=1.1, minNeighbors=5) 
        # This detects objects in the frame and returns a list of rectangles, this will be used on the grey image, scale factor shrinks the image in order to compensate for distance between the user and the camera. the minimum neighbors is the number of supplementary objects required close to each other in order to correctly detect a face.

        # tuple containing the x and y of the rectangle in the frame and also the width and height of the rectangle
        for(x,y,w,h) in faces:
            region_of_interest = greyscale[y:y+h, x:x+w] # detecting region of interest in the frame i.e. the face in the frame
            #id_, dist = recognizer.predict(region_of_interest)
            if picturecounter != 100:
                image = './DataModules/FaceTesting/images/' + user + '/' + str(picturecounter) + ".png" # name of the file
                cv2.imwrite(image, region_of_interest) # writing the captured roi to a file
                picturecounter += 1
                print("Scanning face: " + str(picturecounter) + "%")
            elif picturecounter == 100:
                video_capture.release()
                cv2.destroyAllWindows()
                #tc.generate_training_data(user)
                breakout = True
                break
        #cv2.imshow('frame', frame)

# def run_unlock():

#     video_capture = cv2.VideoCapture(0)
#     positive_id = []

#     while True:
#         ret, frame = video_capture.read() 
#         greyscale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = cascade.detectMultiScale(greyscale, scaleFactor=1.1, minNeighbors=5) 
#         for(x,y,w,h) in faces:
#             region_of_interest = greyscale[y:y+h, x:x+w]
#             id_, dist = recognizer.predict(region_of_interest)
#             print(id_)
#             print(dist)
#             if dist <= 60 : # if the distance is acceptable
#                 positive_id.append(dist)
#                 print(labels[id_])
#             if len(positive_id) == 10:
#                 return True



#run_analyser('User11')
#run_unlock()