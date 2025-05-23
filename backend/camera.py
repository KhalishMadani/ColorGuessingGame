import eel
import cv2
import base64



cam = None
color = "undefined"
hue_value = None

@eel.expose
def open_cam():
    global cam
    global hue_value

    if cam is None or not cam.isOpened():
        cam = cv2.VideoCapture(0)

    ret, frame = cam.read()
    hsv_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    if not ret:
        return ""
    
    height, width, _ = frame.shape
    center_x = int(width/2)
    center_y = int(height/2)
    pixel_center = hsv_frame[center_y, center_x]
    
    hue_value = pixel_center[0]
    color = "undefined"

    if hue_value <5:
        color = "red"
    elif hue_value < 22:
        color = "orange"
    elif hue_value < 33:
        color = "yellow"
    else:
        color = "violet"

    #custom circle
    radius = 15
    color_frame = (255, 0, 0)
    thickness = 3

    pixel_center_bgr = frame[center_y, center_x]
    b, g, r = int(pixel_center_bgr[0]), int(pixel_center_bgr[1]), int(pixel_center_bgr[2])
    cv2.putText(frame, color, (18, 58), 0, 1.5, (b, g, r), 2)
    cv2.circle(
        frame,
        (center_x, center_y),
        radius,
        color_frame,
        thickness
    )

    _, buffer = cv2.imencode('.jpg', frame)
    encoded = base64.b64encode(buffer).decode('utf-8')
    return f'data:image/jpeg;base64,{encoded}'

@eel.expose
def get_color():
    global color
    global hue_value

    color_range = {
        "red": [0, 5],
        "orange": [5, 22],
        "yellow": [22, 33],
    }

    for color_name, hue in color_range.items()

@eel.expose
def close_cam():
    global cam
    if cam is not None:
        cam.release()
        cam = None