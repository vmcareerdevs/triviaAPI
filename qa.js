let  = {
    questions: ['one','two','three']
}

// document.getElementById('questions').innerText = 'Hello'
let questionNum = 0

document.getElementById('questions').innerText = .questions[questionNum]

function nextQuestion() {
    questionNum++
    document.getElementById('questions').innerText = .questions[questionNum]
}
