
const solver = require("./solver");
const Board = require("./board");

const mastermind = function (size, numberOfPegsInAGuess, keys, givenGuesses) {
	const guesses = [];

	for (let i = 0; i < size; i++)
		guesses.push(new Board(givenGuesses[i], keys[i]));

	// Start at the first guess and check black keys first.
	return solver(size, numberOfPegsInAGuess, guesses);
};

module.exports = mastermind;
