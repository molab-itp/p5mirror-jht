// https://editor.p5js.org/jht9629-gmail/sketches/R49RqlWYn
// vote_DOMjs

// https://editor.p5js.org/jht9629-nyu/sketches/CAgivET8K
// p5moExamples vote_DOMjs 47

// participants can cast a numeric vote up or down
// buttons to flip and coup: reset the database

// display list of participants using DOMjs id_ul.innerHTML
// Using DOM.js for ui
//  https://github.com/lenincompres/DOM.js

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function setup() {
  my_setup(); // setup firebase configuration

  my.canvas = createCanvas(my.width, my.height);

  dbase_app_init({ completed: startup_completed }); // callback function when app init

  create_ui();
}

function draw() {
  background(0);
  fill(my.colors[abs(my.vote_count) % my.colors.length]);
  circle(my.x, my.y, my.len);
  my.x = (my.x + my.xstep + width) % width;

  calc_votes();

  id_vote_count_span.innerHTML = my.vote_count;
  id_vote_total_count_span.innerHTML = my.vote_total_count;

  if (dbase_actions_issued(my.uid, { switch_action: 1 })) {
    switchDirection();
  }
  dbase_poll();
}

// check device exists in db
function startup_completed() {
  console.log('startup_completed');
  //
  dbase_devices_observe({ observed_key, observed_item, all: 1 });

  function observed_key(key, device) {
    // console.log('observed_a_device key', key, 'uid', my.uid, 'device', device);
    console.log('observed_a_device key', key, 'device.vote_count', device && device.vote_count);
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
  // Make a copy of device list
  let a_devices = [...dbase_a_devices()];
  // Sort by uid so order is consistent
  a_devices = a_devices.sort(sort_by_uid);
  let items = [];
  for (let device of a_devices) {
    // console.log('device', device);
    let { uid, vote_count } = device;
    if (vote_count == undefined) {
      continue;
    }
    my.vote_total_count += vote_count;
    let item = `uid ${uid} vote_count ${vote_count}`;
    if (my.uid == uid) {
      item = `<b>${item}</b>`;
    }
    items.push(item);
  }
  //
  // !!@ how to attach at li
  id_ul.innerHTML = items.join('<br>');

  // li: {
  //   id: "listedThings",
  //   style: "font-weight:bold",
  //   height: "20px ",
  //   content: ["first item", "second item", "a third for good meassure"],
  // },
}

// (item1, item2) => item1.uid.localeCompare(item2.uid)
function sort_by_uid(item1, item2) {
  return item1.uid.localeCompare(item2.uid);
}
// https://github.com/lenincompres/DOM.js

// F5 to select chrome
// VS Code menu: Run > Start Debugging

// .vscode/launch.json
//    "url": "http://localhost:5500/examples/vote/",

// https://stackoverflow.com/questions/46945784/how-to-debug-javascript-in-visual-studio-code-with-live-server-running
