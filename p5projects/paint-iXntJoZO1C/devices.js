//
function startup_completed() {
  console.log('startup_completed');

  dbase_devices_observe({ observed_key, removed_key });

  pingAction();

  init_pane();

  function observed_key(key, device) {
    // console.log('build_devices key', key, 'uid', my.uid, 'pane', my.pane);
    // console.log('build_devices observed key', key, 'uid', my.uid, 'device', device);
    if (my.isRemote && my.pane && key == my.uid) {
      my.pane.sync(device);
    } else if (my.panes) {
      let pane = my.panes[key];
      if (!pane) {
        console.log('build_devices NO pane key', key, 'uid', my.uid, 'pane', pane);
        return;
      }
      // console.log('build_devices sync key', key, 'pane', pane);
      pane.sync(device);
    }
  }

  function removed_key(key) {
    console.log('build_devices removed key', key, 'uid', my.uid, 'pane', my.pane);
    my.panes = {};
    my.last_ndevices = 0;
    // if (my.panes) {
    //   delete my.panes[key];
    // }
  }
}

//
// dbase device remote is set to 1 on startup to indicate
// device is remote control mode
//
function pingAction() {
  //
  let remote = my.isRemote ? 1 : 0;
  dbase_site_updates({ remote });
}
