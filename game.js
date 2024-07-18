var gamePattern = [];

var userClickedPattern = [];

var count = 0;
var level = 0;
var leve = 0;
var countClick = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

function playsound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function wrongAnswer()
{
  playsound("wrong");
       $("body").addClass("pressed");
       setTimeout(function(){
        $("body").removeClass("pressed");
       },200);

       $("h1").html("Game Over, Press Any Key to Restart");
       leve=0;
       level=0;
       countClick=0;
       count=0;
       gamePattern=[];
       userClickedPattern=[];
}


console.log("count is " + count);

function newSequence() {
  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  console.log("system - " + gamePattern);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColour);
}

function checkAnswer(currentClick) {
  
    for (var i = 0; i < currentClick; i++) {
      if (gamePattern[i] !== userClickedPattern[i]) {
        count = 1;
        break;        
      }
    }
  
  

  return count;
}

$(".btn").click(function () {
  countClick++;
  var userChosenColour = $(this).attr("id");
  playsound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }
  console.log("count- "+countClick);

  animatePress(userChosenColour);
  console.log("user- " + userClickedPattern);

  if(level!==countClick){
    if(checkAnswer(countClick)===1){
      wrongAnswer();
    }
  }else{
    if(checkAnswer(countClick)===0)
   {
      level++;
      countClick=0;
      userClickedPattern=[];
      newSequence();
      
   }
   else{
    wrongAnswer();
   }
  }
  
  
});


$(document).keydown(function () {
  if (leve === 0) {
    level++;
    newSequence();
    leve = -1;
  }
});
