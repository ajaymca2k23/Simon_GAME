var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern=[];

let started=false;
let level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

let btns=document.querySelectorAll(".btn");
btns.forEach((btn)=>{
    btn.addEventListener("click",function(){
        var userChosenColour=btn.getAttribute("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        
        checkAnswer(userClickedPattern.length-1);
    })
});


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    let randomNumber=Math.floor(Math.random()*4)
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    //  $("#"+currentColour).attr("class","btn "+currentColour+" pressed");
    $("#"+currentColour).addClass("pressed");
   setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
   },100);  
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }  
      } else { 
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        startOver();
        // console.log("wrong");
    } 
}

function startOver(){
    started=false;
    level=0;
    gamePattern=[];
}
