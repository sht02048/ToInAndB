import "@fortawesome/fontawesome-free/js/all.js";

import "./style.css";
import Player from "./entities/Player";

import Sound from "./utils/Sound";
import DisplayOptimizer from "./utils/DisplayOptimizer";

import Intro from "./scenes/Intro";
import Outro from "./scenes/Outro";
import Lounge from "./scenes/Lounge";
import Hallway from "./scenes/Hallway";
import Entrance from "./scenes/Entrance";
import ThroneRoom from "./scenes/ThroneRoom";
import GuardChamber from "./scenes/GuardChamber";

import Menu from "./graphics/Menu";
import Renderer from "./graphics/Renderer";
import LifeBoard from "./graphics/LifeBoard";
import Background from "./graphics/Background";

import FPS from "./constants/fps";
import { BACKGROUNDS } from "./constants/path";

class Game extends Renderer {
  #fps = FPS;
  #isMutedDuringPause = false;
  #isGameStarted = false;
  #isOutroDisplayed = false;
  #bossAppearanceFrame = 13.5 * this.#fps;
  #hasBossMusicStarted = false;
  #endingFrame = 400;
  #hasEnteredSpace = false;

  constructor() {
    super();

    this.isPaused = false;

    this.start();
    this.handlePause();
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

      if (background instanceof LifeBoard) {
        background.render(this.player.healthPoint);
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
      if (this.#hasBossMusicStarted) {
        this.throneRoom.boss.playBossAudio();
        this.intro.battleMusic.pauseAudio();
      }

      this.#bossAppearanceFrame -= 1;

      if (this.#hasEnteredSpace) {
        return;
      }

      this.#hasBossMusicStarted = true;
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
      this.#isOutroDisplayed = true;
      this.outro.shouldBeDisplayed = true;
      this.space.shouldBeDisplayed = false;
      this.throneRoom.shouldBeDisplayed = false;
      this.lifeBoard.shouldBeDisplayed = false;
    }
  }

  displayIntro() {
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.intro.float();
    this.intro.render();
  }

  startIntro() {
    this.playIntro = setInterval(() => this.displayIntro(), 1000 / 120);
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

    if (this.outro.isOut) {
      this.afterEnding();
    }
  }

  startPlay() {
    this.playGame = setInterval(() => this.play(), 1000 / 120);
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

        clearInterval(this.playIntro);
        this.intro.playBattleMusic();
        this.startPlay();
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
    this.outro.pauseOutroMusic();
    clearInterval(this.playGame);
    this.mainCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.#isGameStarted = false;
    this.start();
  }

  start(isReplay = false) {
    const toggleIsPaused = this.toggleIsPaused.bind(this);
    const restart = this.restart.bind(this);

    this.primarySetup();

    this.menu = new Menu(toggleIsPaused, restart);

    this.setUpBackgroundScenes(isReplay);
    this.startIntro();
  }

  restart() {
    if (this.throneRoom.boss.hasBackgroundMusicPlayed) {
      this.throneRoom.boss.backgroundMusic.pauseAudio();
      this.intro.battleMusic.isPaused = false;
      this.intro.battleMusic.playAudio();
    }

    this.primarySetup();

    this.outro.pauseOutroMusic();
    this.setUpBackgroundScenes(true);
    this.plate.replay();
    this.block.replay();
  }

  primarySetup() {
    this.#isOutroDisplayed = false;
    this.#bossAppearanceFrame = 13.5 * this.#fps;
    this.#endingFrame = 400;
    this.#hasEnteredSpace = false;
    this.#hasBossMusicStarted = false;

    this.player = new Player();

    this.setUpCombatScenes();
    this.setTargetList();
  }
}

DisplayOptimizer.preloadImages();
DisplayOptimizer.resize();
new Game();
