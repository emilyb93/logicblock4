class Iterator {
  #currentPosition;
  #firstCall;
  #canvasSize;

  constructor(input) {
    this.#currentPosition = input;
    this.#firstCall = true;
    if (input) {
      this.#canvasSize = this.getCanvasSize();
    }
  }

  next(step = 1) {
    if (this.#firstCall) {
      this.#firstCall = false;
      return this.#currentPosition;
    }
    for (let i = 1; i <= step; i++) {
      this.#currentPosition.forEach((light) => {
        light.position[0] += light.velocity[0];
        light.position[1] += light.velocity[1];
      });
    }

    return this.#currentPosition;
  }

  prev(step = 1) {
    if (this.#firstCall) {
      this.#firstCall = false;
      return this.#currentPosition;
    }
    for (let i = 1; i <= step; i++) {
      this.#currentPosition.forEach((light) => {
        light.position[0] -= light.velocity[0];
        light.position[1] -= light.velocity[1];
      });
    }

    return this.#currentPosition;
  }

  getCanvasSize() {
    if (this.#firstCall && this.#currentPosition) {
      const findMaxValues = (a, b) => {
        const xAxis = Math.max(a[0], Math.abs(b.position[0]));
        const yAxis = Math.max(a[1], Math.abs(b.position[1]));
        return [xAxis, yAxis];
      };
      const maxVal = this.#currentPosition.reduce(findMaxValues, [
        -Infinity,
        -Infinity,
      ]);
      this.#canvasSize = { xAxis: maxVal[0] * 2, yAxis: maxVal[1] * 2 };
    }
    return this.#canvasSize;
  }
}

export default Iterator;
