// https://editor.p5js.org/jht9629-gmail/sketches/r0N2R5y-q
// dice99

// xxx
// dice99

let my = {
  width: 400,
  height: 400,
  rotX: 1,
  rotY: 0,
  rotZ: 0,
  accelX: 0,
  accelY: 0,
  accelZ: 0,
};

function setup() {
  // createCanvas(my.width, my.height, WEBGL);
  my.width = windowWidth;
  my.height = windowHeight;
  my.canvas = createCanvas(my.width, my.height);

  my.canvas.mouseClicked(shakeAction);

  // normalMaterial();
  create_ui();

  textFont('Courier New');
  textStyle(BOLD);

  my.num = 99;
  my.shakeSecs = 1;
}

function draw() {
  background(200);
  // if (my.rotZ) rotateZ(radians(rotationZ));
  // if (my.rotX) rotateX(radians(rotationX));
  // if (my.rotY) rotateY(radians(rotationY));
  // box(200, 200, 200);

  draw_number(my.num, my.width * 0.8);

  // if (frameCount % 20 == 0) {
  let nowTime = millis() / 1000;
  if (my.shakeRun) {
    if (nowTime < my.shakeStart + my.shakeSecs) {
      my.num = Math.floor(random(99));
    } else {
      my.shakeRun = 0;
    }
  }
  update_ui();
}

function shakeAction() {
  my.shakeRun = 1;
  my.shakeStart = millis() / 1000;
}

function fullScreenAction() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function deviceShaken() {
  shakeAction();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  my.width = windowWidth;
  my.height = windowHeight;
}

// https://editor.p5js.org/jht9629-nyu/sketches/TXvXSJY6L
// rotationXYZ

// https://p5js.org/reference/#/p5/rotationX

// https://editor.p5js.org/jht9629-nyu/sketches/G6Zr5SBuq
// rotationX

// https://editor.p5js.org/jht9629-nyu/sketches/bpsB_xmSH
// gravity-meter

// https://editor.p5js.org/jht9629-nyu/sketches/RRtBxe8lI
// accelerationXYZ
