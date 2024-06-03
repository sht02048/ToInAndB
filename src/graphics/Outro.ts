import Sound from "../utils/Sound";
import Renderer from "./Renderer";

import FPS from "../constants/fps";
import { IMAGE, AUDIO } from "../constants/path";

class Outro {
  #fps = FPS;
  #outSpeed = 1;
  #titleWidth = 795;
  #messageWidth = 772;
  #haltFrame = 16 * this.#fps;
  #hasMusicStarted = false;

  private title: Renderer;
  private message: Renderer;
  private outroMusic: Sound;
  private canvasWidth: number;
  private x: number;
  private y: number;

  public isOut: boolean;
  public shouldBeDisplayed: boolean;

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
