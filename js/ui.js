class UI {
  constructor() {
    // Welome State
    this.welcomeState = document.querySelector('.welcome-state');

    // Instructions State
    this.instructionsState = document.querySelector('.instructions-state');

    // Game On State
    this.gameOnState = document.querySelector('.game-on');
    // Where we insert the question
    this.question = document.querySelector('.question');

    // Win-lose-State
    this.WinOrLose = document.querySelector('.win-lose-state');
    this.congratesOrNice = document.querySelector('.congrate-nice');
    this.emoji = document.querySelector('.emoji');
    this.obtainedPoints = document.querySelector('.got');

    // Next Button
    this.nextBtn = document.querySelector('.next-btn');

    // All the options
    this.option1 = document.querySelector('.answer-1');
    this.option2 = document.querySelector('.answer-2');
    this.option3 = document.querySelector('.answer-3');
    this.option4 = document.querySelector('.answer-4');

    // Where we insert the number of the question
    this.outOf = document.querySelector('.out-of');

    // Used to store the points user scores
    this.points = 0;
  }

  /* When the user clicks on an option then we want the click event to
  disable meaning that we dont want the user to be able to click any
  other option and that's what this function does it disables the click
  event of all the functions */
  disableClickEvent() {
    this.option1.style.pointerEvents = 'none';
    this.option2.style.pointerEvents = 'none';
    this.option3.style.pointerEvents = 'none';
    this.option4.style.pointerEvents = 'none';
  }

  // This function enables the click event of all the options
  enableClickEvent() {
    this.option1.style.pointerEvents = 'auto';
    this.option2.style.pointerEvents = 'auto';
    this.option3.style.pointerEvents = 'auto';
    this.option4.style.pointerEvents = 'auto';
  }

  /* When the user clicks on an option then that option is given a border based
  on if the clicked option was the correct option or not and this function is used
  to remove that border. It removes the border given from the previous question
  and it also sets the innerHTML of all the options = ''*/
  changeToDefault() {
    this.option1.style.border = 'none';
    this.option1.innerHTML = '';

    this.option2.style.border = 'none';
    this.option2.innerHTML = '';

    this.option3.style.border = 'none';
    this.option3.innerHTML = '';

    this.option4.style.border = 'none';
    this.option4.innerHTML = '';

    // Enable the click event
    this.enableClickEvent();
  }

  // Used to change the state of the page
  changeState(state) {
    // Do the following for welcome state
    if (state === 'welcome') {
      this.instructionsState.style.display = 'none';
      this.gameOnState.style.display = 'none';
      this.WinOrLose.style.display = 'none';
      this.welcomeState.style.display = 'block';

      // Do the following for Instructions state
    } else if (state === 'instructions') {
      this.welcomeState.style.display = 'none';
      this.instructionsState.style.display = 'block';

      // Do the following for game-on state
    } else if (state === 'game-on') {
      this.instructionsState.style.display = 'none';
      this.WinOrLose.style.display = 'none';
      this.gameOnState.style.display = 'block';
      this.option1.style.display = 'none';
      this.option2.style.display = 'none';
      this.option3.style.display = 'none';
      this.option4.style.display = 'none';
      this.nextBtn.style.display = 'none';

      //Do the following for win-lose state
    } else if ('win-lose') {
      this.gameOnState.style.display = 'none';

      // If the scored 5 or more points then do the following
      if (this.points >= 5) {
        // Set the textContent of this element to congrats
        this.congratesOrNice.textContent = 'congrats';

        // Set the emoji here
        this.emoji.innerHTML = '<i class="smile-icon far fa-laugh"></i>,';

        // Display the scored points
        this.obtainedPoints.textContent = this.points;

        // If the scored less than 5 then do the following
      } else {
        // Set the textContent of this element to nice
        this.congratesOrNice.textContent = 'nice';

        // Set the emoji here
        this.emoji.innerHTML = '<i class="smile-icon far fa-laugh-beam"></i>,';

        // Display the scored points
        this.obtainedPoints.textContent = this.points;
      }

      // Display the win-lose container
      this.WinOrLose.style.display = 'block';

      // Reset the points variable since we reached the end
      this.points = 0;

      /* Reset the value of the next button which as changed in the setQuestionData
      function*/
      this.nextBtn.value = 'Next';
    }
  }

  /* This function is used to set the question in its respective place and
  also set all of the options */
  setQuestionData(data, questionNumber) {
    // Set the question
    this.question.textContent = data[0].question;

    /* If the question only has 2 answers then answer c & answer d will be = to null.
    So based on that we set the data in only two options */
    if (
      data[0].answers.answer_c === null &&
      data[0].answers.answer_d === null
    ) {
      this.option1.style.display = 'block';
      this.option1.textContent = data[0].answers.answer_a;
      this.option2.style.display = 'block';
      this.option2.textContent = data[0].answers.answer_b;

      /* If the question only has 3 answers then answer c will != to null but answer d
      will be = to null. So based on that we set the data in only three options*/
    } else if (
      data[0].answers.answer_c !== null &&
      data[0].answers.answer_d === null
    ) {
      this.option1.style.display = 'block';
      this.option1.textContent = data[0].answers.answer_a;
      this.option2.style.display = 'block';
      this.option2.textContent = data[0].answers.answer_b;
      this.option3.style.display = 'block';
      this.option3.textContent = data[0].answers.answer_c;

      /* If the questionhas 4 answers then both anwer c and answer d will not be =
       to null. So based on that we set the data in all the four options*/
    } else if (
      data[0].answers.answer_c !== null &&
      data[0].answers.answer_d !== null
    ) {
      this.option1.style.display = 'block';
      this.option1.textContent = data[0].answers.answer_a;
      this.option2.style.display = 'block';
      this.option2.textContent = data[0].answers.answer_b;
      this.option3.style.display = 'block';
      this.option3.textContent = data[0].answers.answer_c;
      this.option4.style.display = 'block';
      this.option4.textContent = data[0].answers.answer_d;
    }

    // Set the number of question in the its respective place
    this.outOf.textContent = questionNumber;

    // If we are at the 10th question then set the value of the next button to 'finish'.
    if (this.outOf.textContent === '10') {
      this.nextBtn.value = 'Finish';
    }
  }

  /* This function is used to highlight the correct answer when the user runs out
  of time */
  highlightCorrectAns(newData) {
    /* First disable the click event when the user runs out of time so that the
    user can't click any of the options */
    this.disableClickEvent();

    /* The next button is hidden by default and we only want it to appear when
    the user runs out time or clicks an option */
    this.nextBtn.style.display = 'block';

    /* If answer a = true then this means that option a is the correct answer and
    so we change its border color and also give it that green tick. */
    if (newData[0].correct_answers.answer_a_correct === 'true') {
      this.option1.style.border = '2px solid #00cc00';
      this.option1.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';

      /* If answer b = true then this means that option b is the correct answer and
      so we change its border color and also give it that green tick. */
    } else if (newData[0].correct_answers.answer_b_correct === 'true') {
      this.option2.style.border = '2px solid #00cc00';
      this.option2.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';

      /* If answer c = true then this means that option c is the correct answer and
      so we change its border color and also give it that green tick. */
    } else if (newData[0].correct_answers.answer_c_correct === 'true') {
      this.option3.style.border = '2px solid #00cc00';
      this.option3.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';

      /* If answer d = true then this means that option d is the correct answer and
      so we change its border color and also give it that green tick. */
    } else if (newData[0].correct_answers.answer_d_correct === 'true') {
      this.option4.style.border = '2px solid #00cc00';
      this.option4.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
    }
  }

  /* This function is used to check if the option clicked by the user is correct
  or not */
  checkAns(newData, answerTxt, selectedAns) {
    /* First disable the click event so that the user can't click 
    any other the option */
    this.disableClickEvent();

    /* The next button is hidden by default and we only want it to appear when
    the user runs out time or clicks an option */
    this.nextBtn.style.display = 'block';

    /* If answer a = true then this means that option a is the correct answer */
    if (newData[0].correct_answers.answer_a_correct === 'true') {
      /* If answer a is correct then we compare the clicked option to answer a
      if they match then do the following */
      if (newData[0].answers.answer_a === answerTxt) {
        /* Give the clicked option a green border */
        selectedAns.style.border = '2px solid #00cc00';

        /* Give the clicked option that green tick */
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';

        // Increase the points by 1
        this.points++;

        /* If answer a and the clicked option does not match then do the following */
      } else {
        /* Give the clicked option a red border because its not the correct answer*/
        selectedAns.style.border = '2px solid #ff4c4c';

        /* Give the clicked option that red cross */
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        // Give option a a green border because its the correct answer
        this.option1.style.border = '2px solid #00cc00';

        /* Give option a that green tick */
        this.option1.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }

      /* If answer b = true then this means that option b is the correct answer */
    } else if (newData[0].correct_answers.answer_b_correct === 'true') {
      /* If answer b is correct then we compare the clicked option to answer b
      if they match then do the following */
      if (newData[0].answers.answer_b === answerTxt) {
        /* Give the clicked option a green border */
        selectedAns.style.border = '2px solid #00cc00';

        /* Give the clicked option that green tick */
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';

        // Increase the points by 1
        this.points++;

        /* If answer b and the clicked option does not match then do the following */
      } else {
        /* Give the clicked option a red border because its not the correct answer*/
        selectedAns.style.border = '2px solid #ff4c4c';

        /* Give the clicked option that red cross */
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        // Give option b a green border because its the correct answer
        this.option2.style.border = '2px solid #00cc00';

        /* Give option b that green tick */
        this.option2.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }

      /* If answer c = true then this means that option c is the correct answer */
    } else if (newData[0].correct_answers.answer_c_correct === 'true') {
      /* If answer c is correct then we compare the clicked option to answer c
      if they match then do the following */
      if (newData[0].answers.answer_c === answerTxt) {
        /* Give the clicked option a green border */
        selectedAns.style.border = '2px solid #00cc00';

        /* Give the clicked option that green tick */
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';

        // Increase the points by 1
        this.points++;

        /* If answer c and the clicked option does not match then do the following */
      } else {
        /* Give the clicked option a red border because its not the correct answer*/
        selectedAns.style.border = '2px solid #ff4c4c';

        /* Give the clicked option that red cross */
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        // Give option c a green border because its the correct answer
        this.option3.style.border = '2px solid #00cc00';

        /* Give option c that green tick */
        this.option3.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }

      /* If answer d = true then this means that option d is the correct answer */
    } else if (newData[0].correct_answers.answer_d_correct === 'true') {
      /* If answer d is correct then we compare the clicked option to answer d
      if they match then do the following */
      if (newData[0].answers.answer_d === answerTxt) {
        /* Give the clicked option a green border */
        selectedAns.style.border = '2px solid #00cc00';

        /* Give the clicked option that green tick */
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';

        // Increase the points by 1
        this.points++;

        /* If answer d and the clicked option does not match then do the following */
      } else {
        /* Give the clicked option a red border because its not the correct answer*/
        selectedAns.style.border = '2px solid #ff4c4c';

        /* Give the clicked option that red cross */
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        // Give option d a green border because its the correct answer
        this.option4.style.border = '2px solid #00cc00';

        /* Give option d that green tick */
        this.option4.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }
    }
  }
}

// New ui Object
const ui = new UI();
