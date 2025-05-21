import cv2

cap = cv2.VideoCapture(0)
while True:
    _, frame = cap.read()
    height, width, _ = frame.shape

    center_x = int(width/2)
    center_y = int(height/2)

    pixel_center = frame[center_y, center_x]
    print(f"Pixel at center: {pixel_center}")
    cv2.circle(frame, (center_x, center_y), 5, (0, 255, 0))

    cv2.imshow('frame', frame)
    
    key = cv2.waitKey(1)
    if key == 27:
        break
cap.release()
cv2.destroyAllWindows()