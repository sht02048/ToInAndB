import Sprite from "../game/Sprite";

class BackgroundItem {
  #isComingIn = true;

  constructor({
    game,
    imagePath,
    isRight = false,
    gapModifier,
    heightModifier = 0,
    scaleModifier = false,
  }) {
    this.game = game;
    this.gapModifier = gapModifier;
    this.heightModifier = heightModifier;
    this.x = 0;
    this.y = 0;
    this.speed = 2;

    this.sprite = new Sprite(imagePath);

    const scale = scaleModifier
      ? scaleModifier
      : this.game.backgroundCanvas.width / this.sprite.width;

    this.width = this.sprite.width * scale;
    this.height = this.sprite.height * scale;
    this.x = isRight ? this.game.backgroundCanvas.width - this.width : 0;
  }

  circulateDown() {
    if (this.#isComingIn) {
      this.in();

      return;
    }

    const gap =
      Math.ceil(this.height - this.game.backgroundCanvas.height) +
      this.gapModifier;

    this.y += this.speed;

    if (this.y >= this.game.backgroundCanvas.height + this.heightModifier) {
      this.y = 0;
    }

    this.game.backgroundCtx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.game.backgroundCanvas.height,
    );
    this.game.backgroundCtx.drawImage(
      this.sprite,
      this.x,
      this.y - this.height + gap,
      this.width,
      this.game.backgroundCanvas.height,
    );
  }

  in() {
    this.y += this.game.inAndOutSpeed;

    this.game.backgroundCtx.drawImage(
      this.sprite,
      this.x,
      this.y - this.game.backgroundCanvas.height,
      this.width,
      this.game.backgroundCanvas.height,
    );

    if (this.y > this.game.backgroundCanvas.height) {
      this.#isComingIn = false;
    }
  }
}

export default BackgroundItem;
