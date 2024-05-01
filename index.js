const audioFiles = {
  "#green": new Audio("./sounds/green.mp3"),
  "#red": new Audio("./sounds/red.mp3"),
  "#yellow": new Audio("./sounds/yellow.mp3"),
  "#blue": new Audio("./sounds/blue.mp3"),
  "#wrong": new Audio("./sounds/wrong.mp3"),
};

function playAudioFile(key) {
  if (audioFiles[key]) {
    audioFiles[key].play();
  } else {
    audioFiles["#wrong"].play();
  }

  $(key).css("background-color", "black");
  setTimeout(function () {
    $(key).css("background-color", "");
  }, 250);
}

function calculateRandomElement() {
  var elements = ["#green", "#yellow", "#red", "#blue"];
  var randomIndex = Math.floor(Math.random() * elements.length);
  return (randomElement = elements[randomIndex]);
}

function pressWrongButton() {
  audioFiles["#wrong"].play();
  $(".title").text("Game Over, Press Any Key to Restart");
  $("body").css("background-color", "red");
  setTimeout(() => {
    $("body").css("background-color", ""), 3000;
  });
  $(document).on("keypress", function () {
    location.reload();
  });
}

var sequence = [];
var level =1

function pressRightButton(randomElement){
  $(".title").text("Level 2");
  audioFiles[randomElement].play();
  calculateRandomElement();
  playAudioFile(calculateRandomElement())
  //console.log(sequence)

}

function heckSequence(){
 
}


function playgame() {
  $(".title").text("Level 1");
  calculateRandomElement();
  playAudioFile(randomElement);


  //console.log(sequence)
  $(".btn").click(function (k) {
    //console.log("#" + k.target.id);
    var currentSequence = [];
    sequence.push(randomElement);

    currentSequence.push("#" + k.target.id)

    
    console.log("sequence " + sequence )
    console.log("currentSequence " + currentSequence)
    if (randomElement == "#" + k.target.id) {
      pressRightButton(randomElement);
    } else {
      pressWrongButton();
    }
 /*    if(sequence.length === currentSequence.length){
      //console.log("nah")
      if (randomElement == "#" + k.target.id) {
        pressRightButton(randomElement);
      } else {
        pressWrongButton();
      }
    } else{
      console.log("nah")
    } */
    
    //console.log("currentSequence " + currentSequence);
    
    
  });
  console.log("sequence " + sequence )
  console.log("currentSequence " + currentSequence)


}

function mainPage() {
  $(".title").text("Press A Key to Start");
  $(document).on("keypress", function (k) {
    if (k.key == "a") {
      playgame();
    }
  });
}
mainPage();
