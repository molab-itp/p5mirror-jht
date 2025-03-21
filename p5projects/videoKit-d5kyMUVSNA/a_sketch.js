// https://editor.p5js.org/jht9629-gmail/sketches/d5kyMUVSNA
// videoKit

// https://editor.p5js.org/jht9629-gmail/sketches/u_Blv5bOK
// p5moExamples video 370a

let videoKit; // home for library routines

function setup() {
  // Report startup time for debugging
  let lapse = window.performance.now() - a_start_now;
  console.log('setup lapse', lapse);

  // Lowest pixel density for performance
  pixelDensity(1);

  // Need some starting dimensions for canvas.
  // will get adjusted by videoKit later in startup
  createCanvas(100, 100);
  //
  // must call createCanvas before new p5videoKit

  videoKit = new p5videoKit(a_config);
}

function draw() {
  videoKit.draw();
}

let a_config = {
  // hide_ui: 1,
  // effects for import, will appear at top of the effect menu
  // an EFFECT can have many PROPERTIES specific to the effect
  // for example canvas size, color, cell size,
  // to see this, choose "circle" in Effect1 and Effect2,
  // then choose different properties like number of circles per frame
  // or the video source
  // the "effects" array creates a pull-down menu
  // which offers a first selection of effects added to the VideoKit library,
  // you could add some more !!!!
  effects: [
    { label: 'a_live_tile_host', factory: eff_a_live_tile_host },
    { label: 'a_slit_scan', factory: eff_a_slit_scan },
    { label: 'a_ncell', factory: eff_a_ncell },
    { label: 'a_radial', factory: eff_a_radial },
  ],
  // settings for import, will appear in the settings menu
  // SETTINGS will load a save .json file with predefined values
  // for all the settings associated with the effect
  // "settings" is an array of
  // settings: [
  // { label: 'videoKit', import_path: 'settings/videoKit.json' },
  // ],
};

// track startup time for debugging
let a_start_now = window.performance.now();

// disables FES to improve performance
p5.disableFriendlyErrors = true;

// https://github.com/molab-itp/p5moExamples.git

// https://molab-itp.github.io/p5moExamples/examples/video/?a=%7B%22setting%22%3A%22%22%2C%22comment%22%3A%22bright%20%7C%20diff%22%2C%22back_color%22%3A200%2C%22room_name%22%3A%22VideoKit-Room-1%22%2C%22patch_layout%22%3A%22Single%22%2C%22canvas_size%22%3A%22960x540%22%2C%22capture_size%22%3A%22default%22%2C%22render_size%22%3A%22Canvas%22%2C%22chat_name%22%3A%22jht%22%2C%22chat_chk%22%3A0%2C%22live_index%22%3A0%2C%22live_chk%22%3A0%2C%22urects_lock%22%3A0%2C%22urects_count%22%3A2%2C%22canvas_resize_ref%22%3A%22%22%2C%22canvas_data_chk%22%3A0%2C%22mediaDiv_states%22%3A%5Bnull%2C%7B%22vis%22%3A0%2C%22mute%22%3A1%7D%5D%2C%22patches%22%3A%5B%7B%22eff_spec%22%3A%7B%22ipatch%22%3A0%2C%22imedia%22%3A1%2C%22eff_label%22%3A%22bright%22%2C%22urect%22%3A%7B%22width%22%3A960%2C%22height%22%3A540%2C%22x0%22%3A0%2C%22y0%22%3A0%7D%7D%2C%22eff_props%22%3A%7B%22ncell%22%3A16%2C%22back_color%22%3A0%2C%22src_color%22%3A255%2C%22fill%22%3A1%2C%22invert%22%3A1%2C%22shape%22%3A%22rect%22%7D%7D%2C%7B%22eff_spec%22%3A%7B%22ipatch%22%3A1%2C%22imedia%22%3A1%2C%22eff_label%22%3A%22diff%22%2C%22urect%22%3A%7B%22width%22%3A960%2C%22height%22%3A540%2C%22x0%22%3A0%2C%22y0%22%3A0%7D%7D%2C%22eff_props%22%3A%7B%22threshold%22%3A16%2C%22period%22%3A0%2C%22back_color%22%3A%22clear%22%2C%22smooth%22%3A0%2C%22hold%22%3A0%7D%7D%5D%7D
// bright | diff

// https://editor.p5js.org/shawn/sketches/jZQ64AMJc
// p5LiveMedia Test Video
// https://github.com/vanevery/p5LiveMedia
