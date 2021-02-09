// Event Listener on start button
document.querySelector('.start-btn').addEventListener('click', function () {
  ui.changeState('instructions');
});

// Event Listener on the quit button
document.querySelector('.quit-btn').addEventListener('click', function () {
  ui.changeState('welcome');
});

document.querySelector('.quit-btn-2').addEventListener('click', function () {
  ui.changeState('welcome');
});

// Event Listener on the start game button
document.querySelector('.start-game-btn').addEventListener('click', startGame);

// Event Listener on the start game button
document
  .querySelector('.start-game-btn-2')
  .addEventListener('click', startGame);

// Event Listener on the Next button
document.querySelector('.next-btn').addEventListener('click', startGame);

// Event Listener on the Options
document.querySelector('.answers').addEventListener('click', getAns);

let questionNumber = 0;

let newData = '';

let stop;

let timeLeft = document.querySelector('.time-left');

let i;

let check;

function startGame(e) {
  stop = false;
  if (questionNumber < 10) {
    http
      .get(
        'https://quizapi.io/api/v1/questions?apiKey=EF97hh7Y1YLCfaOJDTUt7CmzrhXR1fV5XMOQDS2r&category=code&difficulty=Easy&limit=1'
      )
      .then((data) => {
        ui.changeToDefault();
        ui.changeState('game-on');
        newData = data;
        i = 0;
        clearInterval(check);
        timer();
        questionNumber++;
        ui.setQuestionData(data, questionNumber);
        console.log(data);
      });
  } else {
    ui.changeState('win-lose');
    questionNumber = 0;
  }

  e.preventDefault();
}

function timer() {
  timeLeft.textContent = 0;
  check = setInterval(function () {
    i++;
    if (!stop) {
      if (i <= 20) {
        timeLeft.textContent = i;
      } else if (i === 21) {
        clearInterval(check);
        ui.highlightCorrectAns(newData);
      }
    }
  }, 1000);
}

function getAns(e) {
  stop = true;
  let answerTxt = '';
  if (
    e.target.classList.contains('answer-1') ||
    e.target.classList.contains('answer-2') ||
    e.target.classList.contains('answer-3') ||
    e.target.classList.contains('answer-4')
  ) {
    answerTxt = e.target.textContent;
    ui.checkAns(newData, answerTxt, e.target);
  }
}
