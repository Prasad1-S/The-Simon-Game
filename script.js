const buttonColours =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function startGame(){
  if(!started){
    nextsequence();
    started = true;
  }
};

function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").on("click", function(){
    $(this).fadeOut(100).fadeIn(100);
    var choosenColor = $(this).attr("id");
    playSound(choosenColor);
    userClickedPattern.push(choosenColor);
    animatePress(this);
    checkAnswer(userClickedPattern.length - 1 );
})

function animatePress(button){
 $(button).addClass("pressed");
  setTimeout(function () {
    $(button).removeClass("pressed");
  }, 100);
}


function nextsequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("LEVEL "+level);
  var randomNumber= Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColours[randomNumber]
  setTimeout(function(){ 
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
  },100);
  gamePattern.push(randomChoosenColor);
  console.log(gamePattern);
}


function checkAnswer(currentIndex){
  if(userClickedPattern[currentIndex]===gamePattern[currentIndex]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextsequence();
      },1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over!");
    startOver();
    $(".modall").show();
  }
}

function startOver(){
  level = 0;
  gamePattern=[];
  started=false;
}


window.onload = function() {
  const modal = document.getElementById("rulesModal");
  const closeBtn = document.getElementById("closeBtn");

  closeBtn.onclick = function() {
    modal.style.display = "none";
    startGame();
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      startGame();
    }
  };
};

$("#restartBtn").on("click", function(){
  startGame();
  $(".modall").hide();
});


