/**
 * Deep Copyer
 * Performs a deep copy on object literals and arrays and covers all nested
 * object literals and arrays.
 * @author Benjamin Huang
 */

const isObject = (object) => Object.prototype.toString.call(object) === "[object Object]";
const isArray = (array) => Object.prototype.toString.call(array) === "[object Array]";

/**
 * Checks whether an object literal or array is a "deep copy" with another
 * specified object literal or array.
 * @param   a - an object literal or an array.
 * @param   b - an object literal or an array to compare with.
 * @return  returns true if all values and nested items are clones of each
 *          other. Returns false otherwise.
 */
function isDeepCopy(a, b) {
    for (const c in a) {
        if (isObject(a[c]) || isArray(a[c])) {
            if (!b[c] || a[c] === b[c]) {
                return false;
            }

            return isDeepCopy(a[c], b[c]);
        }

        if (a[c] !== b[c])
            return false;
    }

    return true;
}

/**
 * Copies all values and nested items from all specified sources into a target.
 * @param   target - the object literal to copy the values of all
 *          sources into.
 * @param   ...sources - one or more object literals to copy values to the
 *          target. Repeated values are overridden.
 * @return  Returns the target object literal.
 */
function deepMergeObject(target, ...sources) {
    let src;

    for (const i of sources)
        if (!isObject(target) || !isObject(i))
            return;

    for (const source of sources) {
        for (const item in source) {
            src = source[item];
            target[item] = isObject(src) ?
                Object.assign({}, deepMergeObject({}, src)) : (
                    isArray(src) ?
                    deepMergeArray([], src) :
                    source[item]);
        }
    }

    return target;
}

/**
 * Copies all values and nested items from all specified sources into a target.
 * @param   target - the array to copy the values of all
 *          sources into.
 * @param   ...sources - one or more arrays to copy values to the
 *          target. Repeated values are overridden.
 * @return  Returns the target array.
 */
function deepMergeArray(target, ...sources) {
    for (const i of sources)
        if (!isArray(target) || !isArray(i))
            return;

    for (const source of sources) {
        for (const item of source) {
            target.push(
                isArray(item) ?
                deepMergeArray([], item) : (
                    isObject(item) ?
                    deepMergeObject({}, item) :
                    item)
            );
        }
    }

    return target;
}

module.exports = {
    isDeepCopy: isDeepCopy,
    object: deepMergeObject,
    array: deepMergeArray
};