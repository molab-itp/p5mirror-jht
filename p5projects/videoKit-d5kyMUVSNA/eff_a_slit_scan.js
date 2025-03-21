//
// converting video slit scan to a effect pluging example
//
// effects have to be declared as a class
// convention is that properties in UI
// appear in meta_props array as drop-downs
// goal: you don't have to write the code
// you just have to select the drop-downs
// save a json with your selections

class eff_a_slit_scan {
  static meta_props = [
    // { prop: 'num_prop', label: 'prop1', selection: [0, 1] },
    { prop: 'expand', selection: [1, 2, 3] },
    { prop: 'step', selection: [1, 0.1, 0.2, 2, 4] },
    { prop: 'period', selection: [-1, 0, 1, 2, 3] },
  ];

  constructor(props) {
    let my = this;
    //
    Object.assign(my, props);
    console.log('eff_a_slit_scan props.expand', props.expand);
    // console.log('eff_a_slit_scan constructor width, height', width, height);

    my.vw = my.input.width;
    my.vh = my.input.height;
    console.log('eff_a_slit_scan constructor input vw vh', my.vw, my.vh);

    my.output = createGraphics(my.vw * my.expand, my.vh);
    // my.output.background(255);

    my.x = 0;

    my.period_timer = new my.videoKit.PeriodTimer(my.period);
  }
  prepareOutput() {
    let my = this;
    my.input.loadPixels();
    my.output.copy(my.input, my.vw / 2, 0, 1, my.vh, my.x, 0, 1, my.vh);
    my.x = my.x + my.step;
    if (my.x > my.output.width) {
      my.x = 0;
    }
    if (my.period_timer.check()) {
      my.output.clear();
    }
  }
}

// https://editor.p5js.org/jht9629-nyu/sketches/hw8qkUuAw
// https://editor.p5js.org/codingtrain/sketches/B1L5j8uk4
// Slit Scan
// this is original code that would work in p5js editor
// and is adapted to the VideoKit plug-in model
// the sketches in the effects directory plug-in
// to the video kit
// certain requirements in order to plug-in:
// 1. meta_pro array
// 2. constructor for the class
// analogous to setup only called once
// 3. prepareOutput() analogous to draw
// repeatedly called for every frame
// This approach allows you to explore and compare
// the same effect with different settings
// side by side
// The dropdown menus make each effect modular
// allowing you to define your own settings
// and create you own version of the effect

// let video;
// let x = 0;

// function setup() {
//   createCanvas(400, 240);
//   pixelDensity(1);
//   video = createCapture(VIDEO);
//   video.size(320, 240);
//   background(51);
// }

// function draw() {
//   // ?? is this needed
//   // video.loadPixels();
//   let w = video.width;
//   let h = video.height;
//   copy(video, w/2, 0, 1, h, x, 0, 1, h);
//   x = x + 1;
//   if (x > width) {
//     x = 0;
//   }
// }
