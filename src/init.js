const readline = require("readline");
const chalk = require("chalk");
const isValid = require("./util/validity");
const mastermind = require("./mastermind");

(function (global) {
    const log = console.log;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const guesses = [];
    const keys = [];
    let times;

    rl.question("How many initial guesses? ", initialGuesses => {
        times = initialGuesses;

        log("Colors: " + chalk.bgBlue("1 - Bu - Blue") + " " + chalk.bgRed("2 - R - Red") + " " + chalk.bgGreen("3 - G - Green") + " " + chalk.black.bgWhite("4 - W - White") + " " + chalk.bgBlack("5 - Bk - Black") + " " + chalk.bgYellow("6 - Y - Yellow"));
        log("Separate colors by a " + chalk.magenta("space") + ".");
        log("Enter " + chalk.gray.bgCyan("4 colors") + " for each guess and place the number of black keys and white keys as the first two indices.");

        rl.question("How many pegs in a guess? ", guessSize => {
            rl.question("Use a pre-loaded guess? ", answer => {
                if (answer === "no") {
                    rl.on("line", input => {
                        let guess = input.trim()
                            .split(/[\s]+/);

                        if (!isValid(guess, size))
                            throw new Error("A supplied guess is in correct.");

                        guesses.push(guess.slice(2));
                        keys.push(guess.slice(0, 2));
                        initialGuesses--;

                        if (initialGuesses === 0) {
                            rl.close();
                            log(mastermind(keys, guesses));
                        }
                    });
                } else {
                    const keys = [
                        [1, 1],
                        [1, 1],
                        [0, 3],
                        [2, 0]
                    ];

                    const guesses = [
                        [4, 3, 1, 2],
                        [5, 6, 2, 1],
                        [2, 2, 3, 6],
                        [6, 2, 2, 4]
                    ];

                    // Solution: 6 3 2 3

                    const solution = mastermind(4, 4, keys, guesses);

                    for (const a of solution)
                        log(a.getBoard() + " ::: " + a.getKeys());
                }

                rl.close();
            });
        });
    });
})(global);
