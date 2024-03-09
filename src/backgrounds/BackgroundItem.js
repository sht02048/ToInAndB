import Canvas from "../game/Canvas";
import Sprite from "../game/Sprite";

class BackgroundItem extends Canvas {
  constructor({
    imagePath,
    isRight = false,
    gapModifier,
    heightModifier = 0,
    scaleModifier = false,
  }) {
    super("background-canvas");

    this.gapModifier = gapModifier;
    this.heightModifier = heightModifier;

    this.sprite = new Sprite(imagePath);

    this.sprite.onload = () => {
      const scale = scaleModifier
        ? scaleModifier
        : this.canvas.width / this.sprite.width;

      this.width = this.sprite.width * scale;
      this.height = this.sprite.height * scale;
      this.x = isRight ? this.canvas.width - this.width : 0;
    };
  }

  circulateDown() {
    const gap = Math.ceil(this.height - this.canvas.height) + this.gapModifier;

    this.ctx.clearRect(this.x, 0, this.width, this.height);

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

    requestAnimationFrame(() => this.circulateDown());
  }

  in() {
    this.ctx.clearRect(this.x, 0, this.width, this.height);

    this.y += this.inAndOutSpeed;

    this.ctx.drawImage(
      this.sprite,
      this.x,
      this.y - this.canvas.height,
      this.width,
      this.canvas.height,
    );

    const backgroundAppear = requestAnimationFrame(() => this.in());

    if (this.y > this.canvas.height) {
      this.circulateDown();

      cancelAnimationFrame(backgroundAppear);
    }
  }
}

export default BackgroundItem;
