function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling webpages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
   	new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for connecting to Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
	new Question("JavaScript is a", ["Language", "Programming Language", "Development", "All"],"Programming Language")
];

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
    if (this.questions[this.questionIndex].isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {   
    return this.questions.length === this.questionIndex
}

function showScore() {
     var gameOverHTML = "<h1>Result</h1>";
     gameOverHTML += "<h2 id ='score'> Your scores:" +quiz.score + ". Your percentage is:" + (quiz.score/quiz.questions.length*100) + "% </h2>";
     var e = document.getElementById("quiz");
     e.innerHTML = gameOverHTML;

}

function loadQuestion() {

    if (quiz.isEnded()) {
        showScore();
        return;
    }

    var currentQuestion = quiz.questions[quiz.questionIndex];
    document.querySelector('#question').textContent = currentQuestion.text;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        document.getElementById('choice' + i).textContent = currentQuestion.choices[i];
        handleOptionButtonClick('btn' + i, currentQuestion.choices[i]);
    }
    showProgress();
}

function handleOptionButtonClick(btnId, choice) {
    var button = document.querySelector('#' + btnId);
    button.onclick = function() {
        quiz.checkOptionWithAnswer(choice);
        loadQuestion();
    };
}

function showProgress() {
    document.querySelector('#progress').textContent = 'Question ' + (quiz.questionIndex + 1) + ' of ' + quiz.questions.length;
}

var quiz = new Quiz(questions);
loadQuestion();