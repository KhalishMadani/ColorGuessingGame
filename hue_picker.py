import cv2
import numpy as np

def nothing(x):
    pass

# trackbar
cv2.namedWindow('frame', cv2.WINDOW_NORMAL)
cv2.createTrackbar('H', 'frame', 0, 179, nothing)
cv2.createTrackbar('S', 'frame', 255, 255, nothing)
cv2.createTrackbar('V', 'frame', 255, 255, nothing)

img_hsv = np.zeros((300, 512, 3), np.uint8)

while True:
    # create a black image
    img_hsv[:] = (0, 0, 0)

    # get the current positions of the trackbars
    h = cv2.getTrackbarPos('H', 'frame')
    s = cv2.getTrackbarPos('S', 'frame')
    v = cv2.getTrackbarPos('V', 'frame')

    # set the hue, saturation, and value
    img_hsv[:] = (h, s, v)

    # convert to BGR color space
    img_bgr = cv2.cvtColor(img_hsv, cv2.COLOR_HSV2BGR)

    # show the image
    cv2.imshow('frame', img_bgr)

    if cv2.waitKey(1) & 0xFF == 27:  # ESC key to exit
        break

cv2.destroyAllWindows()