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
        question: "O que é o ciclo de nutrientes?",
        choice1: "Movimento de nutrientes através dos ecossistemas",
        choice2: "Fluxo de energia entre seres vivos",
        choice3: "Troca de gases entre plantas e animais",
        choice4: "Rotação de culturas em agricultura",
        answer: 1,
    },
    {
        question: "Qual dos seguintes é um exemplo de ciclo biogeoquímico?",
        choice1: "Ciclo do carbono",
        choice2: "Ciclo da água",
        choice3: "Ciclo do nitrogênio",
        choice4: "Todos os acima",
        answer: 4,
    },
    {
        question: "Como os seres vivos obtêm energia dos nutrientes?",
        choice1: "Queimando nutrientes para gerar calor",
        choice2: "Por meio da fotossíntese",
        choice3: "Através da respiração celular",
        choice4: "Consumindo outros organismos",
        answer: 3,
    },
    {
        question: "O que define uma cadeia alimentar?",
        choice1: "Fluxo de energia e nutrientes através dos organismos",
        choice2: "Organismos que compartilham o mesmo habitat",
        choice3: "Organismos que se alimentam uns dos outros",
        choice4: "Todos os organismos vivos de um ecossistema",
        answer: 1,
    },
    {
        question: "O que é um ecossistema?",
        choice1: "Área habitada por diferentes espécies de plantas",
        choice2: "Comunidade de organismos e o ambiente em que vivem",
        choice3: "Unidade de armazenamento de energia",
        choice4: "Área específica com alta biodiversidade",
        answer: 2,
    },
    {
        question: "Qual é o papel dos decompositores nos ciclos biogeoquímicos?",
        choice1: "Decompor nutrientes no solo",
        choice2: "Transformar gás carbônico em oxigênio",
        choice3: "Absorver nutrientes das plantas",
        choice4: "Liberar energia para os produtores",
        answer: 1,
    },
    {
        question: "O que é um fluxo de energia nos ecossistemas?",
        choice1: "Distribuição de energia entre produtores e consumidores",
        choice2: "Movimento de matéria através dos organismos",
        choice3: "A troca de oxigênio e gás carbônico",
        choice4: "O ciclo das estações do ano",
        answer: 1,
    },
    {
        question: "Qual é o maior reservatório de carbono na Terra?",
        choice1: "Atmosfera",
        choice2: "Oceanos",
        choice3: "Solo",
        choice4: "Florestas",
        answer: 2,
    },
    {
        question: "Qual é o papel das plantas no ciclo do carbono?",
        choice1: "Liberam oxigênio durante a fotossíntese",
        choice2: "Absorvem gás carbônico da atmosfera",
        choice3: "Armazenam carbono no solo",
        choice4: "Liberam água durante a transpiração",
        answer: 1,
    },
    {
        question: "Qual ciclo biogeoquímico está mais diretamente relacionado com a vida dos organismos?",
        choice1: "Ciclo do carbono",
        choice2: "Ciclo do nitrogênio",
        choice3: "Ciclo da água",
        choice4: "Ciclo do fósforo",
        answer: 2,
    },
    {
        question: "O que é um ecossistema equilibrado?",
        choice1: "Onde há um fluxo constante de energia",
        choice2: "Quando todos os organismos estão em equilíbrio",
        choice3: "Onde as espécies coexistem de forma harmoniosa",
        choice4: "Todos os acima",
        answer: 4,
    },
    {
        question: "O que significa produtividade primária?",
        choice1: "Taxa de crescimento populacional",
        choice2: "Produção de biomassa por produtores",
        choice3: "Capacidade de um ecossistema de suportar vida",
        choice4: "Taxa de decomposição de nutrientes",
        answer: 2,
    },
    {
        question: "Como os nutrientes são transferidos através dos ecossistemas?",
        choice1: "De um organismo para outro",
        choice2: "Do solo para as plantas",
        choice3: "Através da fotossíntese",
        choice4: "Todos os acima",
        answer: 4,
    },
    {
        question: "Qual é o principal componente do ciclo do nitrogênio?",
        choice1: "Nitrogênio molecular (N2)",
        choice2: "Amônia (NH3)",
        choice3: "Nitratos (NO3-)",
        choice4: "Nitrogênio orgânico",
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`
    
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

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
