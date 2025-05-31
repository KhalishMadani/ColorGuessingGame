import { createLoader } from "./loader.js";
import { createButtons, removeOptions } from "./optionButtons.js";

export const selectionDiv = document.querySelector('.selection-div');
export const loaderDiv = document.createElement('div');
export const optionDiv = document.createElement('div');

const toggleText = document.getElementById('toggle-text')
const startCamBtn = document.getElementById('startcam-btn')
const captureCamBtn = document.getElementById('capturecam-btn')
const imgCamLocation = document.getElementById('cam-img')
const closeCamBtn = document.getElementById('closecam-btn');

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


async function fetchColor() {
    const colorName = await eel.get_color()()
    return colorName
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

    // freeze the camera
    clearInterval(startCamInterval);
    startCamInterval = null;
    eel.close_cam()();

    // render loader
    createLoader()

    // fetch the color option & render buttons
    setTimeout(async () => {
        const colors = await fetchColor();
        selectionDiv.removeChild(loaderDiv)
        createButtons(colorRange, colors)
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