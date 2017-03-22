// =====================================================================
// EVENT LISTENERS
// =====================================================================

// CLICKING THE START BUTTON KICKS OFF THE PROCESS

$('#start').on('click', function() {

    $('#start').remove();
    game.loadQuestion();

});

// THIS IS THE BUTTON THE USER CLICKS TO SELECT AN ANSWER. THE VALUE OF THE BUTTON IS PASSED THROUGH (e).
// CLICKING THIS BUTTON INITIATES THE CHECK TO SEE IF THE USER ANSWER WAS CORRECT OR NOT

$(document).on('click', '.answer-button', function(e) {

   game.clicked(e);

});

// CLICKING THE RESTART BUTTON WILL RESET THE GAME FROM SCRATCH

$(document).on('click', '#reset', function() {

    game.reset();

});

// =====================================================================
// ARRAY HOLDING ALL THE QUESTIONS
// =====================================================================

var questionsList = [{
    question: 'Which island nation is popstar Rihanna from?',
    answers: ['Aruba', 'Barbados', 'Bahamas', 'Jamaica'],
    correctAnswer: 'Barbados'
}, {
    question: 'What is Natalie Portman\'s actual last name?',
    answers: ['Hershlag', 'Douglas', 'Horowitz', 'Portman'],
    correctAnswer: 'Hershlag'
}, {
    question: 'In what year did Angelina Jolie and Brad Pitt get together?',
    answers: ['2004', '2005', '2006', '2007'],
    correctAnswer: '2005'
}, {
    question: 'Who was the first person to have a No. 1 album and a No. 1 film in the same week?',
    answers: ['Beyoncé', 'Will Smith', 'Jennifer Lopez', 'Justin Timberlake'],
    correctAnswer: 'Jennifer Lopez'
}, {
    question: 'Which NBA star did actor Gabrielle Union marry?',
    answers: ['Dwyane Wade', 'LeBron James', 'Kobe Bryant', 'Chris Bosh'],
    correctAnswer: 'Dwyane Wade'
}, {
    question: 'Who\'s the youngest Kardashian?',
    answers: ['Kendall', 'Khloe', 'Kylie', 'Rob'],
    correctAnswer: 'Rob'
}, {
    question: 'Katy Perry is a California girl. But do you know WHICH city she\'s from?',
    answers: ['Santa Barbara', 'Santa Cruz', 'San Francisco', 'Los Angeles'],
    correctAnswer: 'Santa Barbara'
}, {
    question: 'Meryl Streep, Shaquille O\'Neal, and Whitney Houston are all from which state?',
    answers: ['Indiana', 'New York', 'California', 'New Jersey'],
    correctAnswer: 'New Jersey'
}, {
    question: 'Do you know which child star Mila Kunis dated for eight years?',
    answers: ['Ben Savage', 'Jonathan Lipnicki', 'Macaulay Culkin', 'Jonathan Lipnicki'],
    correctAnswer: 'Macaulay Culkin'
}, {
    question: 'Which one of these beautiful ladies Leonardo Dicaprio HASN\'T dated?',
    answers: ['Miranda Kerr', 'Blake Lively', 'Gisele Bündchen', 'Bar Refaeli'],
    correctAnswer: 'Gisele Bundchen'
}];

// =====================================================================
// OBJECT HOLDING THE MECHANICS OF THE GAME
// =====================================================================

