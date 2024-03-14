class Renderer {
  #leftBlockSize = 100;
  #rightBlockSize = 145;
  #playerShipHeight = 61;
  #mainCanvas = document.getElementById("main-canvas");
  #introCanvas = document.getElementById("intro-canvas");

  constructor(imagePath, width, height) {
    this.imagePath = imagePath;
    this.image = new Image();
    this.width = width;
    this.height = height;
    this.image.src = this.imagePath;

    this.mainCtx = this.#mainCanvas.getContext("2d");
    this.introCtx = this.#introCanvas.getContext("2d");
    this.canvasWidth = this.#mainCanvas.width;
    this.canvasHeight = this.#mainCanvas.height;
    this.minX = this.#leftBlockSize;
    this.maxX = this.canvasWidth - this.#rightBlockSize;
    this.minY = -10;
    this.maxY = this.canvasHeight - this.#playerShipHeight + 5;
    this.inAndOutSpeed = 4;
    this.frame = 0;

    if (this.width === undefined && this.height === undefined) {
      this.image.onload = () => {
        this.width = this.image.width;
        this.height = this.image.height;
      };
    }
  }

  render(x, y, width, height) {
    if (width !== undefined && height !== undefined) {
      this.mainCtx.drawImage(this.image, x, y, width, height);

      return;
    }

    this.mainCtx.drawImage(this.image, x, y);
  }

  renderIntro(x, y, width, height) {
    this.introCtx.drawImage(this.image, x, y, width, height);
  }
}

export default Renderer;
