const Range = require("./app.js");

test("Adding [60, 70] should only remove the first range", () => {
  const range = new Range();
  const result = range.addCursor(60, 70);
  expect(result).toStrictEqual([
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
});

test("Adding [100, 500] should remove all elements from [100, 200] up to [500, 600]", () => {
  const range = new Range();
  const result = range.addCursor(100, 500);
  expect(result).toStrictEqual([
    [0, 100],
    [600, 700],
    [700, 800],
    [800, 900],
    [900, 1000],
  ]);
});

test("Adding [60, 70] and [100, 500] should remove all elements up to [500, 600]", () => {
  const range = new Range();
  range.addCursor(60, 70);
  const result = range.addCursor(100, 500);
  expect(result).toStrictEqual([
    [600, 700],
    [700, 800],
    [800, 900],
    [900, 1000],
  ]);
});

test("Adding [60, 70] and removing it should result in no changes", () => {
  const range = new Range();
  range.addCursor(60,70);
  const result = range.popCursor();
  expect(result).toStrictEqual([
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
  ])
});

test("Adding [100, 500], [60, 70], then removing [60, 70] should remove all elements from [100, 200] to [500, 600]", () => {
  const range = new Range();
  range.addCursor(100, 500);
  range.addCursor(60, 70);
  const result = range.popCursor();
  expect(result).toStrictEqual([
    [0, 100],
    [600, 700],
    [700, 800],
    [800, 900],
    [900, 1000],
  ]);
});
