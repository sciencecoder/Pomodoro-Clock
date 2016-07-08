//CHANGE SESSION LENTGH
var num;
var sessionNum = 25;
var breakNum = 5;

$('.subtract').on('click', function() {
  $('#start').fadeIn(2000);
  num = $(this).next().text();
  if (num > 1) {
    num -= 1;
  }
  $(this).next().text(num.toString());
  $('#time').text($('#session-length .number').text().toString());
  sessionNum = parseInt($('#session-length .number').text());
  breakNum = parseInt($('#break-length .number').text());
});

$('.add').on('click', function() {
  $('#start').fadeIn(2000);
  num = parseInt($(this).prev().text());
  num += 1;
  $(this).prev().text(num.toString());
  $('#time').text($('#session-length .number').text().toString());
  sessionNum = parseInt($('#session-length .number').text());
  breakNum = parseInt($('#break-length .number').text());
})

//Count down source: https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}
var status = 'session';

function startSession(text) {
  var deadline = new Date(Date.parse(new Date()) + text * 60 * 1000);
  session(deadline);

}

function session(endtime) {
  function updateClock() {
    var t = getTimeRemaining(endtime);
    $('#time').text(('0' + t.minutes).slice(-2) + ' : ' + ('0' + t.seconds).slice(-2));
    $('.add, .subtract').on('click', function() {
      clearInterval(timeinterval);
    })
    
    $('#reset').on('click', function() {
       clearInterval(timeinterval);
      $('#time').text(sessionNum);
       $('#start').fadeIn(2000);
       $(this).fadeOut(2000);
    });
    if (t.total <= 0) {
      var sound = document.getElementById('beep');
      clearInterval(timeinterval);

      if (status === 'session') {
        startSession(breakNum);
        status = 'break';
        sound.play();
        $('#text').text("Break!");
        alert("Break Time!");

      } else {
        startSession(sessionNum);
        status = 'session';
        sound.play();
        $('#text').text("Session");

        alert("Session!");
      }
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
$('#reset').hide();
$('#start').on('click', function() {
  startSession(sessionNum);
  $(this).fadeOut(2000);
  $('#reset').fadeIn(2000);
 
});

