// Event Listener on start button
document.querySelector('.start-btn').addEventListener('click', function () {
  ui.changeState('instructions');
});

// Event Listener on the quit button that appears on the instructions state
document.querySelector('.quit-btn').addEventListener('click', function () {
  ui.changeState('welcome');
});

// Event Listener on the quit button that appears on the win-lose state
document.querySelector('.quit-btn-2').addEventListener('click', function () {
  ui.changeState('welcome');
});

// Event Listener on the start game button that appears on the instructions state
document.querySelector('.start-game-btn').addEventListener('click', startGame);

// Event Listener on the start game button that appears on the win-lose state
document
  .querySelector('.start-game-btn-2')
  .addEventListener('click', startGame);

// Event Listener on the Next button
document.querySelector('.next-btn').addEventListener('click', startGame);

// Event Listener on the Options
document.querySelector('.answers').addEventListener('click', getAns);

// Used to store the number of the question that we are currently on
let questionNumber = 0;

/* The data that the api sends is stored in this variable so that we can
pass it to other functions*/
let newData = '';

// Html of the timer. This is used in the timer function.
let timeLeft = document.querySelector('.time-left');

/* This variable is used in the timer function. It used to keep track of the 
amount of seconds. */
let i = 20;

/* This variable is also used in the timer function. It is used to clear the 
interval. Its realtion is with the setInterval function */
let check;

// Start the game
function startGame(e) {
  // Set the value of stop = false so that the timer will run
  stop = false;

  /* Do the following if we are not yet at the 10th question */
  if (questionNumber < 10) {
    // Get the question from the Api
    http
      .get(
        'https://quizapi.io/api/v1/questions?apiKey=EF97hh7Y1YLCfaOJDTUt7CmzrhXR1fV5XMOQDS2r&category=code&difficulty=Easy&limit=1'
      )
      .then((data) => {
        /* Remove the borders(if any) of the options and also set the innerHTML
        = '' */
        ui.changeToDefault();

        // Change the page state to the game-on state
        ui.changeState('game-on');

        // question data is stored in the newData variable
        newData = data;

        // Start the timer from 20 and then go down from there
        i = 20;

        // Clear any existing interval(if exists)
        clearInterval(check);

        // Run the timer
        timer();

        // Increase the question number
        questionNumber++;

        // Set the question data in the respective fields
        ui.setQuestionData(data, questionNumber);
      });

    /* If we are already at the 10th question then do the following */
  } else {
    // Change the page state to the win-lose state
    ui.changeState('win-lose');

    // Reset the questionNumber since we reached the end of the game
    questionNumber = 0;
  }

  e.preventDefault();
}

// Timer function
function timer() {
  // Set the value of the timeLeft field to 20 and then go down from there
  timeLeft.textContent = 20;

  check = setInterval(function () {
    // Decrease the seconds
    i--;

    // If i >= 0 meaning that if we havent reached the end yet then do the following
    if (i >= 0) {
      timeLeft.textContent = i;

      // If i<0 meaning that if we reached the end then do the following
    } else if (i < 0) {
      /* We want the timer to stop when the user runs out of time so we used
      clearInterval */
      clearInterval(check);

      // highlight the correct answer(because the user ran out of time)
      ui.highlightCorrectAns(newData);
    }
  }, 1000);
}

/* This function is used to determine which option user clicked on */
function getAns(e) {
  /* clearIntetval stops the 'interval' meaning that the timer will be stoped */
  clearInterval(check);

  // Used to store the textContent of the option user clicked on
  let answerTxt = '';

  // If what the user clicked on is indeed an option then do the following
  if (
    e.target.classList.contains('answer-1') ||
    e.target.classList.contains('answer-2') ||
    e.target.classList.contains('answer-3') ||
    e.target.classList.contains('answer-4')
  ) {
    // Get the textContent of the clicked option
    answerTxt = e.target.textContent;

    // Check the answer if its corrent or not
    ui.checkAns(newData, answerTxt, e.target);
  }
}
