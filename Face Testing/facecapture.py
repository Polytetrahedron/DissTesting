import cv2
import dlib
import numpy as np
import pickle

create_user_mode = False
picturecounter = 0


cascade = cv2.CascadeClassifier("data/haarcascade_frontalface_alt2.xml")
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("train.yml")

labels = {}
with open("training-labels.pkl", 'rb') as f:
    loaded_labels = pickle.load(f)
    labels = {v:k for k,v in loaded_labels.items()}
    print(labels)

video_capture = cv2.VideoCapture(0)

while(True):
   #ret is a retrun code that indicates end of frames (webcams dont run out of frames so this isn't used)
    ret, frame = video_capture.read() 
   
   # this converts the image in the frame to grayscale this is standard practice in fce detection
    greyscale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    faces = cascade.detectMultiScale(greyscale, scaleFactor=1.1, minNeighbors=5) 
    # This detects objects in the frame and returns a list of rectangles, this will be used on the grey image, scale factor shrinks the image in order to compensate for distance between the user and the camera. the minimum neighbors is the number of supplementary objects required close to each other in order to correctly detect a face.

    # tuple containing the x and y of the rectangle in the frame and also the width and height of the rectangle
    for(x,y,w,h) in faces:
        region_of_interest = greyscale[y:y+h, x:x+w] # detecting region of interest in the frame i.e. the face in the frame
        id_, dist = recognizer.predict(region_of_interest) # make a prediction on who is there
        image = str(picturecounter) + ".png" # name of the file
        cv2.imwrite(image, region_of_interest) # writing the captured roi to a file
        picturecounter += 1
        print(id_)
        print(dist)
        if dist <= 60 : # if the distance is acceptable
            print(labels[id_])
            font = cv2.FONT_HERSHEY_SIMPLEX
            name = labels[id_]
            colour1 = (255,255,255)
            #colour2 = (0,0,255)
            stroke = 2 
            # width = x+w 
            # height = y+h
            # cv2.rectangle(frame, (x, y), (width, height), colour2, stroke)
            cv2.putText(frame, name, (x,y), font, 1, colour1, stroke, cv2.LINE_AA)

        colour2 = (0,0,255)
        width = x+w 
        height = y+h
        stroke = 2 
        cv2.rectangle(frame, (x, y), (width, height), colour2, stroke)
    cv2.imshow("frame", frame)
    if cv2.waitKey(20) & 0xFF == ord('q'):
        break
video_capture.release()
cv2.destroyAllWindows()


