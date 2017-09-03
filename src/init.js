
(function (global) {
	"use strict";

	const readline = require("readline");
	const chalk = require("chalk");
	const isValid = require("./util/validity");
	const mastermind = require("./mastermind");
	const log = console.log;

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const guesses = [];
	const pegs = [];
	let times;

	rl.question("How many initial guesses? ", initialGuesses => {
		times = initialGuesses;

		log("Colors: " + chalk.bgBlue("1 - Bu - Blue") + " " + chalk.bgRed("2 - R - Red") + " " + chalk.bgGreen("3 - G - Green") + " " + chalk.black.bgWhite("4 - W - White") + " " + chalk.bgBlack("5 - Bk - Black") + " " + chalk.bgYellow("6 - Y - Yellow"));
		log("Separate colors by a " + chalk.magenta("space") + ".");
		log("Enter " + chalk.gray.bgCyan("4 colors") + " for each guess and place the number of black keys and white keys as the first two indices.");
	});

	rl.on("line", input => {
		let guess = input.trim().split(/[\s]+/);

		if (!isValid(guess, 4))
			throw new Error("A supplied guess is in correct.");

		guesses.push(guess.slice(2));
		pegs.push(guess.slice(0, 2));
		times--;

		if (times === 0) {
			rl.close();
			log(mastermind(pegs, guesses));
		}
	});
})(global);
