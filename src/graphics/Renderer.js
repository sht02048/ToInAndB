class Renderer {
  #leftBlockSize = 100;
  #rightBlockSize = 145;
  #playerShipHeight = 61;
  #mainCanvas = document.getElementById("main-canvas");
  #introCanvas = document.getElementById("intro-canvas");

  constructor(imagePath) {
    this.imagePath = imagePath;
    this.image = new Image();
    this.width;
    this.height;
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

    this.isImageOnload = false;

    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
      this.isImageOnload = true;
    };
  }

  render(x, y, width, height) {
    if (!this.isImageOnload) {
      return;
    }

    if (width !== undefined && height !== undefined) {
      this.mainCtx.drawImage(this.image, x, y, width, height);

      return;
    }

    this.mainCtx.drawImage(this.image, x, y);
  }

  renderAngle(x, y, width, height, angle) {
    if (!this.isImageOnload) {
      return;
    }

    this.mainCtx.save();
    this.mainCtx.translate(x, y + 10);
    this.mainCtx.rotate(angle);
    this.mainCtx.drawImage(
      this.image,
      -width / 2 + 10,
      -height + 20,
      width,
      height,
    );
    this.mainCtx.restore();
  }

  renderIntro(x, y, width, height) {
    this.introCtx.drawImage(this.image, x, y, width, height);
  }
}

export default Renderer;
