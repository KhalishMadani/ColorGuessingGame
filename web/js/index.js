const cameradBtn = document.getElementById('startcam-btn')
const imgCamLocation = document.getElementById('cam-img')
const closeCamBtn = document.getElementById('closecam-btn')

let startCamInterval = null;

cameradBtn.onclick = () => {
    if (startCamInterval) return;

    startCamInterval = setInterval( async () => { 
        imgCamLocation.src = await eel.open_cam()();
    }, 50);
}


closeCamBtn.onclick = async () => {
    clearInterval(startCamInterval);
    startCamInterval = null;
    await eel.close_cam()();
}