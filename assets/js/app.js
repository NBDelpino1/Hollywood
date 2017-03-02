// Start Button

$('#start').on('click', function() {
    // Remove start button when game starts
    $('#start').remove();
})


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







