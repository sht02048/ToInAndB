import Renderer from "./Renderer";

class Background {
  #isInStarted = true;

  private firstBackground: Renderer;
  private secondBackground: Renderer;
  private canvasWidth: number;
  private canvasHeight: number;
  private x: number;
  private y: number;
  private shouldOut: boolean;
  private isOut: boolean;
  private shouldBeDisplayed: boolean;

  constructor(imagePath) {
    this.firstBackground = new Renderer(imagePath);
    this.secondBackground = new Renderer(imagePath);
    this.canvasWidth = this.firstBackground.canvasWidth;
    this.canvasHeight = this.firstBackground.canvasHeight;

    this.x = 0;
    this.y = 0;
    this.shouldOut = false;
    this.isOut = false;
    this.shouldBeDisplayed = false;
  }

  update() {
    if (this.isOut) {
      return;
    }

    this.in();
    this.circulateDown();
    this.checkIsOut();
  }

  render() {
    if (this.isOut) {
      return;
    }

    this.firstBackground.render(
      this.x,
      this.y,
      this.canvasWidth,
      this.canvasHeight,
    );
    this.secondBackground.render(
      this.x,
      this.y - this.canvasHeight,
      this.canvasWidth,
      this.canvasHeight,
    );
  }

  circulateDown() {
    this.y += this.firstBackground.inAndOutSpeed;

    if (this.y > this.canvasHeight && !this.shouldOut) {
      this.y = 0;
    }
  }

  in() {
    if (this.#isInStarted) {
      this.#isInStarted = false;
      this.y -= this.canvasHeight;
    }
  }

  checkIsOut() {
    if (this.y > this.canvasHeight * 2) {
      this.isOut = true;
    }
  }

  replay() {
    this.#isInStarted = false;
  }
}

export default Background;
