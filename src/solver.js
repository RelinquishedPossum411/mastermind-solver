const count = require("./util/count");
const containsAtIndex = require("./util/containsAtIndex");
const createKeyArray = require("./util/createKeyArray");
const copy = require("./util/copy");
const colors = require("./util/colors");
const Board = require("./board");

module.exports = function (size, numberOfPegsInAGuess, guesses) {
    const log = console.log;

    // Counter for the number of working guesses. Delete later if not needed.
    let step = 0;

    // 1. Find all the correct colors in the correct position: reduce the number
    //    of black keys to none in all guesses.
    // 2. Find all the correct colors in the wrong position: reduce the number
    //    of white keys to none in all guesses.
    // 3. Fill any remaining slots on the board.

    // For now, return only the solutions after solving for the correct pegs.
    return solveBlackKeys();

    function solveBlackKeys() {
        // Solve all the black keys first. By assuming that any given keys can be
        // in the correct position and is of the correct color. If we can deduce
        // some kind of contradiction from that assumption, then we can invalidate
        // that answer.
        for (let i = 0; i < size; i++)
            blackKeysGuess(i, 0, [0, 0, 0, 0], createKeyArray(size), []);

        return solutions;
    }

    /**
     * Fills in the solutions array with potential solutions that contain pegs
     * that are in the correct position and of the correct color.
     *
     * @param guess the current guess number
     * @param position the current position in the current guess
     * @param solution the set of possibly correct pegs
     * @param keysArray the set of all keys for all guesses
     * @param all the array containing the potential solutions
     */
    function blackKeysGuess(guess, position, solution, keysArray, all) {
        // Prevent stack overflow
        if (position >= numberOfPegsInAGuess)
            return;

        if (guess >= size) {
            blackKeysGuess(0, position + 1, solution, keysArray, all);
            return;
        }

        // Skip the guess if there are no black keys.
        if (guesses[guess].getKeys()[0] - keysArray[guess][0] === 0) {
            blackKeysGuess(guess + 1, position, solution, keysArray, all);
            return;
        }

        log("[" + (++step) + "]----------NEW GUESS: " + guess + " POS : " + position);

        for (let i = 0; i < size; i++)
            log(guesses[i].getKeys());

        log(keysArray);
        log(solution);

        // Assume the current peg at the current position is of the
        // correct color and correct position.
        // * Check all guesses for the same colored peg.
        // * If a peg has the same position, subtract a black key.
        // * If a peg has a different position, subtract a white key.
        // * If the number of keys to subtract exceeds the available
        //   keys in the guesses, then the current assumption is false.
        // * Only subtract a key if the count in the current board is
        //   less than the number of pegs of the same color in the
        //   guess. That means no peg is being re-used.
        const currentColor = guesses[guess].getBoard()[position];
        log("\t* Current Color: " + colors[currentColor]);

        // Go through all the guesses and check for the same color.
        // If we encounter a problem, return false.
        for (let i = 0; i < size; i++) {
            if (i === guess) continue;

            // log(solution);
            // log(guesses[i].getBoard());

            if (guesses[i].getBoard()
                .includes(currentColor) &&
                count(solution, currentColor) < count(guesses[i].getBoard(), currentColor)) {
                // Return false if the value of the keys after subtracting 1 and
                // the number of keys in the instance of the key array is less
                // than 0.

                let keyType = containsAtIndex(guesses[i].getBoard(), currentColor, position) ?
                    0 : 1;

                log("\tFOUND " + colors[Number.parseInt(currentColor)] + ", " + currentColor + " IN GUESS " + i + ", KEY TYPE " + keyType);

                if (guesses[i].getKeys()[keyType] - keysArray[i][keyType] - 1 < 0) {
                    log("\t\tFAILED AT GUESS " + i + ": (" + guesses[i].getKeys()[keyType] + " - " + keysArray[i][keyType] + ")");
                    return;
                }

                log("\t\tPassed! (" + guesses[i].getKeys()[keyType] + " - " + keysArray[i][keyType] + ")");
                keysArray[i][keyType]++;
            }
        }

        // Subtract 1 from the guesses if it permits, else return break and
        // prevent the current "potential solution" to be added to the set of
        // solutions.
        if (guesses[guess].getKeys()[0] - keysArray[guess][0] - 1 < 0) {
            log("\t\tFAILED AT GUESS UNABLE TO SUBTRACT BLACK KEY: (" + guesses[guess].getKeys()[0] + " - " + keysArray[guess][0] + ")");
            return;
        } else {
            // Otherwise subtract a black key and add the peg to the potential
            // solution.
            keysArray[guess][0]++;
            solution[position] = currentColor;
        }

        // Copy the solution array so they are independent.
        if (position + 1 >= numberOfPegsInAGuess - 1) {
            log("DONE.");

            // Make sure there are no duplicates of the same solution.
            if (!all.some(a => copy.isDeepCopy(solution, a.getBoard()) && copy.isDeepCopy(keysArray, a.getKeys())))
                all.push(new Board(solution, keysArray));

            return;
        }

        // Recurse to all subsequent guesses ONLY if we do not exceed the
        // bounds.
        for (let i = 0; i < size; i++)
            blackKeysGuess(i, position + 1, copy.array(solution), copy.array(keysArray), all);
    }

    // Solve the white keys by plugging in all colors and see if it works.
    // Perform this step only if there are white keys. Make a pass through the
    // all the guesses to check this.
    // A peg fits in a guess if there is a white key and a same colored peg is
    // not in the position in the potential solution. Also, the count of the
    // same colored peg in the potential solution must not exceed that of the
    // guess plus 1 for the peg we are "adding".
    function solveWhiteKeys() {

    }

    function whiteKeysGuess(position, solution, keysArray) {
        // If successful, then update the solution, else remove it from the
        // solution set.
        if (position >= solution.length)
            return;

        // Go through each position in the solution and find an empty slot, a
        // slot containing 0, and attempt to fill it with a peg.
        // Create a case for every single color.
    }
};
