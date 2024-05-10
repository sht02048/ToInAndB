import Sound from "../utils/Sound";
import { IMAGE, AUDIO } from "../constants/path";
import Renderer from "../graphics/Renderer";

class Intro {
  #floatSpeed = 0.1;
  #titleWidth = 1158;
  #titleHeight = 951;
  #instructionWidth = 934;
  #instructionHeight = 53;

  private title: Renderer;
  private instruction: Renderer;
  private introMusic: Sound;
  private battleMusic: Sound;
  private canvasWidth: number;
  private canvasHeight: number;
  private inAndOutSpeed: number;
  private x: number;
  private instructionY: number;
  private titleY: number;
  private isUp: boolean;
  private amplitude: number;
  private shouldBeDisplayed: boolean;

  constructor() {
    this.title = new Renderer(IMAGE.TITLE);
    this.instruction = new Renderer(IMAGE.INSTRUCTION_START);

    this.canvasWidth = this.title.canvasWidth;
    this.canvasHeight = this.title.canvasHeight;
    this.inAndOutSpeed = this.title.inAndOutSpeed;

    this.x = this.canvasWidth / 2;
    this.instructionY = this.canvasHeight - 150;
    this.titleY = 100;

    this.isUp = true;
    this.amplitude = 0;
    this.shouldBeDisplayed = false;

    this.introMusic = new Sound(AUDIO.INTRO);
    this.battleMusic = new Sound(AUDIO.BATTLE);
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
    this.titleY += this.inAndOutSpeed;
    this.instructionY += this.inAndOutSpeed;
  }

  render() {
    this.title.renderIntro(
      this.x - this.#titleWidth / 4,
      this.titleY,
      this.#titleWidth / 2,
      this.#titleHeight / 2,
    );
    this.instruction.renderIntro(
      this.x - this.#instructionWidth / 4,
      this.instructionY,
      this.#instructionWidth / 2,
      this.#instructionHeight / 2,
    );
  }

  playIntroMusic() {
    const muteToggle = document.getElementById("mute-toggle");

    muteToggle.addEventListener("mousedown", (event) => {
      event.preventDefault();

      if (!Sound.hasIntroPlayed) {
        this.introMusic.playAudio();
        Sound.hasIntroPlayed = true;
      }

      if (Sound.isPlaying) {
        Sound.mute();
      } else {
        Sound.unmute();
      }
    });
  }

  playBattleMusic() {
    this.introMusic.pauseAudio();
    this.battleMusic.playAudio();
  }
}

export default Intro;
