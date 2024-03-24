import "@fortawesome/fontawesome-free/js/all.js";

import Player from "./entities/Player";

import "./style.css";
import Sound from "./utils/Sound";
import resizeCanvas from "./utils/resizeCanvas";

import Intro from "./scenes/Intro";
import Outro from "./scenes/Outro";
import Lounge from "./scenes/Lounge";
import Hallway from "./scenes/Hallway";
import Entrance from "./scenes/Entrance";
import ThroneRoom from "./scenes/ThroneRoom";
import GuardChamber from "./scenes/GuardChamber";

import Menu from "./graphics/Menu";
import LifeBoard from "./graphics/Life";
import Renderer from "./graphics/Renderer";
import Background from "./graphics/Background";
import { BACKGROUNDS, PLATER } from "./constants/path";

class Game extends Renderer {
  #isMutedDuringPause = false;
  #isGameStarted = false;
  #isOutroDisplayed = false;
  #bossAppearanceFrame = 13 * 120;
  #endingFrame = 400;
  #hasEnteredSpace = false;

  constructor() {
    super();

    const toggleIsPaused = this.toggleIsPaused.bind(this);
    const restart = this.restart.bind(this);

    this.player = new Player();
    this.menu = new Menu(toggleIsPaused, restart);

    this.isPaused = false;

    this.setUpBackgroundScenes();
    this.setUpCombatScenes();
    this.setTargetList();
    this.handlePause();
    this.playIntro();
    this.handleEvent();
  }

  update() {
    this.backgroundScenes.forEach((background) => {
      if (!background.shouldBeDisplayed) {
        return;
      }

      if (background instanceof Intro) {
        background.out();
        return;
      }

      background.update?.();
    });

    this.combatScenes.forEach((combat) => {
      if (!combat.shouldBeDisplayed) {
        return;
      }

      combat.update();
    });

    this.player.update();
  }

  render() {
    this.backgroundScenes.forEach((background) => {
      if (!background.shouldBeDisplayed) {
        return;
      }

      if (Array.isArray(background?.healthList)) {
        background.render(this.player.healthPoint);
        return;
      }

      background.render();
    });

    this.combatScenes.forEach((combat) => {
      if (!combat.shouldBeDisplayed) {
        return;
      }

      combat.render();
    });

    this.player.render();

    if (this.isPaused || this.player.healthPoint === 0) {
      this.menu.render();
    }
  }

  setUpCombatScenes() {
    this.combatScenes = [];
    this.entrance = new Entrance();
    this.hallWay = new Hallway();
    this.lounge = new Lounge();
    this.guardChamber = new GuardChamber();
    this.throneRoom = new ThroneRoom();

    this.entrance.shouldBeDisplayed = true;

    this.combatScenes.push(
      this.entrance,
      this.hallWay,
      this.lounge,
      this.guardChamber,
      this.throneRoom,
    );
  }

  setUpBackgroundScenes(isReplay = false) {
    this.backgroundScenes = [];

    if (!isReplay) {
      this.intro = new Intro();
      this.intro.shouldBeDisplayed = true;
      this.backgroundScenes.push(this.intro);
    }

    this.block = new Background(BACKGROUNDS.BLOCK);
    this.plate = new Background(BACKGROUNDS.PLATE);
    this.base = new Background(BACKGROUNDS.BASE);
    this.space = new Background(BACKGROUNDS.SPACE_BOSS);
    this.lifeBoard = new LifeBoard();
    this.outro = new Outro();

    this.block.shouldBeDisplayed = true;
    this.plate.shouldBeDisplayed = true;

    this.backgroundScenes.push(
      this.plate,
      this.base,
      this.block,
      this.space,
      this.lifeBoard,
      this.outro,
    );
  }

  setTargetList() {
    this.playerTargetList = this.entrance.setSceneTargetList();
    this.entrance.setTarget([this.player]);
    this.player.setTargetList(this.playerTargetList);
  }

