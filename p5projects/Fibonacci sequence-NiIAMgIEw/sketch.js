// https://editor.p5js.org/jht9629-gmail/sketches/NiIAMgIEw
// Fibonacci sequence
// class to object literal
// adjust for window size
// latest libs/p5.js/1.9.3/

let my = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  init_fib();

  background(220);

  var mult = 10;

  let centerX = int(windowWidth / 2);
  let centerY = int(windowHeight / 2);
  translate(centerX, centerY);
  
  let maxW = centerX
  console.log("centerX, centerY", centerX, centerY, "maxW", maxW);
  
  rect(0, 0, my.n2 * mult, my.n2 * mult);

  for (var i = 0; ; i++) {
    next_fib();
    
    translate(my.n1 * mult, my.n1 * mult + 1);
    rotate(-HALF_PI);
    // translate(my.n1 * mult +1, my.n1 * mult );
    // rotate(HALF_PI);
    
    let w = my.n2 * mult;
    console.log("next_fib", my.n2, my.n2 / my.n1, "w", w);

    if (w > maxW*2) {
      break;
    }
    rect(0, 0, w, w);
  }
}

function init_fib() {
  my.n1 = 0;
  my.n2 = 1;
  console.log("init_fib", my.n1, my.n2);
}

function next_fib() {
  let oldN1 = my.n1;
  let oldN2 = my.n2;
  my.n1 = my.n2;
  my.n2 = oldN1 + oldN2;
}

// https://editor.p5js.org/jht9629-nyu/sketches/Q-O6WsDdt
// https://editor.p5js.org/ktorn/sketches/r1dFaL5f4
// Fibonacci sequence (visualisation)
// https://editor.p5js.org/ktorn/sketches
