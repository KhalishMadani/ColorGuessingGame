import eel
import cv2
import base64



cam = None
colors = "undefined"
hue_value = None
sat_value = None
val_value = None

@eel.expose
def open_cam():
    global cam, colors, hue_value, sat_value, val_value

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
    
    h, s, v = pixel_center
    hue_value = int(h)
    sat_value = int(s)
    val_value = int(v)

    #custom circle
    radius = 15
    color_frame = (255, 0, 0)
    thickness = 3

    pixel_center_bgr = frame[center_y, center_x]
    b, g, r = int(pixel_center_bgr[0]), int(pixel_center_bgr[1]), int(pixel_center_bgr[2])

    cv2.putText(frame, colors, (18, 58), 0, 1.5, (b, g, r), 2)

    text = f"{colors} | H:{hue_value} S:{sat_value} V:{val_value}"
    cv2.putText(frame, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (b, g, r), 2)


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
    global hue_value, sat_value, val_value

    if sat_value < 50 and val_value > 200:
        colors = "Putih"
        return
    elif val_value < 50:
        colors = "Hitam"
        return
    elif sat_value < 50:
        colors = "Abu-abu"
        return

    color_range = {
        "Merah": (0, 10),
        "Oren": (11, 20),
        "Kuning": (21, 30),
        "Hijau Muda": (31, 45),
        "Hijau": (46, 75),
        "Biru Muda": (76, 90),
        "Biru": (91, 130),
        "Ungu": (131, 150),
        "Pink": (151, 170),
        "Merah Tua": (171, 180)
    }

    for key, (min, max) in color_range.items():
        if min <= hue_value <= max:
            colors = key
            break
    print(f'hue : {hue_value}, color : {colors}')


@eel.expose
def close_cam():
    global cam
    if cam is not None:
        cam.release()
        cam = None