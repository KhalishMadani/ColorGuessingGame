import eel
import argparse
import numpy as np
import cv2
import base64

eel.init('web')

@eel.expose
def sample_text():
    return 'Hello from Py!'

@eel.expose
def receive_data(msg):
    print(msg)

cam = cv2.VideoCapture(0)
@eel.expose
def open_cam():
    ret, frame = cam.read()
    if not ret:
        return ""
    _, buffer = cv2.imencode('.jpg', frame)
    encoded = base64.b64encode(buffer).decode('utf-8')
    return f'data:image/jpeg;base64,{encoded}'

# @eel.expose
# def close_cam():
#     return cam.release()
    

eel.start('index.html', size=(800, 600))
cam.release()