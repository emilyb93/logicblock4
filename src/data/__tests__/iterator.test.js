const Iterator = require("../utils/iterator");
const { formatData } = require("../utils/utils");

describe("Iterator", () => {
  test("should intiate an Iterator", () => {
    const lightIterator = new Iterator("");

    expect(lightIterator).toBeInstanceOf(Iterator);
  });

  describe("next", () => {
    test("should have a next method which intially returns the values", () => {
      const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      expect(lightIterator.next()).toEqual([
        { position: [3, -2], velocity: [-1, 1] },
        { position: [6, 10], velocity: [-2, -1] },
      ]);
    });

    test("next function should return the position coords of each object changed by the velocity on each invocation", () => {
      const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      expect(lightIterator.next()).toEqual([
        { position: [3, -2], velocity: [-1, 1] },
        { position: [6, 10], velocity: [-2, -1] },
      ]);
      expect(lightIterator.next()).toEqual([
        { position: [2, -1], velocity: [-1, 1] },
        { position: [4, 9], velocity: [-2, -1] },
      ]);
      expect(lightIterator.next()).toEqual([
        { position: [1, 0], velocity: [-1, 1] },
        { position: [2, 8], velocity: [-2, -1] },
      ]);
    });

    test("should be able to take a step argument to move the iterations by", () => {
      const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      expect(lightIterator.next()).toEqual([
        { position: [3, -2], velocity: [-1, 1] },
        { position: [6, 10], velocity: [-2, -1] },
      ]);
      expect(lightIterator.next(2)).toEqual([
        { position: [1, 0], velocity: [-1, 1] },
        { position: [2, 8], velocity: [-2, -1] },
      ]);
    });
  });

  describe("getCanvasSize", () => {
    test("should return an object", () => {
      const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      expect(lightIterator.getCanvasSize()).toBeInstanceOf(Object);
    });

    test("should return an object with the canvas size x and y axis, which should be double the largest values in the initial positions", () => {
      const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      expect(lightIterator.getCanvasSize()).toEqual({ xAxis: 12, yAxis: 20 });
    });

    test("should work for negative values", () => {
      const input = `position=< 3, 2> velocity=<-1,  1>\nposition=< -6, -10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      expect(lightIterator.getCanvasSize()).toEqual({ xAxis: 12, yAxis: 20 });
    });
  });

  describe("prev", () => {
    test("should step the values backwards", () => {
      const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      lightIterator.next();
      lightIterator.next();
      expect(lightIterator.prev()).toEqual([
        { position: [3, -2], velocity: [-1, 1] },
        { position: [6, 10], velocity: [-2, -1] },
      ]);
    });

    test("should be able to take an argument that steps backwards by that amount", () => {
      const input = `position=< 3, -2> velocity=<-1,  1>\nposition=< 6, 10> velocity=<-2, -1>`;
      const formattedData = formatData(input);
      const lightIterator = new Iterator(formattedData);

      lightIterator.next();
      lightIterator.next();
      lightIterator.next();

      expect(lightIterator.prev(2)).toEqual([
        { position: [3, -2], velocity: [-1, 1] },
        { position: [6, 10], velocity: [-2, -1] },
      ]);
    });
  });
});
