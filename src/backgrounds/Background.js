import Sprite from "../game/Sprite";

class Background {
  #isInStarted = true;

  constructor({ game, imagePath }) {
    this.game = game;
    this.background = new Sprite(imagePath);
    this.x = 0;
    this.y = 0;
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
