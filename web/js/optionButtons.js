import { optionDiv, selectionDiv } from "./index.js";


function randomKey(obj) {
    const keys = Object.keys(obj)
    const randomIndex = Math.floor(Math.random() * keys.length)
    return keys[randomIndex];
}

// this function transform the color array from colorRange into rgb format
function rgbStr([r, g, b]) {
    return `rgb(${r}, ${g}, ${b})`
}

// shuffle the array position without repetition
function shuffleArray(array) {
    const result = array.slice()
    for (let i=result.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [result[i], result[j]] = [result[j], result[i]]
    }
    return result
}


export function createButtons(color_range, true_color) {
    optionDiv.className = 'options';
    let optionsArr = [true_color]
    let i = 0
    while (i < 2) {
        const item = randomKey(color_range)
        if (!optionsArr.includes(item)) {
            optionsArr.push(item)
            i++
        }
    }
    console.log(optionsArr);
    const shuffledOptions = shuffleArray(optionsArr)

    // loop through the shuffeled option
    for (const value of shuffledOptions) {
        console.log(value)
        const key = color_range[value]
        const newBtn = document.createElement("button")
        newBtn.textContent = value
        newBtn.className = 'option-button'
        newBtn.style.backgroundColor = rgbStr(key[0])
        newBtn.style.color = rgbStr(key[1])
        optionDiv.appendChild(newBtn)
    }

    selectionDiv.appendChild(optionDiv)
}

// clear buttons
export function removeOptions() {
    while (optionDiv.firstChild) {
        optionDiv.removeChild(optionDiv.firstChild)
    }
}