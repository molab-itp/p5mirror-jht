// https://editor.p5js.org/jht9629-gmail/sketches/8DOD1d1dQ
// words

// https://editor.p5js.org/jht9629-nyu/sketches/23h3z1G82
// p5moExamples words 47

// overlay qrcode on a website
// [] convert to vanilla js
// [] action example

let my = {};

// mo-words/device/{uid}/word
//    individual word

function my_setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room1';
  my.mo_app = 'mo-words';
  my.nameDevice = '';

  my.iframe_src = 'https://www.merriam-webster.com/word-of-the-day/';
  my.word_date = new Date();
}

function setup() {
  my_setup();

  create_my_iframe();

  // my.canvas = createCanvas(my.width, my.height);
  noCanvas();

  dbase_app_init({ completed: startup_completed });

  createButton('Word Up').mousePressed(wordUp_action);
  createButton('Word Down').mousePressed(wordDown_action);
  createButton('To Day').mousePressed(toDay_action);
  // my.word_count_span = createSpan('' + my.word_count);
  // createElement('br');
  createSpan(' Date ');
  my.word_date_span = createSpan(formatDate(my.word_date));

  // Move the iframe below all the ui elements
  let body_elt = document.querySelector('body');
  let other_elt = my.iframe_element.elt;
  body_elt.insertBefore(other_elt, null);
}

function create_my_iframe() {
  my.iframe_element = createElement('iframe');
  my.iframe_element.elt.src = my.iframe_src + '2023-01-01';
  my.iframe_element.elt.width = windowWidth;
  my.iframe_element.elt.height = windowHeight;
}

function draw() {
  background(200);
  //
  my.word_date_span.html(my.word_date.toDateString());
}

function startup_completed() {
  console.log('startup_completed');

  dbase_devices_observe({ observed_item, all: 1 });

  function observed_item(device) {
    console.log('observed_item device', device);
    if (device.word_date != undefined) {
      my.word_date = new Date(device.word_date);
      let fdate = formatDate(my.word_date);
      my.iframe_element.elt.src = my.iframe_src + fdate;
    }
  }
}

function toDay_action() {
  my.word_date = new Date();
  dbase_update_props({ word_date: adjust_word_date(0) });
}

function wordUp_action() {
  console.log('Word Up');
  // dbase_update_props({ word_count: dbase_increment(1) });
  dbase_update_props({ word_date: adjust_word_date(1) });
}

function wordDown_action() {
  console.log('Word Down');
  // dbase_update_props({ word_count: dbase_increment(-1) });
  dbase_update_props({ word_date: adjust_word_date(-1) });
}

function adjust_word_date(delta) {
  my.word_date = adjustDate(my.word_date, delta);
  // return formatDate(my.word_date);
  return my.word_date.toDateString();
}

function adjustDate(date, delta) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + delta);
  console.log('adjustDate date', date.getDate(), 'getDate', nextDay.getDate());
  return nextDay;
}

function formatDate(date) {
  // Extract year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, '0');

  // Construct the formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

/*

https://www.merriam-webster.com/word-of-the-day/2023-01-01
Annus mirabilis means “a remarkable or notable year.”

https://www.merriam-webster.com/word-of-the-day/2024-01-01
Incipient is used to describe things which are 
beginning to come into being 
or which are to become apparent.

https://www.w3schools.com/tags/tag_iframe.ASP


my.iframe_element.elt.src = 'https://www.merriam-webster.com/word-of-the-day/2023-01-01'

*/

// Issue: lots of debug noise for iframe web site
