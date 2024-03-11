import Sprite from "./Sprite";
import { IMAGE_PATH } from "../constants/path";

class Intro {
  #floatSpeed = 0.1;

  constructor(game) {
    this.game = game;
    this.x = this.game.introCanvas.width / 2;
    this.titleY = 100;
    this.instructionY = this.game.introCanvas.height - 150;
    this.title = new Sprite(IMAGE_PATH.TITLE);
    this.instruction = new Sprite(IMAGE_PATH.INSTRUCTION_START);
    this.isUp = true;
    this.amplitude = 0;
  }

  float() {
    if (this.isUp) {
      this.instructionY += this.#floatSpeed;
    } else {
      this.instructionY -= this.#floatSpeed;
    }

    this.amplitude += 1;

    if (this.amplitude === 100) {
      this.amplitude = 0;
      this.isUp = !this.isUp;
    }
  }

  out() {
    this.titleY += this.game.inAndOutSpeed;
    this.instructionY += this.game.inAndOutSpeed;
  }

  render() {
    this.game.introCtx.drawImage(
      this.title,
      this.x - this.title.width / 4,
      this.titleY,
      this.title.width / 2,
      this.title.height / 2,
    );

    this.game.introCtx.drawImage(
      this.instruction,
      this.x - this.instruction.width / 4,
      this.instructionY,
      this.instruction.width / 2,
      this.instruction.height / 2,
    );
  }
}

export default Intro;
