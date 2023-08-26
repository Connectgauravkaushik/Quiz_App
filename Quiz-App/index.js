function Quiz(question) {
    this.score = 0; //----> here we are using a function call context 
    this.question = question;
    this.questionIndex = 0;
}
Quiz.prototype.getquestionByIndex = function () {
    return this.question[this.questionIndex];
}
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getquestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.question.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}
let question = [
    new Question("JavaScript Supports:", ["Functions", "XHTML", "HTML", "CSS"], "Functions"),
    new Question("Which language is used for styling web pages:", ["HTML", "CSS", "XHTML", "Java"], "CSS"),
    new Question("Which is not a javascript framework", ["Django", "pythonscript", "jQuery", "NodeJs"], "pythonscript"),
    new Question("javascript is a ", ["language", "programming language", "framework", "ALL"], "programming language")
];

function loadQuestions() {
    if (quiz.isEnded()) {
        showscore();
    } else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getquestionByIndex().text;
        //options
        var choices = quiz.getquestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var choice = document.getElementById("choice" + i);
            choice.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
        showProgress();
    }
}
function showProgress() {
    let currentQuestionNum = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNum + "of " + quiz.question.length;

}
function handleOptionButton(id, choice) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}
function showscore() {
    if (quiz.score == question.length) {
        alert("congratulations you got full marks");
    } else {
        alert("got the score of " + quiz.score + " out of 4");
    }
}

let quiz = new Quiz(question);
loadQuestions();



















