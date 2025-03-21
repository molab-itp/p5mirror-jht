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
