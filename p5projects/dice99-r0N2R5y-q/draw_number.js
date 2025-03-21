//
function draw_number(n, sz) {
  // Convert number to string
  let str = (n + '').padStart(2, '0');
  let x = 10;
  let y = my.height;
  textSize(sz);
  // Draw black rect background
  let a = textAscent();
  let d = textDescent();
  let h = a + d;
  let w = textWidth(str);
  fill(0);
  // rect(x, y - h, w, h);
  rect(x, 0, w, my.height);

  // Draw white text
  fill(255);
  // x  y bottom-left corner.
  text(str, x, y - (my.height - h));
}
