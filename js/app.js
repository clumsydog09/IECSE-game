//TODO mobile screen

'use strict';

const container = document.querySelector(".container");
const infocard = document.querySelector(".infocard");
const start = document.querySelector(".start");
const cover = document.querySelector(".cover");
const icon = document.querySelector(".icon");
const cursor = document.querySelector(".cursor");
const audio = new Audio("audio/SuperMarioBros.ThemeSong.mp3");
const audioWin = new Audio("audio/mario_power_up.mp3");

const w = window.innerWidth;
const h = window.innerHeight;
const diagonal = Math.sqrt(w * w + h * h);

let randomX;
let randomY;
let vol;
let maxDistance = diagonal;


const iconFound = function() {
    cover.style.opacity = "0";
    icon.style.opacity = '0.7';
    audioWin.play();
    audio.pause();
    setTimeout(() => {
        icon.classList.add('icon--center');
        container.classList.add('container--background');
    }, 100);
    setTimeout(() => {
        cover.style.display = "none";
        // audio.volume = 0.4;
    }, 2000);
}

window.onload = function () {
    audio.volume = 0.5;
    audio.play();
};


const getColorBasedOnDistance = function (distance, maxDistance) {
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
    return (1 - distance / diagonal);
}

const randomizePosition = function () {

    randomX = Math.floor(Math.random() * (window.innerWidth - icon.offsetWidth));
    randomY = Math.floor(Math.random() * (window.innerHeight - icon.offsetHeight));

    icon.style.left = randomX + 'px';
    icon.style.top = randomY + 'px';
}
randomizePosition();

const touchHover = function (e) {
    e.preventDefault();
    //left and right are the coordinates of the center of the image.
    const left = parseInt(icon.style.left) + parseInt(icon.offsetWidth) / 2;
    const top = parseInt(icon.style.top) + parseInt(icon.offsetHeight) / 2;

    const distance = Math.sqrt(Math.pow((e.touches[0].clientX - left), 2) + Math.pow((e.touches[0].clientY - top), 2));
    vol = checkForVolume(distance);
    audio.volume = vol;
    audio.play();

    const color = getColorBasedOnDistance(distance, maxDistance);
    cover.style.backgroundColor = color;
}
const mouseHover = function (e) {
    //left and right are the coordinates of the center of the image.
    const left = parseInt(icon.style.left) + parseInt(icon.offsetWidth) / 2;
    const top = parseInt(icon.style.top) + parseInt(icon.offsetHeight) / 2;

    const distance = Math.sqrt(Math.pow((e.clientX - left), 2) + Math.pow((e.clientY - top), 2));
    vol = checkForVolume(distance);
    audio.volume = vol;
    audio.play();

    const color = getColorBasedOnDistance(distance, maxDistance);
    cover.style.backgroundColor = color;
}



//////////////////////////////

if (w<600) {
    start.addEventListener("touchstart", function () {
        infocard.style.zIndex = "-1";
        infocard.style.display = "none";
    });
    
    icon.addEventListener("touchstart", iconFound);
    
    cover.addEventListener("touchmove", touchHover);
    icon.addEventListener("touchmove", touchHover);
    
    container.addEventListener("touchmove", function (e) {
        cursor.style.top = e.y + "px";
        cursor.style.left = e.x + "px";
    })
}
else{

    start.addEventListener("mousedown", function () {
        infocard.style.zIndex = "-1";
        infocard.style.display = "none";
    });
    
    icon.addEventListener("mousedown", iconFound);
    
    cover.addEventListener("mousemove", mouseHover);
    icon.addEventListener("mousemove", mouseHover);
    
    container.addEventListener("mousemove", function (e) {
        cursor.style.top = e.y + "px";
        cursor.style.left = e.x + "px";
    })
}

console.log(w);