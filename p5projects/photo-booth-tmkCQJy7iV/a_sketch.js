// https://editor.p5js.org/jht9629-gmail/sketches/tmkCQJy7iV
// photo-booth

// https://editor.p5js.org/jht9629-nyu/sketches/5VKqK34Ps
// p5moExamples photo booth 70

// Capture canvas pixels to cloud as image jpg or png

let my = {};

function setup() {
  my_init();

  // set group to share cloud data
  my.group = 'group1';

  my.photo_index = 0;
  my.photo_max = 4;
  my.photo_list = [];
  my.slit_scan = 0;

  // my.imageQuality = 1;
  my.imageQuality = 0.1;
  my.imageExt = '.jpg';
  // my.imageExt = '.png';
  // my.thumbWidth = my.vwidth / 2;
  my.thumbWidth = my.vwidth;

  // Lowest pixel density for small uploads
  pixelDensity(1);

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  ui_init();

  video_create();

  dbase_app_init({ completed: startup_completed });

  // for moving circle or video scan line
  my.x = 0;
  my.y = my.height / 2;
  my.xstep = 1;
  my.radius = int(my.width / 10);
}

function startup_completed() {
  //
  // dbase_devices_observe({ observed_key, observed_item, all: 1 });
  // dbase_app_observe({ observed_item });
  dbase_group_observe({ observed_key, observed_item });

  function observed_key(key, device) {
    // console.log('observed_a_device key', key, 'uid', my.uid, 'device', device);
    // console.log('observed_key key', key, 'device.photo_index', device && device.photo_index);
  }

  function observed_item(device) {
    // console.log('observed_item device.photo_index', device.photo_index);
    // console.log('observed_item device.photo_list', device.photo_list);
    if (device.photo_list != undefined) {
      my.photo_list = device.photo_list;
    }
    if (device.photo_index != undefined) {
      my.photo_index = device.photo_index;
    }
    show_action();
  }
}

function draw() {
  draw_frame();
  draw_number(my.photo_index + 1);
}

function draw_frame() {
  if (my.videoFlag && !video_ready()) return;

  if (my.videoFlag) {
    // faster to get entire video frame as an image
    my.videoImg = my.video.get();
  }
  if (!my.videoImg) {
    return;
  }
  if (my.slit_scan) {
    draw_scan();
  } else {
    draw_video();
  }
  my.x = (my.x + my.xstep) % my.width;

  let str = my.photo_list.length + ' ' + my.photo_index;
  my.photo_count_span.html(str);
}

function draw_scan() {
  // my.videoImg.loadPixels();
  let w = my.videoImg.width;
  let h = my.videoImg.height;
  copy(my.videoImg, w / 2, 0, 1, h, my.x, 0, 1, h);
}

function draw_video() {
  // background(0);
  image(my.videoImg, 0, 0);
  // Draw circle on video
  noStroke();
  let index = my.photo_index + 1;
  fill(my.colors[index % my.colors.length]);
  circle(my.x, my.y, my.radius);
}

function draw_number(n) {
  // Convert number to string
  let str = n + '';
  let x = 10;
  let y = my.height;
  textSize(50);
  // Draw black rect background
  let a = textAscent();
  let d = textDescent();
  let h = a + d;
  let w = textWidth(str);
  fill(0);
  rect(x, y - h, w, h);
  // Draw white text
  fill(255);
  // x  y bottom-left corner.
  text(str, x, y - d);
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  track_xy();
}

function track_xy() {
  let x = mouseX;
  let y = mouseY;
}

function mouseDragged() {
  // console.log('mouseDragged');
  // required to prevent touch drag moving canvas on mobile
  let onCanvas = mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
  if (onCanvas) {
    track_xy();
  }
  // return my.scrollFlag ? true : !onCanvas;
  return !onCanvas;
}

function windowResized() {
  // console.log('windowResized windowHeight', windowHeight, 'windowWidth', windowWidth);
  // my.isPortrait = windowHeight > windowWidth;
  if (my.isRemote) {
    return;
  }
  resizeCanvas(windowWidth, windowHeight);
  // console.log('windowResized width', width, 'height', height);
}

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid

// https://editor.p5js.org/jht9629-nyu/sketches/7Wjlo3pPU
// mo-pix-chip-grid jht9629 fireb_firebase.js

// https://editor.p5js.org/jht9629-nyu/sketches/CntV1JQNp
// p5moExamples pixel-grid 47

// [x] Correct display of images - must hit show button
// [x] Add --> Take, keep array of n images and upate
// [x] photo_index

// [x] my.photo_list - show only last n
//    [ { name: "", index: n }, ... ]

// [x] preserve image show order

// [x] Show other photobooths
// enabled by group settings
//   my.group = 'group1';
