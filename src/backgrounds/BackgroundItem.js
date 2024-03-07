import Sprite from "../game/Sprite";
import BACKGROUND_SPEED from "../constants/speed";

class BackgroundItem extends Sprite {
  constructor({
    imagePath,
    isRight = false,
    gapModifier,
    heightModifier = 0,
    scaleModifier = false,
  }) {
    super(imagePath);

    this.gapModifier = gapModifier;
    this.heightModifier = heightModifier;

    this.sprite.onload = () => {
      const scale = scaleModifier
        ? scaleModifier
        : this.canvas.width / this.sprite.width;

      this.width = this.sprite.width * scale;
      this.height = this.sprite.height * scale;
      this.x = isRight ? this.canvas.width - this.width : 0;
    };
  }

  drop() {
    const gap = Math.ceil(this.height - this.canvas.height) + this.gapModifier;

    this.ctx.clearRect(this.x, 0, this.width, this.height);

    this.y += BACKGROUND_SPEED;

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

    requestAnimationFrame(() => this.drop());
  }
}

export default BackgroundItem;
