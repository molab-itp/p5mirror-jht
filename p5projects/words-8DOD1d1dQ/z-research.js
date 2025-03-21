/*

word-header-txt
<h2 class="word-header-txt">annus mirabilis</h2>

chat-G: in html javascript query an element by class

var element = document.querySelector('.example-class');


https://www.merriam-webster.com/word-of-the-day/2023-01-01

word-header-txt

*/

{
  let elt = document.querySelector('.word-header-txt');

  elt.innerHTML;
  // 'annus mirabilis'
}

// !!@ Does not appear to be possible to read iframe document properties

// let elt = my.iframe_element.elt.document.querySelector('.word-header-txt');
{
  let iframe = my.iframe_element.elt;
  let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  console.log('iframeDocument', iframeDocument);
}

/*

Uncaught DOMException: Failed to read a named property 'document' from 'Window': Blocked a frame with origin "http://127.0.0.1:5500" from accessing a cross-origin frame.
    at <anonymous>:2:71
(anonymous) @ VM15786:2






*/

// --

// https://chat.openai.com/share/688a2050-26d6-465f-ab2b-2d3f2bcd7243
// javascript to format date as YYYY-MM-DD

// Example usage:
const date = new Date(); // This will get the current date and time
const formattedDate = formatDate(date);
console.log('formattedDate', formattedDate); // Output: "2024-03-03" (if today is March 3rd, 2024)

// https://chat.openai.com/share/688a2050-26d6-465f-ab2b-2d3f2bcd7243
// javascript to advance date to next day

function advanceToNextDay(date, delta) {
  // Clone the date object to avoid mutating the original date
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + delta);
  return nextDay;
}

// Example usage:
const currentDate = new Date(); // This will get the current date and time
const nextDay = advanceToNextDay(currentDate, -1);
// console.log('nextDay', nextDay.toDateString()); // Output: The date string representing the next day
console.log('nextDay', formatDate(nextDay)); // Output: The date string representing the next day
