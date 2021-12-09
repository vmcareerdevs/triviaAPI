//the following selects a random category and supplies xhr.open with the API URL to that category
const categoryURL = {
    'Food and Drink': 'https://api.trivia.willfry.co.uk/questions?categories=food_and_drink&limit=20',
    'Geography': 'https://api.trivia.willfry.co.uk/questions?categories=geography&limit=20',
    'General Knowledge': 'https://api.trivia.willfry.co.uk/questions?categories=general_knowledge&limit=20',
    'History': 'https://api.trivia.willfry.co.uk/questions?categories=history&limit=20',
    'Art and Literature': 'https://api.trivia.willfry.co.uk/questions?categories=literature&limit=20',
    'Movies': 'https://api.trivia.willfry.co.uk/questions?categories=movies&limit=20',
    'Music': 'https://api.trivia.willfry.co.uk/questions?categories=music&limit=20',
    'Science': 'https://api.trivia.willfry.co.uk/questions?categories=science&limit=20',
    'Society and Culture': 'https://api.trivia.willfry.co.uk/questions?categories=society_and_culture&limit=20',
    'Sport and Leisure': 'https://api.trivia.willfry.co.uk/questions?categories=sport_and_leisure&limit=20'
}
const keys = Object.keys(categoryURL)
let prop = keys[Math.floor(Math.random() * keys.length)]

//use prop for category
//use categoryURL[prop] for URL

const xhr = new XMLHttpRequest()
xhr.open("GET", categoryURL[prop])
xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let data = (JSON.parse(xhr.responseText))
        //append emojis to categories
        switch (prop) {
            case 'Food and Drink':
                prop = '🥘  ' + prop + '  🍷'
                break
            case 'Geography':
                prop = '🌎  ' + prop + '  🗺️'
                break
            case 'General Knowledge':
                prop = '🦉  ' + prop + '  🦉'
                break
            case 'History':
                prop = '📜  ' + prop + '  🏺'
                break
            case 'Art and Literature':
                prop = '🎭  ' + prop + '  🎭'
                break
            case 'Movies':
                prop = '🎥  ' + prop + '  📺'
                break
            case 'Music':
                prop = '🎶  ' + prop + '  🎼'
                break
            case 'Science':
                prop = '🧬  ' + prop + '  🧲'
                break
            case 'Society and Culture':
                prop = '🏛️  ' + prop + '  📚'
                break
            case 'Sport and Leisure':
                prop = '🤸‍♀️  ' + prop + '  🏆'
                break
        }
        document.getElementById('dailyTheme').innerText = `How Much Do You Know About\n ${prop}`
        //populate array questions with 5 randomly selected questions from category
        let questions = []
        let questionNum = 0
        for (let i = 0; i < 5; i++) {
            let randomElement = data[Math.floor(Math.random() * data.length)]
            questions.push(randomElement)
        }
        console.log(questions) //del
        storeQuestions.push(questions)
        let currentQuestion = questions[0].question
        document.getElementById('question').innerHTML = currentQuestion
        let choices = questions[0].incorrectAnswers
        choices.push(questions[0].correctAnswer) //push all answers into the incorrect array
        storeChoices.push(choices)
        choices.sort(() => .5 - Math.random())
        choices.sort(() => .5 - Math.random()) //randomize answer order - twice because once seems biased
        console.log(choices) //del

        //populate multiple choice options with choices array by creating radio buttons and labels
        let frag = document.createDocumentFragment()
        for (let i = 0; i < choices.length; i++) {
            let choiceLabel = document.createElement('label')
            let choiceSelection = document.createElement('input')
            let linebreak = document.createElement("br")
            choiceSelection.setAttribute('type', 'radio')
            choiceSelection.setAttribute('name', 'choice')
            choiceSelection.setAttribute('id', choices[i])
            choiceLabel.setAttribute('for', choices[i])
            choiceLabel.innerText = choices[i]

            frag.appendChild(choiceSelection)
            frag.appendChild(choiceLabel)
            frag.appendChild(linebreak)
        }
        let submitSelection = document.createElement('input')
        submitSelection.setAttribute('type', 'button')
        submitSelection.setAttribute('value', 'submit')
        submitSelection.setAttribute('onclick', 'checkAnswer()')

        document.getElementById('answersBox').appendChild(frag)
        document.getElementById('answersBox').appendChild(submitSelection)
    }
}
xhr.send()

//onclick button will compare selected answer with correct and incorrect options (all stored outside the onload function) and alert 'correct' or 'incorrect' (for now)

let storeChoices = []
let storeQuestions = []

function checkAnswer() {
    if (Boolean(document.querySelector('input[name="choice"]:checked'))) {
        if (document.querySelector('input[name="choice"]:checked').id === storeQuestions[0][0].correctAnswer) {
            alert('CORRECT') 
            xhr.open("GET", categoryURL[prop])
        }
        else if (document.querySelector('input[name="choice"]:checked').id != storeQuestions[0][0].correctAnswer) { alert('INCORRECT') }
    } else { 
        alert('Please Select An Answer') 
    }
}