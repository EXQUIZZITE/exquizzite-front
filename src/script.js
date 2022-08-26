// https://opentdb.com/api.php?amount=15&type=boolean
let startBtn = document.getElementById('start');
let bodyCard = document.getElementById('card-container');
let wrapper = document.getElementById('wrapper');
let container = document.getElementsByClassName('container');
let time = 30;
// timertesting
//let finished = false
let questions = []; // Array of questions
let count = 0; // iteration counterlet questionsCategory = [] // Array of categorie
let countCorrect = 0; // iterion correct answers
const theEnd = document.querySelector('#theEnd');

function createChrono() {
  let timeShow = document.getElementById('timer');
  chrono = setInterval(() => {
    timeShow.innerText = `${time}`;
    time--;
  }, 1000);
}

function resetChrono() {
  clearInterval(chrono);
  time = 30;
}

function addCard(elem, categories, difficulty, numQuestions, type) {
  let body = document.createElement('div');
  body.setAttribute('class', 'setting');
  body.innerHTML = `
<p id="category" class="card-text" > Categories: ${categories} </p>
<p id="difficulty" class="card-text">Difficulty: ${difficulty}</p>
<p id="questions-num" class="card-text">Number of questions : ${numQuestions} </p>
<p id="type" class="card-text">Type of questions: ${type} </p>
`;
  elem.appendChild(body);
}

const successQuestion = function (count, result) {
  Swal.fire({
    icon: 'success',
    title: 'Good job!👌',
    confirmButtonText: 'Next Question!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  }).then(() => {
    container[0].style.filter = 'blur(0px)';
    if (count === result.length - 1) {
      gameFinish();
    } else {
      resetChrono();
      countCorrect++;
      count++;
      if (result[count].type === 'boolean') {
        addQuestionTrueFalse(count, result);
        count++;
      } else {
        addQuestionMultiple(count, result);
        count++;
      }
    }
  });
};
const failureQuestion = function (count, result) {
  Swal.fire({
    icon: 'error',
    title: 'Wrong answer!😱',
    confirmButtonText: 'Next Question!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  }).then(() => {
    container[0].style.filter = 'blur(0px)';
    if (count === result.length - 1) {
      gameFinish();
    } else {
      count++;
      if (result[count].type === 'boolean') {
        addQuestionTrueFalse(count, result);
        count++;
      } else {
        addQuestionMultiple(count, result);
        count++;
      }
    }
  });
};

function gameFinish() {
  if (countCorrect > 7) {
    Swal.fire({
      icon: 'success',
      title: 'You Win!👌',
      showCancelButton: true,
      cancelButtonText: 'Learn more',
      confirmButtonText: 'Rematch!?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        count = 0;
        countCorrect = 0;
        startGame();
      } else {
        window.location.href = 'https://es.wikihow.com/jugar-Trivial-Pursuit';
      }
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'You lost!👌',
      showCancelButton: true,
      confirmButtonText: 'Start new game!',
      cancelButtonText: 'Learn more',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        count = 0;
        countCorrect = 0;
        startGame();
      } else {
        window.location.href = 'https://es.wikihow.com/jugar-Trivial-Pursuit';
      }
    });
  }
}

