const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Adresser - Je",
        choice1: "J'adresse",
        choice2: "J'ai adressé",
        choice3: "J'adressais",
        choice4: "J'adressai",
        choice5: "J'adresserai",
        answer: 1,
    },
    {
        question: "Fermer - Ils",
        choice1: "Ils fermaient",
        choice2: "Ils fermeront",
        choice3: "ils fermèrent",
        choice4: "Ils ferment",
        choice5: "Ils ont fermé",
        answer: 4,
    },
    {
        question: "Payer - Nous",
        choice1: "Nous avons payé",
        choice2: "Nous payâmes",
        choice3: "Nous payons",
        choice4: "Nous paierons",
        choice5: "Nous payions",
        answer: 3,
    },
    {
        question: "Interpeller - Vous",
        choice1: "Vous interpelliez",
        choice2: "Vous interpellerez",
        choice3: "Vous interpellâtes",
        choice4: "Vous avez interpellé",
        choice5: "Vous interpellez",
        answer: 5,
    },
    {
        question: "Modeler - Tu",
        choice1: "Tu modèles",
        choice2: "Tu modelas",
        choice3: "Tu modelais",
        choice4: "Tu as modelé",
        choice5: "Tu modèleras",
        answer: 1,
    },
    {
        question: "Aider - Il",
        choice1: "Il a aidé",
        choice2: "Il aide",
        choice3: "Il aidera",
        choice4: "Il aida",
        choice5: "Il aidait",
        answer: 2,
    },
    {
        question: "Bouger - Nous",
        choice1: "Nous bougeâmes",
        choice2: "Nous bougerons",
        choice3: "Nous bougeons",
        choice4: "Nous avons bougé",
        choice5: "Nous bougions",
        answer: 3,
    },
    {
        question: "Noyer - Vous",
        choice1: "Vous noyâtes",
        choice2: "Vous noyez",
        choice3: "Vous noierez",
        choice4: "Vous avez noyé",
        choice5: "Vous noyiez",
        answer: 2,
    },
    {
        question: "Oublier - Je",
        choice1: "J'ai oublié",
        choice2: "J'oubliais",
        choice3: "J'oublie",
        choice4: "J'oubliai",
        choice5: "J'oublierai",
        answer: 3,
    },
    {
        question: "Inquiéter - Ils",
        choice1: "Ils inquiétaient",
        choice2: "Ils ont inquiété",
        choice3: "Ils inquiétèrent",
        choice4: "Ils inquiètent",
        choice5: "Ils inquiéteront",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://lethycyakhathrynn.github.io/verbesdupremiergroupe/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} - ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 100)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()