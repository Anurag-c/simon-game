

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var i=0;
var level=true;

function nextSequence()
{

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    level=false;
    $("h1").text("Level "+i);
    i++;
}

$(".btn").click(function(){
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if(level){
    nextSequence();
  }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


 function playSound(name)
 {
   var audio = new Audio("sounds/"+name+".mp3");
   audio.play();
 }

function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){$("."+currentColour).removeClass("pressed");},100);
}

function startOver() {
  i=0;
  gamePattern=[];
  userClickedPattern=[];
  level=true;
}
