import Canvas from "./Canvas";
import Sprite from "./Sprite";

class Intro extends Canvas {
  #floatSpeed = 0.1;

  constructor(titlePath, instructionPath) {
    super("intro-canvas");

    this.x = this.canvas.width / 2;
    this.title = new Sprite(titlePath);
    this.instruction = new Sprite(instructionPath);
    this.isUp = true;
    this.amplitude = 0;
  }

  float() {
    if (this.isUp) {
      this.y += this.#floatSpeed;
    } else {
      this.y -= this.#floatSpeed;
    }

    this.amplitude += 1;

    if (this.amplitude === 100) {
      this.amplitude = 0;
      this.isUp = !this.isUp;
    }

    this.ctx.drawImage(
      this.title,
      this.x - this.title.width / 4,
      100,
      this.title.width / 2,
      this.title.height / 2,
    );

    this.ctx.drawImage(
      this.instruction,
      this.x - this.instruction.width / 4,
      this.y + this.canvas.height - 150,
      this.instruction.width / 2,
      this.instruction.height / 2,
    );
  }

  out() {
    this.y += this.inAndOutSpeed;

    this.ctx.drawImage(
      this.title,
      this.x - this.title.width / 4,
      this.y + 100,
      this.title.width / 2,
      this.title.height / 2,
    );

    this.ctx.drawImage(
      this.instruction,
      this.x - this.instruction.width / 4,
      this.y + this.canvas.height - 150,
      this.instruction.width / 2,
      this.instruction.height / 2,
    );
  }
}

export default Intro;
