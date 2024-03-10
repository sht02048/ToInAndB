class Canvas {
  #leftBlockSize = 90;
  #rightBlockSize = 135;
  #PlayerAircraftHeight = 61;

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.x = 0;
    this.y = 0;
    this.minX = this.#leftBlockSize;
    this.maxX = this.canvas.width - this.#rightBlockSize;
    this.minY = -10;
    this.maxY = this.canvas.height - this.#PlayerAircraftHeight + 5;
    this.speed = (this.canvas.width + this.canvas.height) * 0.002;
    this.inAndOutSpeed = this.speed * 2;
  }
}

export default Canvas;
