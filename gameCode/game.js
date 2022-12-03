//declaration section
var gamePattern = [];
var levelCounter = 0;
var playerPattern = [];
var soundIndex = "a";
let visualAid = true;
//defining the alert to be generated
const alertPlaceholder = document.getElementById('liveAlertPlaceholder') //finding the placeholder div and initiating an object in JS
    const alert = (message, type) => { //defining the alert function which will be called to display an alert
        const wrapper = document.createElement('div') //wrapper object which will create a div element when function is called
        //the lines below define the html of the div element created
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div><center><h4>${message}</h4></center></div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('') //the .join() method joins the strings in the array 
        alertPlaceholder.append(wrapper) //to add the wrapper html to the placeholder div
}
//defining the functions
function checkAnswer(userInput,levelPattern){   //To check whether the sequence entered by user matches with game sequence 
    userPattern = userInput.map((n)=>Number(n)) //converting string array to numerical array
    console.log(userPattern);
    if(userPattern.length > 0 && userPattern.length === levelPattern.length){
        if(JSON.stringify(userPattern)===JSON.stringify(levelPattern)){    //comparing the length of the sequence
            nextSequence(); //to start the next  level
        }
        else{
            alert("incorrect input sequence","danger");
            resetSequence(); //to reset the levels
        }
    }
}
//defining what to do upon next level
function nextSequence(){
    $(".strtbtn").hide(); //hide the start buton
    playerPattern = []; //reset the player sequence
    levelCounter++; //increase the level counter
    if(levelCounter === 1){ //if its the first level
        alert('Start Game!','success')
        $("h1").fadeOut(500);
        $("h1").text("Level 1").fadeIn(500);
    }
    else{
        alert('Next Level!','success'); //other levels
        $("h1").fadeOut(500);
        $("h1").text("Level "+ levelCounter).fadeIn(500);
    }
    gamePattern.push(Math.floor(Math.random() * 3)) //generating the next button for the sequence
    console.log(gamePattern);
    setTimeout(function(){      //To call simon to tell the next sequence after a delay of 2 seconds
        console.log("level start")
        simonSaid(gamePattern);   
    },2000);
} 
//defining what to do when game over i.e to reset the game
function resetSequence(){
    setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 1000);
    $(".strtbtn").show(); //show the start button again
    $("h1").fadeIn(500,0).text("Simon Says : The Game"); //show the main game title
    levelCounter = 0; //reset the level counter
    console.log("level is : "+levelCounter);
    gamePattern = []; //reset the game sequence
    console.log("game pattern is : "+gamePattern);
    playerPattern = []; //reset the user sequence
    console.log("player pattern is : "+playerPattern);
}
//to define how simon will say the sequence
function simonSaid(pattern){
    setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 500);
    function saidThis(i){ //a recursion is used to maintain a synchronous sequence of events
        if(i<pattern.length && i >= 0){ //simon will start to say the sequence from beginning everytime
            if(visualAid){ //for gameMode if visual aid is true then classic gamemode , if false then the blind gamemode
                $("#"+pattern[i]).fadeIn(100).fadeOut(100).fadeIn(100); //the visual aid
            }
            var sound = new Audio("Sounds/s"+Number(pattern[i])+soundIndex+".wav"); //creating an Audio object for the sound corresponding to the button pressed
            sound.play(); //to play the corresponding sound the play() method is invoked
        } 
        setTimeout(function(){ //to say the next button in sequence after a delay of 500ms
            i++;
            saidThis(i);
        },500);
    }
    saidThis(-1); //we initialize the sequence from -1 so that the conditions are checked properly and then the sequence plays without any issues
}
//defining the changes when a skin is selected
function lt_theme(){
    $(".skin").attr("href","Skins/styles2.css"); //to change the stylesheet for light theme/skin
    soundIndex = ""; //to set the sound bank for light theme
}

function dk_theme(){
    $(".skin").attr("href","Skins/styles3.css"); //to change the stylesheet for dark theme/skin
    soundIndex = "b"; //to set the sound bank for dark theme
}

function st_theme(){
    $(".skin").attr("href","Skins/styles.css"); //to change the stylesheet for standard theme/kin
    soundIndex = "a"; //to set the sound bank for standard theme
}
//defining the event listeners using JQuery
//click event for the main game elements i.e the big square buttons
$(".box").click(function(){
    if (visualAid){ //for gameMode if visual aid is true then classic gamemode , if false then the blind gamemode
        $("#"+this.id).fadeIn(100).fadeOut(100).fadeIn(100); //the visual aid
    }
    const aud = new Audio("Sounds/s"+this.id+soundIndex+".wav"); //creating an Audio object for the sound corresponding to the button pressed
    aud.play(); //to play the corresponding sound the play() method is invoked
    playerPattern.push(this.id); //to push the id of the button pressed by the user to the user sequence array
    setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 500);

    setTimeout(function(){ //to check the sequence entered by the user with the game sequence after a delay of 500 ms
        checkAnswer(playerPattern,gamePattern);
    },500);
})
//click event for the start button
$(".strtbtn").click(nextSequence);
//onLoad event i.e when the webPage loads or the main window loads, to display the how to play instruction guide
$(window).on("load",function(){
    $("#howToPlayModal").modal("show");
  })
//click event for game mode selection, this is for classic mode
$(".gameMode1").click(
    function(){
        visualAid = true;
        console.log("visual aid : "+visualAid);
        alert("Simon Classic Game Mode!","success");
        setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function(){
                $(this).remove(); 
            });
        }, 1000);
    }
);
//click event for game mode selection, this is for blind mode
$(".gameMode2").click(
    function(){
        visualAid = false;
        console.log("visual aid : "+visualAid);
        alert("Simon Blind Game Mode!","success");
        setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function(){
                $(this).remove(); 
            });
        }, 1000);
    }
);