var game = {

    // ==================================
    // VALUES TO START WITH
    // ==================================

    // list of game questionsList
    questions:questionsList,

    // will be used for keeping track of which question is being asked
    currentQuestion:0,

    // will be used for keeping track of the time (user has 30 seconds)
    clock:30,

    // will keep track of the totalCorrectAnswers answers
    totalCorrectAnswers:0,

    // will keep track of the totalIncorrectAnswers answers
    totalIncorrectAnswers:0,

    // will keep track of the totalUnansweredQuestions questionsList
    totalUnansweredQuestions: 0,

    // ==================================
    // FUNCTIONS
    // ==================================

    // START THE TIMER, LOAD THE QUESTION, GENERATE ANSWER BUTTONS

    loadQuestion: function() {

        // set the clock
        game.clock = 30;

        // start decreasing time
        timer = setInterval(game.countdown,1000);

        // inject the time into the html
        $('#subwrapper').html('<h2 class="timer">Time Remaining: <span id="clock">30</span><span> sec</span></h2>');

        // inject a question into the html
        $('#subwrapper').append('<h3 class="question-text">' + questionsList[game.currentQuestion].question + '</h3>');

        // loop through the possible answers for the present question and make a button for each one
        // assign the button an id and data attribute so it can be distinguished
        for(var i = 0; i < questionsList[game.currentQuestion].answers.length; i ++) {

            $('#subwrapper').append('<a class="btn btn-lg btn-success answer-button" role="button" id="button-' +
                i + '" data-name="' + questionsList[game.currentQuestion].answers[i] + '">' +
                questionsList[game.currentQuestion].answers[i] + '</a>')
        }

        // Give the timer a blinking effect to create urgency (non - critical)
        (function blink() {

            $('.timer').fadeOut(500).fadeIn(500, blink);

        })();

    },

    // HANDLE THE GAME'S TIMER

    countdown: function() {

        game.clock --;

        $('#clock').html(game.clock);

        if(game.clock <= 0) {

            // console.log('TIME UP!');
            game.timeUp();

        }
    },

    // AFTER USER SELECTS AN ANSWER, CHECK TO SEE IF THE ANSWER IS CORRECT OR NOT, (e) REPRESENTS WHAT THE ANSWER THE USER SELECTED

    clicked: function(e) {

        // clearInterval(timer);

        if($(e.target).data('name') == questionsList[game.currentQuestion].correctAnswer) {

            game.answeredCorrectly();

        } else {

            game.answeredIncorrectly();

        }

    },

    // IF THE ANSWER WAS CORRECT - INCREASE THEIR CORRECT TOTAL AND LET THEM KNOW THEY WERE CORRECT VIA A MESSAGE
    // THEN CHECK TO SEE IF THERE ARE ANY MORE QUESTIONS, PAUSE FOR 1.5 SECS, IF NONE THEN SHOW THE USER THE RESULTS OTHERWISE LOAD THE NEXT QUESTION

    answeredCorrectly: function() {

        // console.log('YOU GOT IT!');

        game.totalCorrectAnswers ++;

        $('#subwrapper').html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span><h2>YOU GOT IT CORRECT!</h2>');

        if(game.currentQuestion == questionsList.length -1) {

            setTimeout(game.results, 1 * 1500);

        } else {

            setTimeout(game.nextQuestion, 1 * 1500)

        }

    },

    // IF THE ANSWER WAS INCORRECT - INCREASE THEIR INCORRECT TOTAL AND LET THEM KNOW THEY WERE INCORRECT AND WHAT THE CORRECT ANSWER WAS VIA A MESSAGE
    // THEN CHECK TO SEE IF THERE ARE ANY MORE QUESTIONS, PAUSE FOR 1.5 SECS, IF NONE THEN SHOW THE USER THE RESULTS OTHERWISE LOAD THE NEXT QUESTION

    answeredIncorrectly: function() {

        // console.log('WRONG!');

        game.totalIncorrectAnswers ++;

        $('#subwrapper').html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span><h2>OOPS INCORRECT</h2>');
        $('#subwrapper').append('<h3>Correct answer was: ' + questionsList[game.currentQuestion].correctAnswer + '</h3>');

        if(game.currentQuestion == questionsList.length -1) {

            setTimeout(game.results, 1 * 1500);

        } else {

            setTimeout(game.nextQuestion, 1 * 1500)

        }

    },

    // IF THE USER RUNS OUT OF TIME (DID NOT ANSWER QUESTION) - INCREASE THEIR UNANSWERED TOTAL AND LET THEM KNOW THEY ARE OUT OF TIME AND WHAT THE CORRECT ANSWER WAS
    // THEN CHECK TO SEE IF THERE ARE ANY MORE QUESTIONS, PAUSE FOR 1.5 SECS, IF NONE THEN SHOW THE USER THE RESULTS OTHERWISE LOAD THE NEXT QUESTION

    timeUp: function() {
        clearInterval(timer);
        game.totalUnansweredQuestions ++;
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>Correct answer was: ' + questionsList[game.currentQuestion].correctAnswer + '</h3>');
        if(game.currentQuestion == questionsList.length -1) {

            setTimeout(game.results, 1 * 1500);

        } else {

            setTimeout(game.nextQuestion, 1 * 1500);

        }
    },

    // LOAD THE NEXT QUESTION, MAKE SURE AND MOVE UP ONE SO THE SAME QUESTION ISN'T ASKED A SECOND TIME

    nextQuestion: function() {

        clearInterval(timer);
        game.currentQuestion++;
        game.loadQuestion();

    },

    // AFTER ALL THE QUESTIONS HAVE BEEN ASKED DISPLAY THE RESULTS TO THE USER
    // THE USER IS ALSO PRESENTED WITH A BUTTON THEY CAN CLICK TO RESTART THE GAME OF THEY CHOOSE

    results: function() {

        clearInterval(timer);
        $('#subwrapper').html('<h2>GAME OVER!</h2>');
        $('#subwrapper').append('<h3>Correct: ' + game.totalCorrectAnswers + '</h3>');
        $('#subwrapper').append('<h3>Incorrect: ' + game.totalIncorrectAnswers + '</h3>');
        $('#subwrapper').append('<h3>Unanswered: ' + game.totalUnansweredQuestions + '</h3>');
        $('#subwrapper').append('<a class="btn btn-lg btn-success reset-button" role="button" id="reset">Restart Game</a>');

    },

    // RESET THE GAME FROM SCRATCH AND START LOADING THE QUESTIONS ALL OVER AGAIN

    reset: function() {

        game.currentQuestion = 0;
        game.clock = 0;
        game.totalCorrectAnswers = 0;
        game.totalIncorrectAnswers = 0;
        game.totalUnansweredQuestions = 0;
        game.loadQuestion();

    }

};


