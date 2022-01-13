const assert = require('assert');
const forEach = require('mocha-each');
const jsPracticalTask = require("../js_practical_task.js");


describe('secondsToDate(): correct input', () => {
    forEach([
        [0, '01.06.2020'],
        [31536000, '01.06.2021'],
        [86400, '02.06.2020'],
    ])

        .it('adds %d  then returns %s', (seconds, expected) => {
            assert.equal(jsPracticalTask.secondsToDate(seconds), expected)

        });
});

describe("toBase2Converter: correct input", () => {
    forEach([
        [0, "0"],
        [1, "1"],
        [5, "101"],
        [10, "1010"],
    ]).it("Input is '%s' ", (number, expected) => {
        assert.equal(jsPracticalTask.toBase2Converter(number), expected);
    });
});


describe("substringOccurrencesCounter: correct input", () => {
    forEach([
        ["a", "test it", 0],
        ["t", "test it", 3],
        ["T", "test it", 3],
    ]).it("Input is '%s' '%s'", (substring, text, expected) => {
        assert.equal(jsPracticalTask.substringOccurrencesCounter(substring, text), expected
        );
    });
});


describe("repeatingLitters: correct input", () => {
    forEach([
        ["Hello", "HHeelloo"],
        ["Hello world", "HHeello  wworrldd"],
        ["aa", "aa"],
    ]).it("Input is '%s'", (string, expected) => {
        assert.equal(jsPracticalTask.repeatingLitters(string), expected);
    });
});


describe("redundant: correct input", () => {
    forEach([["Hello"], ["hi"], ["Apple"]]).it("input is '%s'", (expected) => {

        assert.equal(jsPracticalTask.redundant(expected)(), expected);
    });
});


describe("towerHanoi: correct input", () => {
    forEach([
        [0, 0],
        [1, 1],
        [2, 3],
        [10, 1023],
    ]).it("Input is '%s'", (number, expected) => {
        assert.equal(jsPracticalTask.towerHanoi(number), expected);
    });
});

describe("matrixMultiplication: correct input", () => {
    forEach([
        [
            [
                [2, 3, -1], [6, 1, -2]

            ],
            [
                [4, -5], [-3, 0], [1, 2]
            ],
            [
                [-2, -12], [19, -34]
            ],
        ],
        [
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1],
                [1, 1],
            ],
            [
                [2, 2],
                [2, 2],
            ],
        ],
    ]).it("Input is '%s' '%s' ", (matrix1, matrix2, expected) => {
        assert.deepEqual(
            jsPracticalTask.matrixMultiplication(matrix1, matrix2), expected);
    });
});


describe("gather: correct input", () => {
    forEach([
        [["a", "b", "c"], [0, 1, 2], "abc"],
        [["a", "b", "c"], [2, 1, 0], "cba"],
    ]).it("input is '%s'", (strArray, orderArray, expected) => {
        assert.equal(
            jsPracticalTask
                .gather(strArray[0])(strArray[1])(strArray[2])
                .order(orderArray[0])(orderArray[1])(orderArray[2])
                .get()
            , expected);
    });
});