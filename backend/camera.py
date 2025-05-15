import eel
import cv2
import base64


cam = cv2.VideoCapture(0)

@eel.expose
def open_cam():
    ret, frame = cam.read()
    if not ret:
        return ""
    _, buffer = cv2.imencode('.jpg', frame)
    encoded = base64.b64encode(buffer).decode('utf-8')
    return f'data:image/jpeg;base64,{encoded}'

@eel.expose
def close_cam():
    return cam.release()