  controlScene() {
    const isEntranceOver = this.entrance.checkSceneStatus();
    const isHallwayOver = this.hallWay?.checkSceneStatus();
    const isLoungeOver = this.lounge?.checkSceneStatus();
    const isGuardChamberOver = this.guardChamber?.checkSceneStatus();
    const isThroneRoomOver = this.throneRoom?.checkSceneStatus();

    if (!isEntranceOver) {
      return;
    }

    if (isEntranceOver && !this.hallWay.hasStarted) {
      this.hallWay.shouldBeDisplayed = true;
      this.hallWay.hasStarted = true;
      this.hallWay.setTarget([this.player]);

      const hallwayTarget = this.hallWay.setSceneTargetList();
      this.player.setTargetList(hallwayTarget);

      return;
    }

    if (isHallwayOver && !isLoungeOver) {
      if (!this.lounge.hasStarted) {
        this.lounge.shouldBeDisplayed = true;
        this.lounge.hasStarted = true;
        this.base.shouldBeDisplayed = true;
        this.plate.shouldOut = true;
      }

      const loungeTarget = this.lounge.setSceneTargetList();
      this.player.setTargetList(loungeTarget);
      this.lounge.setTarget([this.player]);

      return;
    }

    if (isLoungeOver && !this.guardChamber.hasStarted) {
      this.guardChamber.shouldBeDisplayed = true;
      this.guardChamber.hasStarted = true;
      this.guardChamber.setTarget([this.player]);

      const guardChamberTarget = this.guardChamber.setSceneTargetList();
      this.player.setTargetList(guardChamberTarget);

      return;
    }

    if (isGuardChamberOver && this.#bossAppearanceFrame > 0) {
      if (this.#bossAppearanceFrame === 13 * 120) {
        this.throneRoom.boss.playBossAudio();
        this.intro.battleMusic.pauseAudio();
      }

      this.#bossAppearanceFrame -= 1;

      if (this.#hasEnteredSpace) {
        return;
      }

      this.space.shouldBeDisplayed = true;
      this.block.shouldOut = true;
      this.base.shouldOut = true;

      this.#hasEnteredSpace = true;

      return;
    }

    if (isGuardChamberOver) {
      if (!this.throneRoom.hasStarted) {
        this.throneRoom.shouldBeDisplayed = true;
        this.throneRoom.hasStarted = true;
      }

      const throneRoomTarget = this.throneRoom.setSceneTargetList();
      this.player.setTargetList(throneRoomTarget);
      this.throneRoom.setTarget([this.player]);
    }

    if (isThroneRoomOver && this.#endingFrame > 0) {
      this.throneRoom.boss.fadeOutAudio();
      this.#endingFrame -= 1;
      return;
    }

    if (isThroneRoomOver && !this.#isOutroDisplayed) {
      this.player.shouldOut = true;
      this.outro.shouldBeDisplayed = true;
      this.#isOutroDisplayed = true;
      this.space.shouldBeDisplayed = false;
    }
  }

  playIntro() {
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.intro.float();
    this.intro.render();

    requestAnimationFrame(() => this.playIntro());
  }

  play() {
    this.mainCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (!this.isPaused && !this.player.isDestroyed) {
      this.update();
    }

    this.render();
    this.controlScene();
    this.menu.update(this.isPaused, this.player.healthPoint);

    this.playGame = requestAnimationFrame(() => this.play());

    if (this.outro.isOut) {
      this.afterEnding();
    }
  }

  handleEvent() {
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        if (this.#isGameStarted && this.player.healthPoint === 0) {
          this.restart();
        }

        if (this.#isGameStarted) {
          return;
        }

        this.intro.playBattleMusic();
        this.play();
        this.#isGameStarted = true;
      }

      if (event.key === "m") {
        if (!Sound.hasIntroPlayed) {
          this.intro.introMusic.playAudio();
          Sound.hasIntroPlayed = true;
        }

        if (Sound.isPlaying) {
          Sound.mute();
          return;
        }

        Sound.unmute();
      }
    };

    this.intro.playIntroMusic();
    addEventListener("keydown", handleEnter);
  }

  handlePause() {
    this.activatePause = (event) => {
      if (event.key === "Escape") {
        this.toggleIsPaused();

        if (this.#isMutedDuringPause) {
          Sound.unmute();
          this.#isMutedDuringPause = false;
        }

        if (!this.isPaused) {
          return;
        }

        if (Sound.isPlaying) {
          Sound.mute();
          this.#isMutedDuringPause = true;
        }
      }
    };

    addEventListener("keydown", this.activatePause);
  }

  toggleIsPaused() {
    this.isPaused = !this.isPaused;
  }

  afterEnding() {
    cancelAnimationFrame(this.playGame);
    this.mainCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.#isGameStarted = false;
    this.playIntro();
  }

  restart() {
    this.setUpBackgroundScenes(true);
    this.setUpCombatScenes();
    this.player = new Player();
    this.setTargetList();
    this.base.shouldBeDisplayed = false;
    this.space.shouldBeDisplayed = false;
    this.outro.shouldBeDisplayed = false;
    this.plate.replay();
    this.block.replay();
    this.lounge = null;
    this.guardChamber = null;
    this.throneRoom = null;

    if (Sound.isPlaying) {
      Sound.unmute();
    }
  }
}

resizeCanvas();
new Game();
