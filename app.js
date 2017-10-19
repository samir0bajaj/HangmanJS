var Letter = require("./letter.js");
var inquirer = require('inquirer');

var wordOptions = ["microsoft", "oracle", "sap", "workday", "salesforce", "facebook", "netsuite", "google", "ibm", "dropbox", "apple", "spotify"];
var selectedWord = "";
var guessesLeft = 7;
var isLetterInWord = false;

function startGame() {
	guessesLeft = 7;
	console.log("\nPlay Silicon Valley Hangman! Guess the company, in the style of Hangman!\n");
	console.log("Guesses Remaining: " + guessesLeft);
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	wordNow = new Letter(selectedWord);
	// console.log(wordNow.letters + "\n");
	wordNow.displayBlanks();	
		inquirer.prompt([
			{
		    	type: 'input',
		    	name: 'guess',
		    	message: 'Guess a letter!'
		 	}
			]).then(checkGuess);
	};		  

var endGame = function() {
	inquirer.prompt([
	 	{
	 		type: 'confirm',
	 		name: 'end',
	 		message: 'You are out of guesses! Do you want to end the game now?'
	 	}
		]).then(function (answers) {
			var end = answers.end;
			if (!end) {
				startGame();
			}
			else {
				return;
			}
		}); 
};

var guessAgain = function() {
	inquirer.prompt([
			{
		    	type: 'input',
		    	name: 'guess',
		    	message: 'Guess a letter!'
		 	}
			]).then(checkGuess);
};

var newRound = function() {
	isLetterInWord = false;
	guessesLeft = 5;
	console.log("Guesses Remaining: " + guessesLeft);
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	wordNow = new Letter(selectedWord);
	// console.log(wordNow.letters + "\n");
	wordNow.displayBlanks();	
		inquirer.prompt([
			{
		    	type: 'input',
		    	name: 'guess',
		    	message: 'Guess a letter!'
		 	}
			]).then(checkGuess);
};

var checkGuess = function(answers) {
	answer = answers.guess;
	isLetterInWord = false;
	for (var i=0; i < wordNow.letters.length; i++) {
		if (wordNow.letters[i] == answer) {
			isLetterInWord = true;
		}
	}
	// Check location in word and populate
	if(isLetterInWord) {
		for (var i = 0; i < wordNow.letters.length; i++) {
			if (wordNow.letters[i] == answer) {
				console.log("\nCORRECT!");
				wordNow.replaceBlank(answer);
				console.log("\nGuesses Remaining: " + guessesLeft);
				console.log(wordNow.array.join("  "));
				if (wordNow.letters.toString() == wordNow.array.toString()) {
					console.log("\nNice Job! Next Word!\n");
					return newRound();
				} else {
					return guessAgain();
				}
			}
		}
	}
	else {
		console.log("\nIncorrect!\n");
		guessesLeft--;
		console.log("Guesses Remaining: " + guessesLeft);
		console.log(wordNow.array.join("  "));
		if (guessesLeft > 0) {
			guessAgain();
		} else if (guessesLeft === 0) {
			endGame();
		}
	}
};

startGame();
