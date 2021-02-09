class UI {
  constructor() {
    // Welome State
    this.welcomeState = document.querySelector('.welcome-state');

    // Instructions State
    this.instructionsState = document.querySelector('.instructions-state');

    // Game On State
    this.gameOnState = document.querySelector('.game-on');
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

    this.tick1 = document.querySelector('.tick-1');
    this.tick2 = document.querySelector('.tick-2');
    this.tick3 = document.querySelector('.tick-3');
    this.tick4 = document.querySelector('.tick-4');

    this.cross1 = document.querySelector('.cross-1');
    this.cross2 = document.querySelector('.cross-2');
    this.cross3 = document.querySelector('.cross-3');
    this.cross4 = document.querySelector('.cross-4');

    this.outOf = document.querySelector('.out-of');

    this.points = 0;
  }

  disableClickEvent() {
    this.option1.style.pointerEvents = 'none';
    this.option2.style.pointerEvents = 'none';
    this.option3.style.pointerEvents = 'none';
    this.option4.style.pointerEvents = 'none';
  }

  enableClickEvent() {
    this.option1.style.pointerEvents = 'auto';
    this.option2.style.pointerEvents = 'auto';
    this.option3.style.pointerEvents = 'auto';
    this.option4.style.pointerEvents = 'auto';
  }

  changeToDefault() {
    this.option1.style.border = 'none';
    this.option1.innerHTML = '';
    this.option2.style.border = 'none';
    this.option2.innerHTML = '';
    this.option3.style.border = 'none';
    this.option3.innerHTML = '';
    this.option4.style.border = 'none';
    this.option4.innerHTML = '';
    this.enableClickEvent();
  }

  changeState(state) {
    if (state === 'welcome') {
      this.instructionsState.style.display = 'none';
      this.gameOnState.style.display = 'none';
      this.WinOrLose.style.display = 'none';
      this.welcomeState.style.display = 'block';
    } else if (state === 'instructions') {
      this.welcomeState.style.display = 'none';
      this.instructionsState.style.display = 'block';
    } else if (state === 'game-on') {
      this.instructionsState.style.display = 'none';
      this.WinOrLose.style.display = 'none';
      this.gameOnState.style.display = 'block';
      this.option1.style.display = 'none';
      this.option2.style.display = 'none';
      this.option3.style.display = 'none';
      this.option4.style.display = 'none';
      this.nextBtn.style.display = 'none';
    } else if ('win-lose') {
      this.gameOnState.style.display = 'none';
      if (this.points >= 5) {
        this.congratesOrNice.textContent = 'congrats';
        this.emoji.innerHTML = '<i class="smile-icon far fa-laugh"></i>,';
        this.obtainedPoints.textContent = this.points;
      } else {
        this.congratesOrNice.textContent = 'nice';
        this.emoji.innerHTML = '<i class="smile-icon far fa-laugh-beam"></i>,';
        this.obtainedPoints.textContent = this.points;
      }
      this.WinOrLose.style.display = 'block';
      this.points = 0;
    }
  }

  setQuestionData(data, questionNumber) {
    this.question.textContent = data[0].question;

    if (
      data[0].answers.answer_c === null &&
      data[0].answers.answer_d === null
    ) {
      this.option1.style.display = 'block';
      this.option1.textContent = data[0].answers.answer_a;
      this.option2.style.display = 'block';
      this.option2.textContent = data[0].answers.answer_b;
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

    this.outOf.textContent = questionNumber;

    if (this.outOf.textContent === '10') {
      this.nextBtn.value = 'Finish';
    }
  }

  highlightCorrectAns(newData) {
    this.disableClickEvent();
    this.nextBtn.style.display = 'block';
    if (newData[0].correct_answers.answer_a_correct === 'true') {
      this.option1.style.border = '2px solid #00cc00';
      this.option1.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
    } else if (newData[0].correct_answers.answer_b_correct === 'true') {
      this.option2.style.border = '2px solid #00cc00';
      this.option2.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
    } else if (newData[0].correct_answers.answer_c_correct === 'true') {
      this.option3.style.border = '2px solid #00cc00';
      this.option3.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
    } else if (newData[0].correct_answers.answer_d_correct === 'true') {
      this.option4.style.border = '2px solid #00cc00';
      this.option4.innerHTML +=
        '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
    }
  }

  checkAns(newData, answerTxt, selectedAns) {
    this.disableClickEvent();
    this.nextBtn.style.display = 'block';
    if (newData[0].correct_answers.answer_a_correct === 'true') {
      if (newData[0].answers.answer_a === answerTxt) {
        selectedAns.style.border = '2px solid #00cc00';
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
        this.points++;
      } else {
        selectedAns.style.border = '2px solid #ff4c4c';
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        this.option1.style.border = '2px solid #00cc00';
        this.option1.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }
    } else if (newData[0].correct_answers.answer_b_correct === 'true') {
      if (newData[0].answers.answer_b === answerTxt) {
        selectedAns.style.border = '2px solid #00cc00';
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
        this.points++;
      } else {
        selectedAns.style.border = '2px solid #ff4c4c';
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        this.option2.style.border = '2px solid #00cc00';
        this.option2.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }
    } else if (newData[0].correct_answers.answer_c_correct === 'true') {
      if (newData[0].answers.answer_c === answerTxt) {
        selectedAns.style.border = '2px solid #00cc00';
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
        this.points++;
      } else {
        selectedAns.style.border = '2px solid #ff4c4c';
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        this.option3.style.border = '2px solid #00cc00';
        this.option3.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }
    } else if (newData[0].correct_answers.answer_d_correct === 'true') {
      if (newData[0].answers.answer_d === answerTxt) {
        selectedAns.style.border = '2px solid #00cc00';
        selectedAns.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
        this.points++;
      } else {
        selectedAns.style.border = '2px solid #ff4c4c';
        selectedAns.innerHTML +=
          '<i class="cross-3 far fa-times-circle" style="margin-left: 5%"></i>';

        this.option4.style.border = '2px solid #00cc00';
        this.option4.innerHTML +=
          '<i class="tick-1 fas fa-check-circle" style="margin-left: 5%"></i>';
      }
    }
  }
}

const ui = new UI();
