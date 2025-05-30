const bounce = document.getElementById('bouncing-balls');
const toggleText = document.getElementById('toggle-text')
const startCamBtn = document.getElementById('startcam-btn')
const captureCamBtn = document.getElementById('capturecam-btn')
const imgCamLocation = document.getElementById('cam-img')
const closeCamBtn = document.getElementById('closecam-btn')
const optionDiv = document.getElementById('options-id');

let startCamInterval = null;

const colorRange = {
    'merah': [
        [230, 21, 21],
        [255, 255, 255]
    ],
    'oren': [
        [218, 98, 11],
        [255, 255, 255]
    ],
    'kuning': [
        [213, 231, 19],
        [0, 0, 0]
    ],
    'hijau-muda': [
        [76, 229, 6],
        [255, 255, 255]
    ],
    'hijau': [
        [6, 144, 32],
        [255, 255, 255]
    ],
    'biru-muda': [
        [50, 168, 207],
        [255, 255, 255]
    ],
    'biru': [
        [0, 0, 255],
        [255, 255, 255]
    ],
    'ungu': [
        [128, 0, 128],
        [255, 255, 255]
    ],
    'pink': [
        [205, 1, 113],
        [255, 255, 255]
    ],
    'merah-tua': [
        [128, 0, 0],
        [255, 255, 255]
    ],
    "hitam": [
        [0, 0, 0],
        [255, 255, 255]
    ],
    "putih": [
        [255, 255, 255],
        [0, 0, 0]
    ],
    "abu-abu": [
        [180, 168, 168],
        [0, 0, 0]
    ]
}

// this function transform the color array from colorRange into rgb format
function rgbStr([r, g, b]) {
    return `rgb(${r}, ${g}, ${b})`
}

async function fetchColor() {
    
    const colorName = await eel.get_color()()
    console.log(colorName);
    bounce.style.visibility = 'hidden';
    return colorName
}

function optionBtn(params) {
    const btnA = document.createElement("button")
    const key = colorRange[params];
    console.log('key: ', key)

    btnA.textContent = params
    btnA.className= 'option-button'
    btnA.style.backgroundColor = rgbStr(key[0]);
    btnA.style.color = rgbStr(key[1]);
    optionDiv.appendChild(btnA)
}

function randomKey(obj) {
    const keys = Object.keys(obj)
    const randomIndex = Math.floor(Math.random() *keys.length)
    return keys[randomIndex];
}

function createButtons() {
    for (i=0; i<3; i++) {
        let randomcolor = randomKey(colorRange)
        const key = colorRange[randomcolor]
        const newBtn = document.createElement("button")

        newBtn.textContent = `${randomcolor}`
        newBtn.className = 'option-button'
        newBtn.style.backgroundColor = rgbStr(key[0])
        newBtn.style.color = rgbStr(key[1])
        optionDiv.appendChild(newBtn)
        console.log(randomcolor)
    }
}


startCamBtn.onclick = () => {
    if (startCamInterval) return;
    toggleText.innerHTML = 'Please wait...';

    startCamInterval = setInterval(async () => {
        imgCamLocation.src = await eel.open_cam()();
        toggleText.style.display = 'none';
    }, 50);

    startCamBtn.style.display = 'none';
    captureCamBtn.style.display = 'block';
}


captureCamBtn.onclick = () => {

    // freeze the camera & show the loading bounce
    clearInterval(startCamInterval);
    startCamInterval = null;
    bounce.style.visibility = 'visible';
    eel.close_cam()();

    // fetch the color option
    setTimeout(async () => {
        const colors = await fetchColor();
        // optionBtn(colors)
        createButtons()
        // console.log(colorRange[colors])
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
    removeOptions()
}

// clear buttons
function removeOptions() {
    while (optionDiv.firstChild) {
        optionDiv.removeChild(optionDiv.firstChild)
    }
}