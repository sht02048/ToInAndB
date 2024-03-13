import Sound from "../utils/Sound";
import Sprite from "../entities/Sprite";
import { IMAGE, AUDIO } from "../constants/path";

class Intro {
  #floatSpeed = 0.1;

  constructor(game) {
    this.game = game;

    this.title = new Sprite(IMAGE.TITLE);
    this.instruction = new Sprite(IMAGE.INSTRUCTION_START);

    this.x = this.game.introCanvas.width / 2;
    this.instructionY = this.game.introCanvas.height - 150;
    this.titleY = 100;

    this.isUp = true;
    this.amplitude = 0;

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

  playIntroMusic() {
    const muteToggle = document.getElementById("mute-toggle");

    muteToggle.addEventListener("mousedown", (event) => {
      event.preventDefault();

      this.introMusic.playAudio();
      Sound.toggleSound(muteToggle);
    });
  }

  playBattleMusic() {
    this.introMusic.pauseAudio();
    this.battleMusic.playAudio();
  }
}

export default Intro;
