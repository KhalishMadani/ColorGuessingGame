import eel
import cv2
import base64



cam = None
@eel.expose
def open_cam():
    global cam
    if cam is None or not cam.isOpened():
        cam = cv2.VideoCapture(0)

    ret, frame = cam.read()
    if not ret:
        return ""
    _, buffer = cv2.imencode('.jpg', frame)
    encoded = base64.b64encode(buffer).decode('utf-8')
    return f'data:image/jpeg;base64,{encoded}'

@eel.expose
def close_cam():
    global cam
    if cam is not None:
        cam.release()
        cam = None