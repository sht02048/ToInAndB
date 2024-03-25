import Sound from "../utils/Sound";
import { IMAGE, AUDIO } from "../constants/path";
import Renderer from "../graphics/Renderer";
import MODIFIER from "../constants/modifier";

class Outro {
  #fps = MODIFIER.SPEED === 1 ? 120 : 60;
  #outSpeed = 1 * MODIFIER.SPEED;
  #titleWidth = 795;
  #messageWidth = 772;
  #haltFrame = 15.5 * this.#fps;
  #hasMusicStarted = false;

  constructor() {
    this.title = new Renderer(IMAGE.OUTRO_TITLE);
    this.message = new Renderer(IMAGE.OUTRO_MESSAGE);

    this.outroMusic = new Sound(AUDIO.OUTRO);

    this.canvasWidth = this.title.canvasWidth;

    this.x = this.canvasWidth / 2;
    this.y = 0;

    this.isOut = false;
    this.shouldBeDisplayed = false;
  }

  update() {
    if (this.y + this.title.height + this.message.height + 600 < 0) {
      this.isOut = true;
    }

    if (!this.#hasMusicStarted) {
      this.playOutroMusic();
    }

    if (this.#haltFrame > 0) {
      this.#haltFrame -= 1;
      return;
    }

    this.y -= this.#outSpeed;
  }

  render() {
    this.title.render(this.x - this.#titleWidth / 2, this.y + 100);
    this.message.render(this.x - this.#messageWidth / 2, this.y + 400);
  }

  playOutroMusic() {
    this.outroMusic.playAudio();
    this.#hasMusicStarted = true;
  }

  pauseOutroMusic() {
    this.outroMusic.pauseAudio();
  }
}

export default Outro;
