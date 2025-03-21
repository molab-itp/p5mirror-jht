//
// Using DOM.js for ui
//  https://github.com/lenincompres/DOM.js

function create_ui() {
  DOM.set([
    { tag: 'button', text: 'Vote Up', onclick: voteUpAction },
    { tag: 'button', text: 'Down', onclick: voteDownAction },
    { tag: 'span', id: 'id_vote_count_span', text: my.voteCount },
    { tag: 'br' },
    { tag: 'span', text: 'Total Votes ' },
    { tag: 'span', id: 'id_vote_total_count_span', text: my.vote_total_count },
    { tag: 'br' },
    { tag: 'button', text: 'Flip', onclick: switchDirectionAction },
    { tag: 'button', text: 'Coup', onclick: removeAppAction },
    { tag: 'ul', id: 'id_ul' },
  ]);

  // createButton('Vote Up').mousePressed(voteUpAction);
  // createButton('Down').mousePressed(voteDownAction);
  // my.vote_count_span = createSpan('' + my.vote_count);
  // createElement('br');
  // createSpan('Total Votes ');
  // my.vote_total_count_span = createSpan('' + my.vote_total_count);
  // createElement('br');
  // createButton('Direction').mousePressed(switchDirectionAction);
  // createElement('br');
  // createButton('Remove App').mousePressed(removeAppAction);
}

// function calc_votes() {
//    let item = `uid ${uid} vote_count ${vote_count}`;
//    id_ul.innerHTML = items.join('<br>');

// id_vote_count_span.innerHTML = my.vote_count;
// id_vote_total_count_span.innerHTML = my.vote_total_count;

// my.vote_count_span.html(my.vote_count);
// my.vote_total_count_span.html(my.vote_total_count);

// https://editor.p5js.org/jht9629-nyu/sketches/mLU67cNL0
// test drive DOM.js v8

// https://github.com/lenincompres/DOM.js?tab=readme-ov-file#the-domset-method

// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

// https://editor.p5js.org/jht9629-nyu/sketches/Bv2yPxl9Y
// test drive DOM.js v1
// someElement undefined
// needed to add id_main
