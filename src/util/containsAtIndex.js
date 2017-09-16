module.exports = function containsAtIndex(array, value, index) {
    let ind = array.indexOf(value);

    if (ind > index)
        return false;

    if (ind === index)
        return true;

    if (ind !== -1)
        return containsAtIndex(array.slice(ind + 1), value, index - ind - 1);

    return false;
};
