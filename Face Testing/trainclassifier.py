import os
from PIL import Image
import pickle
import numpy as np
import cv2
from sklearn import svm, metrics

cascade = cv2.CascadeClassifier("data/haarcascade_frontalface_alt.xml")
recognizer = cv2.face.LBPHFaceRecognizer_create()

current_dir = os.path.dirname(os.path.abspath(__file__))
images = os.path.join(current_dir, "images")

y_label = []
x_train = []
current_id = 0
label_ids = {}

for root, dirs, files in os.walk(images):
    for file in files:
        if file.endswith("png") or file.endswith("jpg"): # find all the image files
            path = os.path.join(root, file)
            label = os.path.basename(os.path.dirname(path).replace(" ", "-").lower())
            if not label in label_ids:
                label_ids[label] = current_id
                print(label_ids)
            id_ = current_id
            processed_image = Image.open(path).convert('L') #greyscale is used because it is easier to work with than colour images and much faster in terms of processing speed, this is important as I am building a real time system.
            final_image = processed_image.resize((550, 550), Image.ANTIALIAS)
            convert_array = np.array(final_image,"uint8")
            print(convert_array)
            face_detect = cascade.detectMultiScale(convert_array, scaleFactor = 1.1, minNeighbors = 5)
            for(x,y,w,h) in face_detect:
                region_of_interest = convert_array[y:y+h, x:x+w]
                x_train.append(region_of_interest)
                y_label.append(id_)
with open("training-labels.pkl", 'wb') as f:
    pickle.dump(label_ids, f)

clf = svm.OneClassSVM()
clf.fit(x_train)

recognizer.train(x_train, np.array(y_label))
recognizer.save("train.yml")
