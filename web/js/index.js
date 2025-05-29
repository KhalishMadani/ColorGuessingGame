const bounce = document.getElementById('bouncing-balls');
const toggleText = document.getElementById('toggle-text')
const startCamBtn = document.getElementById('startcam-btn')
const captureCamBtn = document.getElementById('capturecam-btn')
const imgCamLocation = document.getElementById('cam-img')
const closeCamBtn = document.getElementById('closecam-btn')

let startCamInterval = null;

const colorRange = {
    'merah': [230, 21, 21],
    'oren': [218, 98, 11],
    'kuning': [213, 231, 19],
    'hijau-muda': [76, 229, 6],
    'hijau': [6, 144, 32],
    'biru-muda': [50, 168, 207],
    'biru': [11, 11, 161],
    'ungu': [104, 5, 97],
    'pink': [240, 0, 96],
    'merah-tua': [135, 7, 7],
    "hitam": [0, 0, 0],
    "putih": [255, 255, 255],
    "abu-abu": [180, 168, 168]
}

startCamBtn.onclick = () => {
    if (startCamInterval) return;
    toggleText.innerHTML = 'Please wait...';

    startCamInterval = setInterval( async () => { 
        imgCamLocation.src = await eel.open_cam()();
        toggleText.style.display = 'none';
    }, 50);

    startCamBtn.style.display = 'none';
    captureCamBtn.style.display = 'block';
}

async function fetchColor() {
        console.log( await eel.get_color()());
        bounce.style.visibility = 'hidden';
    }
    
    function buttonColors(params) {
        const btnA = document.createElement("button")
        btnA.textContent = `${params}`
        const optionDiv = document.getElementById('options-id');
        optionDiv.appendChild(btnA)
    }
    
    captureCamBtn.onclick = () => {
        
        // freeze the camera & show the loading bounce
        clearInterval(startCamInterval);
        startCamInterval = null;
        bounce.style.visibility = 'visible';
        eel.close_cam()();

    // fetch the color option
    setTimeout(() => {
        const colors = fetchColor();
        // buttonColors(colors)
    }, 1000);

    // close the camera
    captureCamBtn.style.display = 'none';
    startCamBtn.style.display = 'block';

}


closeCamBtn.onclick = async () => {
    clearInterval(startCamInterval);
    startCamInterval = null;
    await eel.close_cam()();
    toggleText.innerHTML = 'Press Start To Play 📸';
    toggleText.style.display = 'block';
    imgCamLocation.src = '';
    captureCamBtn.style.display = 'none';
    startCamBtn.style.display = 'block';
}