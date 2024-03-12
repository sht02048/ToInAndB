import Sprite from "../entities/Sprite";

class Background {
  #isInStarted = true;

  constructor({ game, imagePath }) {
    this.game = game;
    this.background = new Sprite(imagePath);
    this.x = 0;
    this.y = 0;
  }

  update() {
    // ACTIVATE 실제 작업 시 주석해제 필요
    // this.in();
    this.circulateDown();
  }

  circulateDown() {
    this.y += this.game.inAndOutSpeed;

    if (this.y > this.game.mainCanvas.height) {
      this.y = 0;
    }
  }

  in() {
    if (this.#isInStarted) {
      this.#isInStarted = false;
      this.y -= this.game.mainCanvas.height;
    }
  }

  render() {
    this.game.mainCtx.drawImage(
      this.background,
      this.x,
      this.y,
      this.game.mainCanvas.width,
      this.game.mainCanvas.height,
    );
    this.game.mainCtx.drawImage(
      this.background,
      this.x,
      this.y - this.game.mainCanvas.height,
      this.game.mainCanvas.width,
      this.game.mainCanvas.height,
    );
  }
}

export default Background;
