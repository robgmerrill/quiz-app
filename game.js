const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressCounterText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let questions = [{
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
},
{
    question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
},
{
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
}];

console.log(typeof questions);
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    // spread out each items into new array
    // spread operator will make a full copy
    availableQuestions = [...questions];
    console.log(questions === availableQuestions);
    console.log(typeof availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // go to end page
        return window.location.assign('/end.html');
    }

    // increment by one
    questionCounter++;
    progressCounterText.innerText = `Question: ${questionCounter} /${MAX_QUESTIONS}`;

    // update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // get a random number based on the length of availableQuestions array 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // currentQuestion set to the index of our random number of the availableQuestions array
    currentQuestion = availableQuestions[questionIndex];
    // set the innerText property of questionto currentQuestion index and question property value
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;
        console.log(selectedAnswer == currentQuestion.answer);

        // const classToApply = "incorrect";
        // if (selectedAnswer == currentQuestion.answer) {
        //     classToApply = "correct";
        // }

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        console.log(classToApply);

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)

    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();