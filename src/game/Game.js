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
  #leftBlockSize = 90;
  #rightBlockSize = 135;
  #PlayerAircraftHeight = 61;

  constructor() {
    resizeCanvas();
    this.backgroundCanvas = document.getElementById("battle-field-canvas");
    this.introCanvas = document.getElementById("intro-canvas");
    this.backgroundCtx = this.backgroundCanvas.getContext("2d");
    this.introCtx = this.introCanvas.getContext("2d");

    this.minX = this.#leftBlockSize;
    this.maxX = this.backgroundCanvas.width - this.#rightBlockSize;
    this.minY = -10;
    this.maxY = this.backgroundCanvas.height - this.#PlayerAircraftHeight + 5;
    this.inAndOutSpeed = 4;

    this.bulletList = [];
    this.enemyList = [];

    this.base = new BackgroundItem({
      game: this,
      imagePath: SPRITE_PATH.BASE,
      gapModifier: BASE_MODIFIER.GAP,
    });
    this.leftBlock = new BackgroundItem({
      game: this,
      imagePath: SPRITE_PATH.BLOCK_LEFT,
      gapModifier: BLOCK_MODIFIER.GAP,
      scaleModifier: BLOCK_MODIFIER.SCALE,
      heightModifier: BLOCK_MODIFIER.HEIGHT,
    });
    this.rightBlock = new BackgroundItem({
      game: this,
      imagePath: SPRITE_PATH.BLOCK_RIGHT,
      gapModifier: BLOCK_MODIFIER.GAP,
      scaleModifier: BLOCK_MODIFIER.SCALE,
      heightModifier: BLOCK_MODIFIER.HEIGHT,
      isRight: true,
    });
    this.plate = new BackgroundItem({
      game: this,
      imagePath: SPRITE_PATH.PLATE,
      gapModifier: PLATE_MODIFIER.GAP,
    });
    this.playAircraft = new PlayerAircraft(SPRITE_PATH, this);
    this.intro = new Intro(
      IMAGE_PATH.TITLE,
      IMAGE_PATH.INSTRUCTION_START,
      this,
    );
    this.introMusic = new Sound(AUDIO_PATH.INTRO);
    this.backgroundMusic = new Sound(AUDIO_PATH.BATTLE);
  }

  mockPlay() {
    this.backgroundCtx.clearRect(
      0,
      0,
      this.backgroundCanvas.width,
      this.backgroundCanvas.height,
    );

    this.plate.circulateDown();
    this.rightBlock.circulateDown();
    this.leftBlock.circulateDown();
    this.playAircraft.control();
    this.playAircraft.attack();

    requestAnimationFrame(() => this.mockPlay());
  }

  startGame() {
    this.backgroundCtx.clearRect(
      0,
      0,
      this.backgroundCanvas.width,
      this.backgroundCanvas.height,
    );
    this.introCtx.clearRect(
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
    this.introCtx.clearRect(
      0,
      0,
      this.introCanvas.width,
      this.introCanvas.height,
    );
    this.intro.float();

    this.setIntro = requestAnimationFrame(() => this.startIntro());
  }

  playBattleMusic() {
    this.introMusic.pauseAudio();
    this.backgroundMusic.playAudio();
  }

  playIntroMusic() {
    const muteToggle = document.getElementById("mute-toggle");

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
