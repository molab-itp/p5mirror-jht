//
// lines radiating out from center

class eff_a_radial {
  static meta_props = [
    // { prop: 'num_prop', label: 'prop1', selection: [0, 1] },
    { prop: 'rim', selection: [5, 0, 1, 10] },
    { prop: 'period', selection: [0.01, 0.5, 1, 0.001, 0] },
    { prop: 'strokeWeight', selection: [10, 5, 4, 1, 20] },
  ];

  constructor(props) {
    let my = this;
    Object.assign(my, props);
    console.log('eff_a_radia_bounce props', props);
    my.width = my.input.width;
    my.height = my.input.height;
    my.output = createGraphics(my.width, my.height);
    my.setup();
    my.resize();
  }

  prepareOutput() {
    let my = this;
    my.output.strokeWeight(my.strokeWeight);
    my.img = my.input.get();
    let more = 1;
    while (more) {
      more = my.draw_out();
      if (!my.faster) more = 0;
    }
  }

  setup() {
    let my = this;
    my.faster = 1;
    // my.strokeWeight = 10;
    // my.rim = 5;
    my.angle = 0;
    my.angleStep = 1;
    my.xstep = 1;
    my.xstepDir = 1;
    my.xstepDownFactor = 4;
    my.xposStart = 0;
    my.xpos = my.xposStart;
    // my.period = 0.1;
    my.secsDelta = 0;
    // my.x0;
    // my.y0;
    // my.img;
  }

  resize() {
    let my = this;
    my.x0 = int(my.width / 2);
    my.y0 = int(my.height / 2);
    my.xposEnd = my.height;
  }

  draw_out() {
    let my = this;
    let layer = my.output;
    let r = my.xpos / 2;
    let rang = radians(my.angle);
    let x1 = r * cos(rang);
    let y1 = r * sin(rang);

    let c1 = my.img.get(my.x0 + x1, my.y0 + y1);
    layer.stroke(c1);
    layer.fill(c1);
    layer.circle(my.x0 + x1, my.y0 + y1, my.rim);

    let r2 = my.width;
    let x2 = r2 * cos(rang);
    let y2 = r2 * sin(rang);
    layer.line(my.x0 + x1, my.y0 + y1, my.x0 + x2, my.y0 + y2);

    my.angle = my.angle + my.angleStep;
    if (my.angle > 360) {
      my.angle = 0;
      my.next_step();
      return 0;
    }
    return 1;
  }

  next_step() {
    let my = this;
    my.secsDelta += deltaTime / 1000;
    if (my.secsDelta < my.period) {
      return;
    }
    my.secsDelta = 0;
    my.xpos += my.xstep;
    if (my.xstep > 0 && my.xpos > my.xposEnd) {
      my.xstepDir *= -1;
      my.xstep = my.xstepDir * my.xstepDownFactor;
      my.xpos += my.xstep;
    } else if (my.xstep < 0 && my.xpos < my.xposStart) {
      my.xstepDir *= -1;
      my.xstep = my.xstepDir;
      my.xpos += my.xstep;
    }
  }
}

// https://editor.p5js.org/jht9629-nyu/sketches/OReZ4wOR5
// video scan radial v5

// https://editor.p5js.org/jht9629-nyu/sketches/7vllrM5d5
// video scan radial v4

// https://editor.p5js.org/jht9629-nyu/sketches/WdNVtxQzf
// video scan radial v3

// https://editor.p5js.org/jht9629-nyu/sketches/cKzXO8eUG
// video scan radial v2

// https://editor.p5js.org/jht1900/sketches/-Ypn6ODK_
// video scan radial

// https://editor.p5js.org/jht1493/sketches/mEXETIijv
// video scan gap center

// https://editor.p5js.org/jht1493/sketches/oHVI5tU4BP
// video scan gap

// https://editor.p5js.org/jht1493/sketches/Q9jdcICpW
// video scan mouseY

// https://editor.p5js.org/jht1493/sketches/gnx2IQn1N
// video scan

// https://github.com/processing/p5.js/wiki/Beyond-the-canvas#capture-live-video

// https://editor.p5js.org/jht9629-nyu/sketches/nkw-sZXwN
// video scan radial v6

// https://editor.p5js.org/jht9629-nyu/sketches/hmPJyOAk1
// video scan radial bounce
