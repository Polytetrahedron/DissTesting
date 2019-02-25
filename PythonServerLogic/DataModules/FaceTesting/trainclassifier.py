import os
from PIL import Image
import pickle
import numpy as np
import cv2
from sklearn import svm, metrics

def generate_training_data():
    
    cascade = cv2.CascadeClassifier("./DataModules/FaceTesting/data/haarcascade_frontalface_alt2.xml")
    recognizer = cv2.face.LBPHFaceRecognizer_create()

    current_dir = os.path.dirname(os.path.abspath(__file__))
    #images = os.path.join(current_dir, "images")
    images = './DataModules/FaceTesting/images'

    y_label = []
    x_train = []
    current_id = 1
    label_ids = {}

    for root, dirs, files in os.walk(images):
        for file in files:
            if file.endswith("png"): # find all the image files
                path = os.path.join(root, file)
                label = os.path.basename(os.path.dirname(path).replace(" ", "-"))
                if not label in label_ids:
                    label_ids[label] = current_id
                    current_id +=1
                    print(label_ids)
                id_ = label_ids[label]
                processed_image = Image.open(path).convert('L') #greyscale is used because it is easier to work with than colour images and much faster in terms of processing speed, this is important as I am building a real time system.
                final_image = processed_image.resize((550, 550), Image.ANTIALIAS)
                convert_array = np.array(final_image,"uint8")
                face_detect = cascade.detectMultiScale(convert_array, scaleFactor = 1.1, minNeighbors = 5)
                for(x,y,w,h) in face_detect:
                    region_of_interest = convert_array[y:y+h, x:x+w]
                    x_train.append(region_of_interest)
                    y_label.append(id_)
    with open("training-labels.pkl", 'wb') as f:
        pickle.dump(label_ids, f)

    recognizer.train(x_train, np.array(y_label))
    recognizer.save("./DataModules/FaceTesting/train.yml")
    print(label_ids)

#generate_training_data()