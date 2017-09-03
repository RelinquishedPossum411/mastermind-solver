
const solver = require("./solver");

const mastermind = function (size, pegs, guesses) {
	console.log(guesses);
	console.log(pegs);

	const board = [];

	// Build initial board
	for (let i = 0; i < size; i++)
		board.push(0);

	// Start at the first guess and check black keys.
	return solver(size, pegs, guesses, board, 0, 0);
};

module.exports = mastermind;
