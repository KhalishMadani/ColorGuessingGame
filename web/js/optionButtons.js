import { optionDiv, selectionDiv } from "./index.js";


function randomKey(obj) {
    const keys = Object.keys(obj)
    const randomIndex = Math.floor(Math.random() *keys.length)
    return keys[randomIndex];
}

// this function transform the color array from colorRange into rgb format
function rgbStr([r, g, b]) {
    return `rgb(${r}, ${g}, ${b})`
}

export function createButtons(color_range) {
    optionDiv.className = 'options';
    for (let i=0; i<3; i++) {
        let randomcolor = randomKey(color_range)
        const key = color_range[randomcolor]
        const newBtn = document.createElement("button")

        newBtn.textContent = `${randomcolor}`
        newBtn.className = 'option-button'
        newBtn.style.backgroundColor = rgbStr(key[0])
        newBtn.style.color = rgbStr(key[1])
        optionDiv.appendChild(newBtn)
        console.log(randomcolor)
    }
    selectionDiv.appendChild(optionDiv)
}

// clear buttons
export function removeOptions() {
    while (optionDiv.firstChild) {
        optionDiv.removeChild(optionDiv.firstChild)
    }
}