module.exports = class {
    constructor(sequence, keys) {
        const board = sequence;
        const keysArray = keys;

        this.getBoard = function () {
            return board;
        };
        this.getKeys = function () {
            return keysArray;
        };
    }
};
