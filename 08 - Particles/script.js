(function () {
  'use strict';

  const NUM_PARTICLES = 1000;
  const PARTICLE_SIZE = 2;
  const PARTICLE_HUE = 0;
  const ANIMATION_SPEED = 0.3;

  let canvas;
  let ctx;
  let particles = [];
  let lastTime;


  // a particle - can update and draw itself
  class Particle {
    constructor(x, y, color = 'black') {
      this.x = x;
      this.y = y;
      this.color = color;

      this.vx = Math.random() - 0.5;
      this.vy = Math.random() - 0.5;
    }

    // run every frame, move the particle
    update(timeDelta = 20) {
      this.x += this.vx * (timeDelta * ANIMATION_SPEED);
      this.y += this.vy * (timeDelta * ANIMATION_SPEED);

      this.loopAroundCanvasEdge();
    }

    // if it hits the edge, loop to the other side
    loopAroundCanvasEdge() {
      this.x %= canvas.width;
      this.y %= canvas.height;

      if (this.x < 0) {
        this.x += canvas.width;
      }

      if (this.y < 0) {
        this.y += canvas.height;
      }
    }

    draw() {
      ctx.fillStyle = this.color;

      // square
      // ctx.fillRect(this.x, this.y, PARTICLE_SIZE, PARTICLE_SIZE);  

      // circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, PARTICLE_SIZE, 0, 6.283);
      ctx.fill();
    }
  }


  // get canvas ready to draw
  function initCanvas() {
    canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
  }

  // create our particles
  function initParticles() {
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push(spawnOneParticle());
    }
  }

  // create one single particle
  function spawnOneParticle() {

    // position
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    // color
    let luminance = Math.random() * (80 - 30) + 30;
    luminance = Math.floor(luminance);
    let color = `hsl(${ PARTICLE_HUE }, 80%, ${ luminance }%)`;

    return new Particle(x, y, color);
  }

  // our update loop
  function draw(time) {

    // timing: how many ms since the last loop
    let timeDelta = time - lastTime || 0;
    lastTime = time;
    // console.log('FPS:', Math.round(1000 / timeDelta));

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update particles
    particles.forEach(p => {
      p.update(timeDelta);
      p.draw();
    });

    // run next frame "as soon as convenient"
    window.requestAnimationFrame(draw);
  }


  // start our app
  function init() {
    initCanvas();
    initParticles();

    draw(); // kick off the loop
  };

  init();

}());