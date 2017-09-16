module.exports = function(size) {
    const keys = [];

    for (; size > 0; size--)
        keys.push([0, 0]);

    return keys;
};