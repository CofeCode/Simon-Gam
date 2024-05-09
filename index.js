// Глобальные переменные и константы
let sequence = [];
let currentSequence = [];
let level = 0;

const audioFiles = {
  green: new Audio("./sounds/green.mp3"),
  red: new Audio("./sounds/red.mp3"),
  yellow: new Audio("./sounds/yellow.mp3"),
  blue: new Audio("./sounds/blue.mp3"),
  wrong: new Audio("./sounds/wrong.mp3"),
};

// Функция выбора случайного элемента и добавления его в последовательность
function calculateRandomElement() {
  const elements = ["green", "yellow", "red", "blue"];
  sequence.push(elements[Math.floor(Math.random() * elements.length)]);
}

// Функция проигрывания последовательности
function playSequence(index = 0) {
  if (index < sequence.length) {
    const key = sequence[index];
    $("#" + key).css("box-shadow", "inset 0 0 100px black");
    audioFiles[key].play();
    setTimeout(() => {
      $("#" + key).css("box-shadow", "");
      playSequence(index + 1); // Рекурсивный вызов для следующего элемента
    }, 1000);
  }
}

// Функция проверки последовательности
function checkSequence() {
  return currentSequence.every((value, index) => value === sequence[index]);
}

// Функция завершения игры
function gameOver() {
  $(".title").html("Игра окончена, <br> нажмите любую клавишу для перезапуска");
  $(".score").text("Ваш счет: " + level);
  $(".quit").text("");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  level = 0;
  audioFiles["wrong"].play();
  sequence = [];
  currentSequence = [];
}

// Обработчик клика на кнопки
$(".btn").click(function () {
  if (sequence.length > 0) {
    const clickedButtons = $(this).attr("id");
    currentSequence.push(clickedButtons);

    if (checkSequence()) {
      audioFiles[clickedButtons].play();
      $("#" + clickedButtons).css("box-shadow", "inset 0 0 100px black");
      setTimeout(() => {
        $("#" + clickedButtons).css("box-shadow", "");
      }, 300);
    } else {
      gameOver();
      return;
    }
    if (currentSequence.length === sequence.length) {
      level++;
      $(".title").text("Уровень " + level);
      currentSequence = [];
      calculateRandomElement();
      setTimeout(() => {
        playSequence();
      }, 1000);
    }
  }
});

// Обработчик нажатия клавиши
$(document).keypress(function () {
  $(".score").text("");
  if (sequence.length === 0) {
    level = 1;
    $(".title").text("Уровень " + level);
    $(".quit").text("Quit");
    $(".quit").click(() => {
      gameOver();
    });
    sequence = [];
    currentSequence = [];
    calculateRandomElement();
    playSequence();
  }
});
