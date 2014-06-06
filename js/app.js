var numGuesses = 0;
var guesses = [];
var numToGuess = 0;

var newGame = function(){
	numGuesses = 0;	
	guesses = [];
	$('#feedback').text("Make your Guess!");
	$('#guessList').find('li').remove();
	$('#count').text('0');
	numToGuess = randNum();
};

var randNum = function(){
	return Math.floor((Math.random() * 100) + 1);
};


var checkGuess = function(guess, num){
	var feedback = '';
	var guessDiff = Math.abs(+guess - num);
	if (guessDiff >= 50){
		feedback = "Very Cold!";
	}
	else if (guessDiff < 50 && guessDiff >= 30){
		feedback = "Cold";
	}
	else if (guessDiff < 30 && guessDiff >= 20){
		feedback = "Warm";
	}
	else if (guessDiff < 20 && guessDiff >= 10){
		feedback = "Hot";
	}
	else if (guessDiff < 10 && guessDiff >= 1){
		feedback = "Very Hot!";
	}
	else if (guessDiff == 0){
		feedback = "You got it!";
	}
	return feedback;
};

var validEntry = function(entry){
	var message = "";
	if (isNaN(+entry)){
		message = "Please enter a number";
	}
	else if (+entry % 1 !== 0){
		message = "Please enter a whole number";
	}
	else if (+entry > 100 || +entry < 1){
		message = "Please enter a number between 1 and 100";
	}
	else{
		message  = true;
	}
	return message;
};

$(document).ready(function(){
	newGame();
	
		/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	
 	$('.new').on('click', function(){
		newGame();
	});
		

	$('#guessButton').on('click', function(event){
		event.preventDefault();
		var currentGuess = $('#userGuess').val();
		var validMsg = validEntry(currentGuess);
		if (validMsg === true){
			$('#guessList').prepend('<li>' + currentGuess + '</li>');
			guesses.push(+currentGuess);
			numGuesses++;
			$('#count').text(numGuesses);
			var guessResult = checkGuess(currentGuess, numToGuess);
			$('#feedback').text(guessResult);
			$('#userGuess').val('');
		}
		else{
			$('#feedback').text(validMsg);
		}	
	});
});

