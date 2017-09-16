module.exports = function (array, value, strict = true) {
    let contains = 0;

    for (let i = 0; i < array.length; i++) {
        if (strict ? array[i] === value : array[i] == value)
            contains++;
    }

    return contains;
};
