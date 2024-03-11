import Canvas from "../game/Canvas";
import Sprite from "../game/Sprite";

class BackgroundItem extends Canvas {
  #isComingIn = true;

  constructor({
    imagePath,
    isRight = false,
    gapModifier,
    heightModifier = 0,
    scaleModifier = false,
  }) {
    super("battle-field-canvas");

    this.gapModifier = gapModifier;
    this.heightModifier = heightModifier;

    this.sprite = new Sprite(imagePath);

    const scale = scaleModifier
      ? scaleModifier
      : this.canvas.width / this.sprite.width;

    this.width = this.sprite.width * scale;
    this.height = this.sprite.height * scale;
    this.x = isRight ? this.canvas.width - this.width : 0;
  }

  circulateDown() {
    if (this.#isComingIn) {
      this.in();

      return;
    }

    const gap = Math.ceil(this.height - this.canvas.height) + this.gapModifier;

    this.y += this.speed;

    if (this.y >= this.canvas.height + this.heightModifier) {
      this.y = 0;
    }

    this.ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.canvas.height,
    );
    this.ctx.drawImage(
      this.sprite,
      this.x,
      this.y - this.height + gap,
      this.width,
      this.canvas.height,
    );
  }

  in() {
    this.y += this.inAndOutSpeed;

    this.ctx.drawImage(
      this.sprite,
      this.x,
      this.y - this.canvas.height,
      this.width,
      this.canvas.height,
    );

    if (this.y > this.canvas.height) {
      this.#isComingIn = false;
    }
  }
}

export default BackgroundItem;
