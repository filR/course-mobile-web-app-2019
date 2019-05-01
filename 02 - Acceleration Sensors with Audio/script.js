'use strict';

let audio = new Audio('song.mp3');
// let audio = new Audio('https://random-files-phil.s3.amazonaws.com/song.mp3');

// play music
document.querySelector('h1').onclick = function () {
    audio.play();
    audio.volume = 0;

    // hide "tap me"
    this.style.display = 'none';
};

// on acceleratin sensor data
function handleMotionEvent(event) {
    let x = event.acceleration.x || event.accelerationIncludingGravity.x;
    let y = event.acceleration.y || event.accelerationIncludingGravity.y;
    let z = event.acceleration.z || event.accelerationIncludingGravity.z;
    
    // get positive acceleration
    let targetVolume = Math.max(x, y, z);
    targetVolume = Math.abs(targetVolume);
    
    // scale it down a bit
    targetVolume /= 3;
    
    // volume between 0 and 1
    targetVolume = Math.max(targetVolume, 0);
    targetVolume = Math.min(targetVolume, 1);
    
    // slowly approach target
    let difference = targetVolume - audio.volume;
    difference = Math.min(difference, 1.0);
    difference /= 30;
    
    // set volume
    audio.volume += difference;
    
    console.log(audio.volume);
}

window.addEventListener("devicemotion", handleMotionEvent, true);
