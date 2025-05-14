import eel
import argparse
import numpy as np
import cv2

eel.init('web')

@eel.expose
def sample_text():
    return 'Hello from Py!'

@eel.expose
def receive_data(msg):
    print(msg)

eel.start('index.html', size=(800, 600))