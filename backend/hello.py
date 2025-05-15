import eel

@eel.expose
def sample_text():
    return 'Hello from Py!'

@eel.expose
def receive_data(msg):
    print(msg)