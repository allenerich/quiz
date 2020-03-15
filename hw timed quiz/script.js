const startbutton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")

let shuffleQuestions, currentQuestionIndex


// console.log("hello world")startGame

startbutton.addEventListener("click", startGame)




nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})





function startGame() {
    console.log("started")
    startbutton.classList.add("hide")
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
    startTimer()
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// window.onload = function () {
    startbutton.onclick = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {

        nextButton.classList.remove("hide")
    } else {
        startbutton.innertext = "Restart"
        startbutton.classList.remove("hide")
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        question: "What is the first Question?",
        answers: [
            { text: "this one", correct: true },
            { text: "wrong answer", correct: false },
            { text: "wrong answer", correct: false },
            { text: "wrong answer", correct: false },
        ]
    },
    {
        question: "What is the second Question?",
        answers: [
            { text: "wrong answer", correct: false },
            { text: "Good Answer here", correct: true },
            { text: "wrong answer", correct: false },
            { text: "wrong answer", correct: false },
        ]
    },
    {
        question: "This is the third question?",
        answers: [
            { text: "This is the best answer", correct: true },
            { text: "wrong answer", correct: false },
            { text: "wrong answer", correct: false },
            { text: "wrong answer", correct: false },
        ]
    },
    {
        question: "This is the fourth question?",
        answers: [
            { text: "wrong answer", correct: false },
            { text: "wrong answer", correct: false },
            { text: "wrong answer", correct: false },
            { text: "correct Answer", correct: true },
        ]
    },
    {
        question: "This is the fifth question?",
        answers: [
            { text: "correct answer", correct: true },
            { text: "wrong answer", correct: false },
            { text: "Wrong answer", correct: false },
            { text: "wrong answer", correct: false },
        ]
    },
]

