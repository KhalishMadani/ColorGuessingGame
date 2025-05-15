const cameradBtn = document.getElementById('startcam-btn')
const imgCamLocation = document.getElementById('cam-img')
const closeCamBtn = document.getElementById('closecam-btn')


cameradBtn.onclick = () => {
    setInterval( async () => { 
        imgCamLocation.src = await eel.open_cam()();
    }, 50);
}


closeCamBtn.onclick = async () => await eel.close_cam()()