function addQuestionMultiple(count, result) {
  let getRandom = Math.floor(Math.random() * 4);
  let numQuestion = 0;
  let answers = ['', '', '', ''];
  answers[getRandom] = result[count].correct_answer;
  for (let i = 0; i < 4; i++) {
    if (answers[i] === '') {
      answers[i] = result[count].incorrect_answers[numQuestion];
      numQuestion++;
    }
  }
  //finished = true
  wrapper.innerHTML = '';
  let bodyQuestion = document.createElement('div');
  bodyQuestion.setAttribute(
    'class',
    'card d-flex flex-column justify-content-center'
  );
  bodyQuestion.innerHTML = `
  <div id="wrapper" class="card d-flex flex-column justify-content-center">
  <h5 class="col">Question ${count + 1} of ${result.length}</h5>
  <p id="timer">${time}</p>
  <p>Correct answers : ${countCorrect}</p>
  <h1>${result[count].question}</h1>
  <button value='True' type="button" class="btn btn-primary answer">${
    answers[0]
  }</button>
  <button value='True' type="button" class="btn btn-primary answer">${
    answers[1]
  }</button>
  <button value='True' type="button" class="btn btn-primary answer">${
    answers[2]
  }</button>
  <button value='True' type="button" class="btn btn-primary answer">${
    answers[3]
  }</button>
  </div> 
  `;

  wrapper.appendChild(bodyQuestion);
  createChrono();
  //chronometer()
  let buttons = document.querySelectorAll(`.answer`);
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      resetChrono();
      container[0].style.filter = 'blur(4px)';
      if (e.target.innerText === result[count].correct_answer) {
        successQuestion(count, result);
      } else {
        failureQuestion(count, result);
      }
    });
  });
}

function addQuestionTrueFalse(count, result) {
  //finished = true
  wrapper.innerHTML = '';

  let bodyQuestion = document.createElement('div');
  bodyQuestion.setAttribute(
    'class',
    'card d-flex flex-column justify-content-center'
  );
  bodyQuestion.innerHTML = `
  <div id="wrapper" class="card d-flex flex-column justify-content-center">
  <h5 class="col">Question ${count + 1} of ${result.length}</h5>
  <p id="timer">${time}</p>
  <p>Correct answers : ${countCorrect}</p>
  <h1>${result[count].question}</h1>
  <button id="answer-true" value='True' type="button" class="btn btn-primary">True</button>
  <button id="answer-false" value='False' type="button" class="btn btn-primary">False</button>
  </div> 
  `;
  wrapper.appendChild(bodyQuestion);
  createChrono();

  let buttons = document.querySelectorAll(`#answer-true, #answer-false`);
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      resetChrono();
      container[0].style.filter = 'blur(4px)';
      // this is correct answering
      if (e.target.value === result[count].correct_answer) {
        successQuestion(count, result);
      } else {
        failureQuestion(count, result);
      }
    });
  });
}

function startGame() {
  theEnd.play();
  axios
    .get('https://opentdb.com/api.php?amount=15&difficulty=easy')
    .then(function (response) {
      let result = response.data.results;
      let questionType = [];
      let questionsCategory = []; // Array of categorie

      // It takes an array of objects, and returns an array of unique values from the category property of each object.

      result.forEach((elem) => {
        questionsCategory.push(elem.category);
        questionType.push(elem.type);
      });

      const filteredCategories = [...new Set(questionsCategory)];
      const filteredType = [...new Set(questionType)];

      addCard(
        bodyCard,
        filteredCategories,
        result[0].difficulty,
        result.length,
        filteredType
      );

      wrapper.innerHTML = '';
      theEnd.play();
      if (result[0].type === 'boolean') {
        addQuestionTrueFalse(count, result);
        count++;
      } else {
        addQuestionMultiple(count, result);
        count++;
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

axios
  .get('https://opentdb.com/api.php?amount=15&difficulty=easy')
  .then(function (response) {
    let result = response.data.results;
    let questionType = [];
    let questionsCategory = []; // Array of categorie

    // It takes an array of objects, and returns an array of unique values from the category property of each object.

    result.forEach((elem) => {
      questionsCategory.push(elem.category);
      questionType.push(elem.type);
    });

    const filteredCategories = [...new Set(questionsCategory)];
    const filteredType = [...new Set(questionType)];

    addCard(
      bodyCard,
      filteredCategories,
      result[0].difficulty,
      result.length,
      filteredType
    );

    startBtn.addEventListener('click', (e) => {
      wrapper.innerHTML = '';
      theEnd.play();
      if (result[0].type === 'boolean') {
        addQuestionTrueFalse(count, result);
        count++;
      } else {
        addQuestionMultiple(count, result);
        count++;
      }
    });
  })
  .catch(function (err) {
    console.error(err);
  });
