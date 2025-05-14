const h1Element = document.getElementById('h1-element');
const getBtn = document.getElementById('get-py')
const sendBtn = document.getElementById('send-js')
const cameradBtn = document.getElementById('camera-btn')
const imgCamLocation = document.getElementById('cam-img')
const closeCamBtn = document.getElementById('close-cam-btn')


getBtn.addEventListener('click', async () => {
    h1Element.innerText = await eel.sample_text()();
});

sendBtn.addEventListener('click', async () => {
    await eel.receive_data('Hello there from the web!!');
});

cameradBtn.addEventListener('click', async () => {
    imgCamLocation.src = await eel.open_cam()();
})
setInterval(cameradBtn.onclick, 30);

// closeCamBtn.onclick = async () => await eel.close_cam()()