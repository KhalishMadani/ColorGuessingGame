import { loaderDiv, selectionDiv } from "./index.js";

export function createLoader() {
    loaderDiv.className = 'bouncing-balls';
    
    // 🔧 Clear out any existing balls before adding new ones
    loaderDiv.innerHTML = '';
    
    for (let i=0; i<4; i++) {
        const bounceBall = document.createElement('div');
        bounceBall.className = 'ball';
        loaderDiv.appendChild(bounceBall);
    }
    selectionDiv.appendChild(loaderDiv);
}