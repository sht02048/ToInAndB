import Renderer from "./Renderer";

class Background {
  #isInStarted = true;

  constructor(imagePath) {
    this.background1 = new Renderer(imagePath);
    this.background2 = new Renderer(imagePath);
    this.canvasWidth = this.background1.canvasWidth;
    this.canvasHeight = this.background1.canvasHeight;
    this.x = 0;
    this.y = 0;
  }

  update() {
    // ACTIVATE 실제 작업 시 주석해제 필요
    // this.in();
    this.circulateDown();
  }

  circulateDown() {
    this.y += this.background1.inAndOutSpeed;

    if (this.y > this.canvasHeight) {
      this.y = 0;
    }
  }

  in() {
    if (this.#isInStarted) {
      this.#isInStarted = false;
      this.y -= this.canvasHeight;
    }
  }

  render() {
    this.background1.render(
      this.x,
      this.y,
      this.canvasWidth,
      this.canvasHeight,
    );
    this.background2.render(
      this.x,
      this.y - this.canvasHeight,
      this.canvasWidth,
      this.canvasHeight,
    );
  }
}

export default Background;
