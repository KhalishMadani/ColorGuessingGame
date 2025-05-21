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
    
    height, width, _ = frame.shape
    center_x = int(width/2)
    center_y = int(height/2)
    pixel_center = frame[center_y, center_x]
    print(f"Pixel at center: {pixel_center}")

    #custom circle
    radius = 25
    color = (255, 0, 0)
    thickness = 2

    
    cv2.circle(
        frame,
        (center_x, center_y),
        radius,
        color,
        thickness
    )

    _, buffer = cv2.imencode('.jpg', frame)
    encoded = base64.b64encode(buffer).decode('utf-8')
    return f'data:image/jpeg;base64,{encoded}'

@eel.expose
def close_cam():
    global cam
    if cam is not None:
        cam.release()
        cam = None