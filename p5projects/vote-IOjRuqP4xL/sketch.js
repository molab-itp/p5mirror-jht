// https://editor.p5js.org/jht9629-gmail/sketches/IOjRuqP4xL
// vote

// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote 47

// all the functions start with "dbase_" are from p5moLibrary repo

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function my_setup() {
  let lowerMargin = 80; // Room for buttons
  my.width = windowWidth;
  my.height = windowHeight - lowerMargin;

  // change to your firebase app
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';

  // change to add a room in firebase real-time database
  my.roomName = 'room1';

  my.mo_app = 'mo-vote';
  my.nameDevice = '';
  //
  my.vote_count = 0;
  my.vote_total_count = 0;
  my.device_values = {};

  my.x = 0;
  my.y = my.height / 2;
  my.xstep = 1;
  my.len = my.width * 0.8;

  my.colorGold = [187, 165, 61];
  my.colors = [[255, 0, 0], [0, 255, 0], my.colorGold];
}

function setup() {
  my_setup(); // setup firebase configuration

  my.canvas = createCanvas(my.width, my.height);
  // noCanvas();

  dbase_app_init({ completed: startup_completed }); // callback function when app init

  create_ui();
}

function draw() {
  background(0);
  fill(my.colors[abs(my.vote_count) % my.colors.length]);
  circle(my.x, my.y, my.len);
  my.x = (my.x + my.xstep + width) % width;

  calc_votes();

  my.vote_count_span.html(my.vote_count);
  my.vote_total_count_span.html(my.vote_total_count);

  if (dbase_actions_issued(my.uid, { switch_action: 1 })) {
    switchDirection();
  }
  dbase_poll();
}

function create_ui() {
  createButton('Vote Up').mousePressed(voteUpAction);

  createButton('Down').mousePressed(voteDownAction);

  my.vote_count_span = createSpan('' + my.vote_count);

  createElement('br');

  createSpan('Total Votes ');
  my.vote_total_count_span = createSpan('' + my.vote_total_count);

  createElement('br');

  createButton('Direction').mousePressed(switchDirectionAction);

  createElement('br');

  createButton('Remove App').mousePressed(removeAppAction);

  // // Move the canvas below all the ui elements
  // let body_elt = document.querySelector('body');
  // let main_elt = document.querySelector('main');
  // body_elt.insertBefore(main_elt, null);
}

// check device exists in db
function startup_completed() {
  console.log('startup_completed');
  //
  dbase_devices_observe({ observed_key, observed_item, all: 1 });

  function observed_key(key, device) {
    // console.log('observed_a_device key', key, 'uid', my.uid, 'device', device);
    console.log('observed_key key', key, 'device.vote_count', device && device.vote_count);
  }

  function observed_item(device) {
    console.log('observed_item device.vote_count', device.vote_count);
    if (device.vote_count != undefined) {
      my.vote_count = device.vote_count;
    }
  }
}

function voteUpAction() {
  console.log('Vote Up');
  dbase_update_props({ vote_count: dbase_increment(1) });
}

function voteDownAction() {
  console.log('Vote Down');
  dbase_update_props({ vote_count: dbase_increment(-1) });
}

function switchDirectionAction() {
  dbase_issue_actions({ switch_action: 1 }, { all: 1 });
}

function removeAppAction() {
  dbase_remove_mo_app();
}

function switchDirection() {
  my.xstep = my.xstep * -1;
}

function calc_votes() {
  my.vote_total_count = 0;
  let a_devices = dbase_a_devices();
  for (let device of a_devices) {
    if (device.vote_count != undefined) {
      my.vote_total_count += device.vote_count;
    }
  }
}

// F5 to select chrome
// VS Code menu: Run > Start Debugging

// .vscode/launch.json
//    "url": "http://localhost:5500/examples/vote/",

// https://stackoverflow.com/questions/46945784/how-to-debug-javascript-in-visual-studio-code-with-live-server-running
