import cv2
import numpy as np

def nothing(x):
    pass

# trackbar
cv2.namedWindow('frame')
cv2.createTrackbar('H', 'frame', 0, 179, nothing)
cv2.createTrackbar('S', 'frame', 255, 255, nothing)
cv2.createTrackbar('V', 'frame', 255, 255, nothing)
