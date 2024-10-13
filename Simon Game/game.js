var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


// Start the game
// nextSequence();
$(document).keydown(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});


// User choices
$(".btn").click(function() {

    // get id of div clicked & push it into userClickedPattern array
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    // checking patterns
    // passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});


// Check answer - Main Logic
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])   // check color value at index
    {
        // If the user got the most recent answer right (if wrong go to else), then check that they have finished their sequence with another if statement. - if they have, then provide nextSequence after a delay (if not, let the user continue clicking his pattern)
        if (userClickedPattern.length === gamePattern.length)
        {
            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else 
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}


// nextSequence()
function nextSequence() {
    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level "+ level);

    // generate a random number, a random color & push it into gamePattern array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // fade in fade out animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


// playSound
function playSound(name)
{
    audioSource = "sounds/" + name + ".mp3";
    var colourSound = new Audio("sounds/" + name + ".mp3");
    colourSound.play();  
}


// animate press
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


// startOver
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}