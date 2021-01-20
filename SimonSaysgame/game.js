var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
})

$('.btn').click(function() {
  animatePress(this);
})

$('body').on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('Success!');

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
  else {
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    console.log('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over')
    }, 200);
    $('h1').text('Game Over, Press Any Key To Restart.')
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  // audio.play();

  switch (name) {

    case 'green':
      var greenSound = new Audio('sounds/green.mp3');
      greenSound.play();
      break;

    case 'red':
      var redSound = new Audio('sounds/red.mp3');
      redSound.play();
      break;

    case 'yellow':
      var yellowSound = new Audio('sounds/yellow.mp3');
      yellowSound.play();
      break;

    case 'blue':
      var blueSound = new Audio('sounds/blue.mp3');
      blueSound.play();
      break;

    default:
      console.log('Failed');
  }
}

function animatePress(currentColour) {
  $(currentColour).addClass('pressed');
  setTimeout(function() {
    $(currentColour).removeClass('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
