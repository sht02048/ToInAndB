import Intro from "./Intro";
import Sound from "./Sound";
import resizeCanvas from "./resizeCanvas";

import PlayerAircraft from "../aircraft/PlayerAircraft";
import BackgroundItem from "../backgrounds/BackgroundItem";
import { SPRITE_PATH, IMAGE_PATH, AUDIO_PATH } from "../constants/path";
import {
  BASE_MODIFIER,
  BLOCK_MODIFIER,
  PLATE_MODIFIER,
} from "../constants/modifier";

class Game {
  constructor() {
    resizeCanvas();

    this.backgroundCanvas = document.getElementById("battle-field-canvas");
    this.introCanvas = document.getElementById("intro-canvas");
    this.backgroundCtx = this.backgroundCanvas.getContext("2d");
    this.introCanvasCtx = this.introCanvas.getContext("2d");

    this.base = new BackgroundItem({
      imagePath: SPRITE_PATH.BASE,
      gapModifier: BASE_MODIFIER.GAP,
    });
    this.leftBlock = new BackgroundItem({
      imagePath: SPRITE_PATH.BLOCK_LEFT,
      gapModifier: BLOCK_MODIFIER.GAP,
      scaleModifier: BLOCK_MODIFIER.SCALE,
      heightModifier: BLOCK_MODIFIER.HEIGHT,
    });
    this.rightBlock = new BackgroundItem({
      imagePath: SPRITE_PATH.BLOCK_RIGHT,
      gapModifier: BLOCK_MODIFIER.GAP,
      scaleModifier: BLOCK_MODIFIER.SCALE,
      heightModifier: BLOCK_MODIFIER.HEIGHT,
      isRight: true,
    });
    this.plate = new BackgroundItem({
      imagePath: SPRITE_PATH.PLATE,
      gapModifier: PLATE_MODIFIER.GAP,
    });
    this.playAircraft = new PlayerAircraft(SPRITE_PATH);
    this.intro = new Intro(IMAGE_PATH.TITLE, IMAGE_PATH.INSTRUCTION_START);
  }

  startGame() {
    this.backgroundCtx.clearRect(
      0,
      0,
      this.backgroundCanvas.width,
      this.backgroundCanvas.height,
    );
    this.introCanvasCtx.clearRect(
      0,
      0,
      this.introCanvas.width,
      this.introCanvas.height,
    );

    this.intro.out();
    this.plate.circulateDown();
    this.rightBlock.circulateDown();
    this.leftBlock.circulateDown();
    this.playAircraft.control();
    this.playAircraft.attack();

    requestAnimationFrame(() => this.startGame());
  }

  startIntro() {
    this.introCanvasCtx.clearRect(
      0,
      0,
      this.introCanvas.width,
      this.introCanvas.height,
    );
    this.intro.float();

    this.setIntro = requestAnimationFrame(() => this.startIntro());
  }

  playBattleMusic() {
    this.backgroundMusic = new Sound(AUDIO_PATH.BATTLE);
    this.introMusic.pauseAudio();
    this.backgroundMusic.playAudio();
  }

  playIntroMusic() {
    const muteToggle = document.getElementById("mute-toggle");

    this.introMusic = new Sound(AUDIO_PATH.INTRO);

    muteToggle.addEventListener("click", () => {
      this.introMusic.playAudio();
      Sound.toggleSound(muteToggle);
    });
  }

  inAndOut() {
    this.intro.out();
    this.plate.in();
    this.leftBlock.in();
    this.rightBlock.in();
  }
}

export default Game;
