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
    question: 'What is mean by "this" keyword in javascript?',
    answers: ['It refers current object', 'It refers previous object', 'It is variable which contains value', 'None of the above'],
    correctAnswer: 'It refers current object',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'Math. round(-20.51)=?',
    answers: ['20', '-21', '19', 'None'],
    correctAnswer: '-21',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'parseFloat(9+10)=?',
    answers: ['19', '-910', '20', 'None'],
    correctAnswer: 'None',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'parseFloat(9+10)=?',
    answers: ['19', '-910', '20', 'None'],
    correctAnswer: 'None',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'How do you create a new object in JavaScript?',
    answers: ['var obj = {}', 'var obj = Object()', 'var obj=new {}', 'None of the above'],
    correctAnswer: 'var obj = {}',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'In Javascript, Which of the following method is used to find out the character at a position in a string?',
    answers: ['charAt()', 'CharacterAt()', 'CharPos()', 'characAt()'],
    correctAnswer: 'charAt()',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'What are the following looping structures are available in javascripts?',
    answers: ['for,forecach', 'foreach,whileloop', 'do-while loop,foreach', 'for , while loop'],
    correctAnswer: 'for , while loop',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'What are the following looping structures are available in javascripts?',
    answers: ['for,forecach', 'foreach,whileloop', 'do-while loop,foreach', 'for , while loop'],
    correctAnswer: 'for , while loop',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'In Javascript, What does isNaN function do ?',
    answers: ['Return true if the argument is not a number', 'Return false if the argument is not a number', 'Return true if the argument is a number', 'None of the above'],
    correctAnswer: 'Return true if the argument is not a number',
    image: 'assets/images/jsimg.jpg'
}, {
    question: 'Who invented the javascript programming language?',
    answers: ['Tennis Ritchie', 'James Gosling', 'Brendan Eich', 'Bill Gates'],
    correctAnswer: 'Brendan Eich',
    image: 'assets/images/jsimg.jpg'
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
        $('#subwrapper').html('<h2 id="counter"></h2>');
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>');
        for(var i = 0; i < questions[game.currentQuestion].answers.length; i ++) {
            $('#subwrapper').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>')
        }

    },

    // set counter back to origin to there is a fresh 30 seconds to answer the new question
    //update html with new time
    // load next question (make sure not to load same question)
    nextQuestion: function () {

        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion()
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
        $('#subwrapper').append('<h3>THE CORRECT ANSWER WAS: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if(game.currentQuestion == questions.length -1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000)
        }
    },

    // load after results after last question
    // clear timer
    // advise user they are done and what their score was
    // append button so user can restart game if they choose
    results: function () {
        clearInterval(timer);
        $('#subwrapper').html('<h2>ALL DONE!</h2>');
        $('#subwrapper').append('<h3>CORRECT: </h3>' + game.correct);
        $('#subwrapper').append('<h3>INCORRECT: </h3>' + game.incorrect);
        $('#subwrapper').append('<h3>UNANSWERED: </h3>' + game.unanswered);
        $('#subwrapper').append('<button id="reset"></button>');
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
    // advise user they got it correct
    // add something that either takes user to the results screen if game over or move to the next question
    answeredCorrectly: function () {
        console.log('YOU GOT IT!');
        clearInterval(timer);
        game.correct ++;
        $('#subwrapper').html('<h2>YOU GOT IT CORRECT!</h2>');
        if(game.currentQuestion == questions.length -1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000)
        }
    },
    // can use the same logic as answered correctly just edit variable name and statement
    // let user know what the correct answer was
    answeredIncorrectly: function () {
        console.log('WRONG :(');
        clearInterval(timer);
        game.incorrect ++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        $('#subwrapper').append('<h3>THE CORRECT ANSWER WAS: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if(game.currentQuestion == questions.length -1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000)
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









