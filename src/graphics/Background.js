import Renderer from "./Renderer";

class Background {
  #isInStarted = true;
  #isOut = false;

  constructor(imagePath) {
    this.firstBackground = new Renderer(imagePath);
    this.secondBackground = new Renderer(imagePath);
    this.canvasWidth = this.firstBackground.canvasWidth;
    this.canvasHeight = this.firstBackground.canvasHeight;
    this.x = 0;
    this.y = 0;

    this.shouldOut = false;
  }

  update() {
    if (this.#isOut) {
      return;
    }

    // ACTIVATE 실제 작업 시 주석해제 필요
    this.in();
    this.circulateDown(this.shouldOut);
  }

  circulateDown() {
    this.y += this.firstBackground.inAndOutSpeed;

    if (this.y > this.canvasHeight && !this.shouldOut) {
      this.y = 0;
    }
  }

  alertOut() {
    this.shouldOut = true;
  }

  in() {
    if (this.#isInStarted) {
      this.#isInStarted = false;
      this.y -= this.canvasHeight;
    }
  }

  render() {
    if (this.#isOut) {
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
}

export default Background;
