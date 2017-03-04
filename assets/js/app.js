// Start Button

$('#start').on('click', function() {
    // Remove start button when game starts
    $('#start').remove();
    // load question after game starts
    game.loadQuestion();
});

// Check to see if answer user selected is correct or incorrect
// Don't check answer button because it will dynamically loaded so wont exist initially on page, instead check the document
// Pass the value of the button clicked through 'e'
$(document).on('click', '.answer-button', function(e) {
   game.clicked(e);
});

// rest game
$(document).on('click', '#reset', function() {
    game.reset();
});

// Game questions

var questions = [{
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
    question: 'Which one of these beautiful ladies he HASN\'T dated?',
    answers: ['Miranda Kerr', 'Blake Lively', 'Gisele Bündchen', 'Bar Refaeli'],
    correctAnswer: 'Gisele Bündchen'
}];


// Set up Game object

var game = {
    // list of game questions
    questions:questions,
    // to keep track of which question is on so I know the correct question is posted to the page
    currentQuestion:0,
    // game timer
    counter:30,
    // to keep track of how many correct answers
    correct:0,
    // to keep track of how many incorrect answers
    incorrect:0,
    // to keep track of unanswered questions
    unanswered: 0,
    // incharge of changing the timer
    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter <= 0) {
            console.log('TIME UP!');
            game.timeUp();
        }
    },


    // set the timer to start decreasing as the question loads
    // post current question to the page


    loadQuestion: function () {

        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html('<h2 class="timer">Time Remaining: <span id="counter">30</span><span> sec</span></h2>');
        $('#subwrapper').append('<h3 class="display-question">' + questions[game.currentQuestion].question + '</h3>');
        for(var i = 0; i < questions[game.currentQuestion].answers.length; i ++) {
            $('#subwrapper').append('<button class="btn btn-lg btn-default answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>')
        }
        (function blink() {
            $('.timer').fadeOut(515).fadeIn(515, blink);
        })();
    },


    // set counter back to origin to there is a fresh 30 seconds to answer the new question
    //update html with new time
    // load next question (make sure not to load same question)


    nextQuestion: function () {

        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },


    // stop timer so it doesn't start going into negative
    // increase the amt of unanswered questions
    // alert user that they have run out of time
    // let user know what the correct answer was
    // if final question go to the results screen if not go to the end


    timeUp: function () {
        clearInterval(timer);
        game.unanswered ++;
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>Correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if(game.currentQuestion == questions.length -1) {
            setTimeout(game.results, 1 * 1000);
        } else {
            setTimeout(game.nextQuestion, 1 * 1000);
        }
    },


    // load after results after last question
    // clear timer
    // advise user they are done and what their score was
    // append button so user can restart game if they choose


    results: function () {
        clearInterval(timer);
        $('#subwrapper').html('<h2>GAME OVER!</h2>');
        $('#subwrapper').append('<h3>Correct: ' + game.correct + '</h3>');
        $('#subwrapper').append('<h3>Incorrect: ' + game.incorrect + '</h3>');
        $('#subwrapper').append('<h3>Unanswered: ' + game.unanswered + '</h3>');
        $('#subwrapper').append('<button class="btn btn-lg btn-default reset-button" id="reset">Restart Game</button>');
    },


    // clear interval / stop timer after button clicked
    // pass in what is being clicked, compare it to the correct answer and do something
    clicked: function(e) {

        clearInterval(timer);
        if($(e.target).data('name') == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },


    // test to make sure data was passed and comparison ok
    // clear timer
    // increase number of correct answers
    // advise user they got it correct (pause for a sec)
    // add something that either takes user to the results screen if game over or move to the next question


    answeredCorrectly: function () {
        console.log('YOU GOT IT!');
        clearInterval(timer);
        game.correct ++;
        $('#subwrapper').html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span><h2>YOU GOT IT CORRECT!</h2>');
        if(game.currentQuestion == questions.length -1) {
            setTimeout(game.results, 1 * 1000);
        } else {
            setTimeout(game.nextQuestion, 1 * 1000)
        }
    },


    // can use the same logic as answered correctly just edit variable name and statement
    // let user know what the correct answer was (pause for a sec)


    answeredIncorrectly: function () {
        console.log('WRONG!');
        clearInterval(timer);
        game.incorrect ++;
        $('#subwrapper').html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span><h2>OOPS INCORRECT</h2>');
        $('#subwrapper').append('<h3>Correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if(game.currentQuestion == questions.length -1) {
            setTimeout(game.results, 1 * 1000);
        } else {
            setTimeout(game.nextQuestion, 1 * 1000)
        }
    },


    // set everything back to the original amounts when user restarts game


    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
};









