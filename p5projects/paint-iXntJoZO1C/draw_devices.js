//

function draw_devices() {
  if (layout_needed_check()) {
    console.log('draw_devices layout_needed_check n', dbase_a_devices().length);
    build_panes();
  }
  draw_panes();
}

//
// Draw panes in my.panes
//
function draw_panes() {
  let status = {};
  for (let uid in my.panes) {
    let pane = my.panes[uid];
    // console.log('draw_panes pane', pane);
    pane.prepare_layer(status);
    {
      // image(pane.layer, pane.layout.x0, pane.layout.y0);
      let img = pane.layer;
      let dx = pane.layout.x0;
      let dy = pane.layout.y0;
      let dWidth = my.xlen;
      let dHeight = my.ylen;
      let sx = 0;
      let sy = 0;
      if (img) {
        image(img, dx, dy, dWidth, dHeight, sx, sy, img.width, img.height);
      } else {
        console.log('draw_panes img', img, 'pane', pane);
      }
    }
  }
  if (status.cleared) {
    background(0);
  }
}

function deinit_panes() {
  for (let uid in my.panes) {
    let pane = my.panes[uid];
    pane.deinit();
  }
  my.panes = {};
  my.last_ndevices = 0;
}

function build_panes() {
  let layouts = layout_devices();
  my.panes = {};
  for (let layout of layouts) {
    // console.log('build_panes layout', layout);

    // layout = { x0: x, y0: y, uid, width, height, device }
    let { width, height, uid } = layout;
    let pane = new Pane({ width, height, uid, layout });
    pane.sync(layout.device);

    my.panes[layout.uid] = pane;
  }
}

function layout_needed_check() {
  let a_devices = dbase_a_devices();
  let ndevices = a_devices.length;
  if (ndevices != my.last_ndevices) {
    console.log('layout_needed_check new ndevices', ndevices);
    my.last_ndevices = ndevices;
    return 1;
  }
  return 0;
}

// returns: [ { device, x0: x, y0: y }, ... ]
//
function layout_devices() {
  my.ndiv = 1;
  let a_devices = dbase_a_devices();
  let ndevices = a_devices.length;
  let more;
  let layouts;
  do {
    more = 0;
    // my.xlen = width / my.ndiv;
    // my.ylen = my.xlen * (16 / 9);
    my.ylen = height / my.ndiv;
    my.xlen = my.ylen * (9 / 16);
    let xhalf = my.xlen * 0.5;
    let yhalf = my.ylen * 0.5;
    let x0 = 0;
    let x = x0;
    let y = 0;
    layouts = [];
    for (let index = 0; index < ndevices; index++) {
      let device = a_devices[index];
      if (!device) {
        console.log('layout_devices no device', index, device);
        return;
      }
      {
        let { uid, width, height } = device;
        if (width != undefined) {
          layouts.push({ x0: x, y0: y, uid, width, height, device });
        }
      }
      // console.log('layout_devices x', x, 'y', y, 'uid', device.uid);
      if (index != ndevices - 1) {
        x += my.xlen;
      }
      if (x + xhalf > width) {
        x = x0;
        y += my.ylen;
        if (y + yhalf > height) {
          my.ndiv += 1;
          more = 1;
          // console.log('layout_devices more', more, 'index', index);
          break;
        }
      }
    }
    // console.log('layout_devices more', more);
  } while (more);
  return layouts;
}
