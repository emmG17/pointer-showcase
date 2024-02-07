/**
 * Represents a cursor object with start and end positions.
 * @typedef {Object} Cursor
 * @property {Number} start - The starting position of the cursor as an index of the ranges list.
 * @property {Number} end - The ending position of the cursor as an index of the ranges list.
 */

const ranges = () => ([
  [0, 100],
  [100, 200],
  [200, 300],
  [300, 400],
  [400, 500],
  [500, 600],
  [600, 700],
  [700, 800],
  [800, 900],
  [900, 1000],
]);

/**
 * @description Creates a cursor from the range values and a list of ranges
 * @param {Number} min
 * @param {Number} max
 * @param { [[Number, Number]]} rangeList
 * @returns {Cursor} An object containing the start and end indices where the min, max values lie within the range range list
 */
function pickRanges(min, max, rangeList) {
  const cursor = { start: 0, end: 0 };
  for (let i = 0; i < rangeList.length; i++) {
    const rangeMin = rangeList[i][0];
    const rangeMax = rangeList[i][1];
    // The values are not contained in a single range.
    if (between(min, rangeMin, rangeMax)) {
      cursor.start = i;
    }
    if (between(max, rangeMin, rangeMax)) {
      cursor.end = i;
    }
  }
  return cursor;
}

function between(value, min, max) {
  return value >= min && value < max;
}

class Range {
  constructor() {
    /**
     * The cursor stack
     * @type { [Cursor] }
     */
    this.cursors = [];
  }

  /**
    @description Pushes a cursor to the cursor stack and auto-updates the available ranges
    @param {Number} min the minimum value of the range tuple
    @param {Number} max the maximum value of the range tuple
    @returns A list containing the available ranges
    */
  addCursor(min, max) {
    const cursor = pickRanges(min, max, ranges());
    this.cursors.push(cursor);
    return this.#updateAvailableRanges();
  }

  /**
    @description Pops a cursor from the cursor stack and auto-updates the available ranges
    @returns A list containing the available ranges
  */
  popCursor() {
    this.cursors.pop();
    return this.#updateAvailableRanges();
  }

  /**
    @description Searches for ranges that are not contained inside the cursors
    @returns A list of the free ranges
  */
  #updateAvailableRanges() {
    let values = ranges();
    let result = [];

    for (let i = 0; i < values.length; i++) {
      let exclude = false;
      for (let j = 0; j < this.cursors.length; j++) {
        const cursor = this.cursors[j];
        if (cursor.start <= i && i <= cursor.end) {
          exclude = true;
          break;
        }
      }
      if (!exclude) {
        result.push(values[i]);
      }
    }
    return result;
  }
}

module.exports = Range;
