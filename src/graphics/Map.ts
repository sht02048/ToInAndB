import Renderer from "./Renderer";
import Background from "./Background";

class Map extends Background {
  #isInStarted = true;

  private firstBackground: Renderer;
  private secondBackground: Renderer;
  public canvasWidth: number;
  public canvasHeight: number;
  private isOut: boolean;

  constructor(imagePath: string) {
    super();

    this.firstBackground = new Renderer(imagePath);
    this.secondBackground = new Renderer(imagePath);
    this.canvasWidth = this.firstBackground.canvasWidth;
    this.canvasHeight = this.firstBackground.canvasHeight;

    this.isOut = false;
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

export default Map;
