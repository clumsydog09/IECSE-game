//TODO add custom cursor
//TODO mobile screen

'use strict';

const cover = document.querySelector(".cover");
const icon = document.querySelector(".icon");
const audio = new Audio("audio/straight.mp3");
let randomX;
let randomY;
let vol;
let maxDistance = 1200;
let isPlaying = false;

icon.addEventListener("mousedown", function () {
    // audio.remove();
    cover.style.opacity = "0";
    icon.style.opacity = "0";
    // cover.style.zIndex = "-1";
    audio.volume = 0.5;
        
});


const getColorBasedOnDistance = function(distance, maxDistance) {
    let scale = 255 / maxDistance;

    let endColor = [98, 55, 160]; //the purplish colour
    let startColor = [255, 174, 66];

    const color = startColor.map((start, index) => {
        const end = endColor[index];
        const value = start + (end - start) * (distance / maxDistance);
        return Math.floor(value);
    });

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

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

    let color = getColorBasedOnDistance(distance, maxDistance);
    cover.style.backgroundColor = color;
    console.log(color);
});


/*


cover.addEventListener("mousemove", function (e) {
    //this function finds distance of icon from the cursor position and sets volume of audio depending on the distance

    audio = new Audio("audio/tiktok_haaa_meme.mp3");
    let left = parseInt(icon.style.left);
    let top = parseInt(icon.style.top);

    let distance = Math.sqrt(Math.pow((e.x - left), 2) + Math.pow((e.y - top), 2));
    // console.log(distance);

    let color = getColorBasedOnDistance(distance, maxDistance);
    cover.style.backgroundColor = color;
    console.log(color);

});




*/