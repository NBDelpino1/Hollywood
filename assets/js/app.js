// Start Button

$('#start').on('click', function() {
    // Remove start button when game starts
    $('#start').remove();
    // load question after game starts
    game.loadQuestion();
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
    // incharge of changing the timer
    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter <= 0) {
            console.log('TIME UP!');
            game.timeUp();
        }
    },
    // load question to page
    loadQuestion: function () {
        // set the timer to start decreasing by one second as the question loads
        timer = setInterval(game.countdown,1000);
        // post current question to the page
        $('#subwrapper').html('<h2>' + questions[game.currentQuestion].question + '</h2>');
        // post answer to the page by looping through answers and append to page
        for(var i = 0; i < questions[game.currentQuestion].answers.length; i ++) {
            $('#subwrapper').append('<button class="answer-button" id="button-' + i + ' " data-name="' + questions[game.currentQuestion].answers[i] + ' " > ' + questions[game.currentQuestion].answers[i] + '</button>');
        }
    },

    nextQuestion: function () {

    },

    timeUp: function () {

    },

    results: function () {

    },

    clicked: function () {

    },
    
    answeredCorrectly: function () {
        
    },

    answeredIncorrectly: function () {

    },
    
    reset: function () {
        
    }
}









