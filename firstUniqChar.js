/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
    const map = new Map();
    for (const char of s) {
        if (map.has(char)) {
            map.set(char, true);
        } else {
            map.set(char, false);
        }
    }
    for (const [key, value] of map) {
        if (value === false) {
            return key;
        }
    }
};
console.log(firstUniqChar("leetcode"))