const { formatData } = require("../utils/utils.js");

describe("formatInput", () => {
  test("should return an array", () => {
    const output = formatData("");
    expect(output).toBeInstanceOf(Array);
  });

  test("should return an array, with an object for each line of input with the information provided", () => {
    const input = "position=< 7,  0> velocity=<-1,  0>";

    const output = formatData(input);

    const expected = [{ position: [7, 0], velocity: [-1, 0] }];

    expect(output).toEqual(expected);
  });

  test("should return an array of objects for multiple lines", () => {
    const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;

    const output = formatData(input);

    const expected = [
      { position: [3, -2], velocity: [-1, 1] },
      { position: [6, 10], velocity: [-2, -1] },
    ];

    expect(output).toEqual(expected);
  });

  test("should work for numbers larger than 2 digits", () => {
    const input = `position=< 34244, -23432> velocity=<-1,  1>\nposition=< 10232, 10132> velocity=<-2, -1>`;

    const output = formatData(input);

    const expected = [
      { position: [34244, -23432], velocity: [-1, 1] },
      { position: [10232, 10132], velocity: [-2, -1] },
    ];

    expect(output).toEqual(expected);
  });
});
