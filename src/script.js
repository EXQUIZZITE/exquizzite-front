// https://opentdb.com/api.php?amount=15&type=boolean
let startBtn = document.getElementById('start')
let bodyCard = document.getElementById('card-container')
let wrapper = document.getElementById('wrapper')

let questions = [] // Array of questions
let count = 0 // iteration counter
let questionsCategory = [] // Array of categories

function addCard(elem, categories, difficulty, numQuestions, type) {
  let body = document.createElement('div')
  body.setAttribute('class', 'setting')
  body.innerHTML = `
<p id="category" class="card-text" > Categories: ${categories} </p>
<p id="difficulty" class="card-text">Difficulty: ${difficulty}</p>
<p id="questions-num" class="card-text">Number of questions : ${numQuestions} </p>
<p id="type" class="card-text">Type of questions: ${type} </p>
`
  elem.appendChild(body)
}

function addQuestionTrueFalse(count, length, question) {
  let bodyQuestion = document.createElement('div')
  bodyQuestion.setAttribute('class', 'card d-flex flex-column justify-content-center')
  bodyQuestion.innerHTML = `
            <div id="wrapper" class="card d-flex flex-column justify-content-center">
                <h5 class="col">Question ${count + 1} of ${length}</h5>
                <h1>${question}</h1>
                <button id="answer-true" value='True' type="button" class="btn btn-primary">True</button>
                <button id="answer-false" value='False' type="button" class="btn btn-primary">False</button>
            </div> 
        `
  wrapper.appendChild(bodyQuestion)

  let buttons = document.querySelectorAll(`#answer-true, #answer-false`)
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log(e.target.value)
    })
  })
}

axios
  .get('https://opentdb.com/api.php?amount=15&difficulty=easy&type=boolean')
  .then(function (response) {
    let result = response.data.results

    /**
     * It takes an array of objects, and returns an array of unique values from the category
     * property of each object.
     */
    result.forEach((elem) => {
      questionsCategory.push(elem.category)
    })

    const filteredCategories = [... new Set(questionsCategory)]

    addCard(bodyCard, filteredCategories, result[0].difficulty, result.length, result[0].type)

    startBtn.addEventListener('click', (e) => {
      wrapper.innerHTML = ''
      addQuestionTrueFalse(count, result.length, result[count].question)
      count++
    })

  }).catch(function (err) {
    console.error(err);
  })








