'use strict';
module.exports = {
    secondsToDate: secondsToDate,
    toBase2Converter: toBase2Converter,
    substringOccurrencesCounter: substringOccurrencesCounter,
    repeatingLitters: repeatingLitters,
    redundant: redundant,
    towerHanoi: towerHanoi,
    matrixMultiplication: matrixMultiplication,
    gather: gather,
  };
/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    let startDate = new Date(Date.UTC(2020, 5, 1, 0, 0, 0));
    startDate.setSeconds(seconds);
    return new Intl.DateTimeFormat('ru-Ru').format(startDate);
}
console.log(secondsToDate(0));


/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    return (decimal >>> 0).toString(2);
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    substring = substring.toLowerCase();
    text = text.toLowerCase();
    return text.split(substring).length - 1;
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(str) {
    let res = '';
    for (let i = 0; i < str.length; i++) {
        if (substringOccurrencesCounter(str[i], str) < 2) {
            res += str[i].repeat(2);
        } else {
            res += str[i];
        }
    }
    return res;
}
//console.log(repeatingLetters('Hello world'));

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return () => { return str }
}
const f1 = redundant("apple");
console.log(f1());
/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    return 2 ** disks - 1;
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    let countOfRows1 = matrix1.length,
        countOfColumns1 = matrix1[0].length,
        countOfColumns2 = matrix2[0].length,
        resultMatrix = new Array(countOfRows1);
    for (var i = 0; i < countOfRows1; ++i) {
        resultMatrix[i] = new Array(countOfColumns2);
        for (var j = 0; j < countOfColumns2; ++j) {
            resultMatrix[i][j] = 0;
            for (var k = 0; k < countOfColumns1; ++k) {
                resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return resultMatrix;

}
let matrix = [[2, 3, -1], [6, 1, -2]];
let matrix2 = [[4, -5], [-3, 0], [1, 2]];
console.log(matrixMultiplication(matrix, matrix2));


/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
    let inputArray = [];
    let outputArray;
    inputArray.push(str);
    return function innerFunction(str) {
      inputArray.push(str);
      let count = 0;
      function order(num) {
        if (count === 0) {
          outputArray = new Array(inputArray.length);
        }
        outputArray[num] = inputArray.shift();
        count++;
        function get() {
          return outputArray.join("");
        }
        order.get = get;
        return order;
      }
      innerFunction.order = order;
      return innerFunction;
    };
    
}
console.log(gather("a")("b")("c").order(2)(1)(0).get());
