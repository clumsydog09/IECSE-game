'use strict';

const cover = document.querySelector(".cover");
const icon = document.querySelector(".icon");
const audio = new Audio("audio/straight.mp3");
let randomX;
let randomY;
let vol;

icon.addEventListener("mousedown", function () {
    // audio.remove();
    cover.style.opacity = "0";
    icon.style.opacity = "0";
    cover.style.zIndex = "-1";
    
});

const checkForVolume = function (distance) {
    if (distance >= 0 && distance < 50)
    return 1;
    else if (distance >= 60 && distance < 480)
    return 0.5;
    else if (distance >= 480 && distance < 960)
    return 0.3;
    else if (distance >= 960 && distance < 1200)
    return 0.1;
    else
    return 0;
}

const randomizePosition = function () {
    
    randomX = Math.floor(Math.random() * (window.innerWidth - icon.clientWidth));
    randomY = Math.floor(Math.random() * (window.innerHeight - icon.clientHeight));
    
    icon.style.left = randomX + 'px';
    icon.style.top = randomY + 'px';
}
randomizePosition();

cover.addEventListener("mousemove", function (e) {
    //this function finds distance of icon from the cursor position and sets volume of audio depending on the distance
    
    let left = parseInt(icon.style.left);
    let top = parseInt(icon.style.top);
    
    const distance = Math.sqrt(Math.pow((e.clientX - left), 2) + Math.pow((e.clientY - top), 2));
    
    vol = checkForVolume(distance);
    console.log(distance);
    audio.volume = vol;
    audio.play();
});


