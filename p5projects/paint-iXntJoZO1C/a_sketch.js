// https://editor.p5js.org/jht9629-gmail/sketches/iXntJoZO1C
// paint

// https://editor.p5js.org/jht9629-nyu/sketches/nBefVKAbH
// p5moExamples paint

// participants can cast a numeric vote up or down
// must be in portrait orientation to see crosses

let my = {};

// mo-paint/a_device/{uid}
//  { cross_x0, cross_y0, cross_size,
//    brush_x0, brush_y0, brush_size,
//    color_index, width, height
//  };

// p5.disableFriendlyErrors = true; // disables FES to improve performance

function setup() {
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  dbase_app_init({ completed: startup_completed });

  background(0);

  createButton('Clear').mousePressed(clearAction);
  createSpan('•');
  createButton('Cross: Larger').mousePressed(largerCrossSizeAction);
  createButton('Smaller').mousePressed(smallerCrossSizeAction);
  createSpan('•');
  createButton('Brush: Larger').mousePressed(largerBrushSizeAction);
  createButton('Smaller').mousePressed(smallerBrushSizeAction);
  createElement('br');
  createButton('Remove App').mousePressed(removeAppAction);

  // createSpan('•');
  // createButton('Spawn').mousePressed(spawnAction);
  // my.spawn_count_span = createSpan('');
}

function init_pane() {
  let width = my.width;
  let height = my.height;
  let db_update = 1;
  let cross_limit = my.cross_limit;
  let isRemote = my.isRemote;
  my.pane = new Pane({ width, height, db_update, cross_limit, isRemote });
}

function draw() {
  if (!my.pane) return;
  dbase_poll();
  if (my.isRemote) {
    if (mouseIsPressed && mouse_in_canvas()) {
      my.pane.mouseDragged();
    }
    my.pane.render();
    image(my.pane.layer, 0, 0);
  } else {
    draw_devices();
  }
}

//
// mouse events
//

function mouseDragged() {
  // console.log('mouseDragged');
  // return false; // required to prevent touch drag moving canvas on mobile
  return !mouse_in_canvas();
}

function mouse_in_canvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY < height;
}

function canvas_mousePressed() {
  // console.log('mousePressed mouseX', mouseX, 'mouseY', mouseY);
  my.pane.mousePressed();
}

function canvas_mouseReleased() {
  my.pane.mouseReleased();
}

//
// actions
//

function clearAction() {
  if (my.isRemote) {
    // my.pane.clear();
    dbase_issue_actions({ clear_action: 1 });
  } else {
    clear_all();
  }
}

function smallerCrossSizeAction() {
  my.pane.adjust_cross_size(-1);
  my.pane.next_crossColor();
}

function largerCrossSizeAction() {
  my.pane.adjust_cross_size(1);
  my.pane.next_crossColor();
}

function smallerBrushSizeAction() {
  my.pane.adjust_brush_size(-1);
  my.pane.next_brushColor();
}

function largerBrushSizeAction() {
  my.pane.adjust_brush_size(1);
  my.pane.next_brushColor();
}

function removeAppAction() {
  clear_all();
  dbase_remove_mo_app();
}

function clear_all() {
  background(0);
  dbase_issue_actions({ clear_action: 1 }, { all: 1 });
  deinit_panes();
}
