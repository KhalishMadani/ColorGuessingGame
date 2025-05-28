const toggleText = document.getElementById('toggle-text')
const startCamBtn = document.getElementById('startcam-btn')
const captureCamBtn = document.getElementById('capturecam-btn')
const imgCamLocation = document.getElementById('cam-img')
const closeCamBtn = document.getElementById('closecam-btn')

let startCamInterval = null;

startCamBtn.onclick = () => {
    if (startCamInterval) return;
    toggleText.style.display = 'none';

    startCamInterval = setInterval( async () => { 
        imgCamLocation.src = await eel.open_cam()();
    }, 50);

    startCamBtn.style.display = 'none';
    captureCamBtn.style.display = 'block';
}

captureCamBtn.onclick = async () => {
    clearInterval(startCamInterval);
    startCamInterval = null;
    await eel.close_cam()();
    captureCamBtn.style.display = 'none';
    startCamBtn.style.display = 'block';
}


closeCamBtn.onclick = async () => {
    clearInterval(startCamInterval);
    startCamInterval = null;
    await eel.close_cam()();
    toggleText.style.display = 'block';
    imgCamLocation.src = '';
    captureCamBtn.style.display = 'none';
    startCamBtn.style.display = 'block';
}