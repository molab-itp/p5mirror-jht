//
function my_init() {
  my.full_screen = 1;
  if (my.full_screen) {
    my.width = windowWidth;
    // Leave room at bottom for buttons
    my.height = windowHeight - 60;
  } else {
    my.width = 200;
    my.height = 200;
  }
  //
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room1';
  my.mo_app = 'mo-paint';
  my.nameDevice = '';
  my.spawn_count = 0;
  my.cross_limit = 0.2;

  my.query = get_url_params();

  // my.isRemote = my.height > my.width;

  // ?remote=1 -- devices paints, default
  // ?remote=0 -- show other paint devices
  //
  my.isRemote = 1;
  if (my.query) {
    my.isRemote = parseFloat(my.query.remote || my.isRemote);
  }
}
