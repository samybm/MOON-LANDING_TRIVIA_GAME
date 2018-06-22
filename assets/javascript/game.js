// Insert Document when ready function- for proper loading


let panel = $('#quiz-area');
let countStartNumber = 20;
let audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/audio/LilWayne-LaLaLa.mp3");

const audio = new Audio("assets/audio/LilWayne-LaLaLa.mp3");



//Click Events
$(document).on('click', '#start-over', function(j) {
    game.reset();
});

$(document).on('click', '.answer-button', function(j) {
    game.clicked(j);
});


$(document).on('click', '#start', function(j) {
    audio.play();
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
    
});













//Questions

let questions = [
    {
   
    question: "What year did the first Human land on the Moon?",
    answers: [1972, 1966, 1968, 1969],
    correctAnswer: 1969,
    image:"assets/images/moon.jpg"
  }, 
  {
   
    question: "What year did Humans visit the Moon last?",
    answers: [1969, 1972, 1980, 2013],
    correctAnswer: 1972,
    image:"assets/images/nasa.jpg"
  }, 
  {
   
    question: "Which is the only other country beside the USA to land a rover on the Moon?",
    answers: ["Russia", "England", "Germany", "China"],
    correctAnswer: "China",
    image:"assets/images/china.jpg"
  }, 
  {
   
    question: "When was the last time the Moon was explored since 1972 by a rover",
    answers: [1988, 2006, 1999, 2013],
    correctAnswer: 2013,
    image:"assets/images/moon2.jpg"
  }, 
  {
   
    question: "What is the name of the new Intergalactic Military Department President Trump recently signed into policy",
    answers: ["Space Force", "S.H.I.E.L.D", "Gaurdian's of the Galaxy", "Galactic Force"],
    correctAnswer: "Space Force",
    image:"assets/images/moonlanding.jpg"
  }, 

];


let game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,

    countdown: function(){
            game.counter--;
            $('#counter-number').html(game.counter);

            if (game.counter === 0){
                console.log('Times Up');
                game.timeUp();
            }

    },

    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '<h2>' );
        for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>'); 
        }
    },
    nextQuestion: function(){
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!<h2>');
        panel.append('<h3> The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append(' <img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 2 * 1000);
        } else {
            setTimeout(game.nextQuestion, 1.5 * 1000);

        }
    },
    results: function(){
        clearInterval(timer);

        panel.html('<h2>All done, here is how you did</h2>');
       

        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '<h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
     },

     clicked: function(j) {
         clearInterval(timer);
        

         if ($(j.target).data("name") === questions[this.currentQuestion].correctAnswer){
           this.answeredCorrectly();  
         } else {
             this.answeredIncorrectly();
         }
     },

     answeredIncorrectly: function() {
         game.incorrect++;
         clearInterval(timer);
         panel.html('<h2>Nope!</h2>');
         panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
         panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
    
         if (game.currentQuestion === questions.length - 1){
             setTimeout(game.results, 2 * 1000);
         } else {
             setTimeout(game.nextQuestion, 1.5 * 1000)
         }
     },
     answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        audio.play();
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
    
        if (game.currentQuestion === questions.length - 1){
          setTimeout(game.results, 2 * 1000);
        } else {
          setTimeout(game.nextQuestion, 1.5 * 1000);
        }
      },
     reset: function(){
         this.currentQuestion = 0;
         this.counter = countStartNumber;
         this.correct = 0;
         this.incorrect = 0;
         this.loadQuestion();
     },

   

   
    
  
};
 


