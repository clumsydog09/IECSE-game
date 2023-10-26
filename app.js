cover = document.querySelector("#cover");
icon = document.querySelector("#icon");
let randomX;
let randomY;
let audio = new Audio("audio/tiktok_haaa_meme.mp3");


icon.addEventListener("mousedown", function () {
    cover.style.opacity = "0";
    cover.style.zIndex = "-1";
    icon.style.opacity = "0";
    audio.pause();
});

function checkForVolume(distance) {
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

function randomizePosition() {

    randomX = Math.floor(Math.random() * (window.innerWidth - icon.clientWidth));
    randomY = Math.floor(Math.random() * (window.innerHeight - icon.clientHeight));

    icon.style.left = randomX + 'px';
    icon.style.top = randomY + 'px';
}
randomizePosition();

cover.addEventListener("mousemove", function (e) {

    let left = parseInt(icon.style.left);
    let top = parseInt(icon.style.top);

    const distance = Math.sqrt(Math.pow((e.clientX - left), 2) + Math.pow((e.clientY - top), 2));
    let vol = checkForVolume(distance);
    console.log(distance);
    audio.volume = vol;
    audio.play();
});


