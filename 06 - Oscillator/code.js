document.body.addEventListener('click', function () {

    // PART 1 ---------------------

    // set up connections
    let context = new window.AudioContext();
    let oscillator = context.createOscillator();

    oscillator.type = 'sine'; // 'sine'|'square'|'triangle'|'sawtooth';
    oscillator.frequency.value = 100;

    // start immediately
    //oscillator.connect(context.destination);
    //oscillator.start();



    // PART 2 ---------------------

    // attach volume
    let gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);

    // fade in volume
    let now = context.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(1, now + 1);
    oscillator.start(now);



    // PART 3 ---------------------

    // adjust pitch and volume according to mouse position
    document.onmousemove = function (event) {
        let x = event.clientX / window.innerWidth;
        let y = event.clientY / window.innerHeight;
        console.log(x, y);
        
        oscillator.frequency.value = y * 5000;
        gain.gain.setValueAtTime(x, context.currentTime);
    }

});