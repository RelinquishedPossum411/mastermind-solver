
const readline = require("readline");
const chalk = require("chalk");
const log = console.log;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let times;

rl.question("How many initial guesses? ", guesses => times = guesses);
rl.on("line", input => {
	if (times === 1)
		rl.close();

	times--;
});
