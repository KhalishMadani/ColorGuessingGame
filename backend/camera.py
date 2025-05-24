import eel
import cv2
import base64



cam = None
colors = "undefined"
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
    get_color()

    _, buffer = cv2.imencode('.jpg', frame)
    encoded = base64.b64encode(buffer).decode('utf-8')
    return f'data:image/jpeg;base64,{encoded}'

@eel.expose
def get_color():
    global colors
    global hue_value

    color_range = {
        "Merah": [0, 5],
        "Oren": [5, 22],
        "Kuning": [22, 33],
        "Hijau Muda": [33, 46],
        "Hijau": [46, 70],
        "Biru Muda": [71, 97],
        "Biru": [98, 128],
        "Ungu": [129, 152],
        "Pink": [153, 169],
    }

    for key in color_range:
        if hue_value >= color_range[key][0] and hue_value <= color_range[key][1]:
            colors = key
            break
    print(f'hue : {hue_value}, color : {colors}')


@eel.expose
def close_cam():
    global cam
    if cam is not None:
        cam.release()
        cam = None