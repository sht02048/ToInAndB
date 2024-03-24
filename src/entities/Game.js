import Player from "./Player";

import Sound from "../utils/Sound";
import Lounge from "../scenes/Lounge";
import Hallway from "../scenes/Hallway";
import Entrance from "../scenes/Entrance";
import ThroneRoom from "../scenes/ThroneRoom";
import GuardChamber from "../scenes/GuardChamber";
import Intro from "../graphics/Intro";
import Menu from "../graphics/Menu";
import LifeBoard from "../graphics/Life";
import Renderer from "../graphics/Renderer";
import Background from "../graphics/Background";
import { BACKGROUNDS } from "../constants/path";
import Outro from "../scenes/Outro";

class Game extends Renderer {
  #isMutedDuringPause = false;
  #isGameStarted = false;
  #isOutroDisplayed = false;
  #bossAppearanceFrame = 300;
  #endingFrame = 300;
  #hasEnteredSpace = false;

  constructor() {
    super();

    const toggleIsPaused = this.toggleIsPaused.bind(this);
    const restart = this.restart.bind(this);

    this.menu = new Menu(toggleIsPaused, restart);

    this.isPaused = false;

    this.setUpBackgroundScenes();
    this.setUpCombatScenes();
    this.setTargetList();
    this.handlePause();
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

    this.combatScenes.forEach((combat) => combat.update());
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

    this.combatScenes.forEach((combat) => combat.render());

    if (this.isPaused || this.player.healthPoint === 0) {
      this.menu.render();
    }
  }

  setUpCombatScenes() {
    this.combatScenes = [];
    this.player = new Player();
    this.entrance = new Entrance();

    this.combatScenes.push(this.player, this.entrance);
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

    if (isEntranceOver && this.combatScenes.length === 2) {
      this.hallWay = new Hallway();

      const hallwayTarget = this.hallWay.setSceneTargetList();
      this.player.setTargetList(hallwayTarget);
      this.hallWay.setTarget([this.player]);

      this.combatScenes.push(this.hallWay);

      if (Sound.isPlaying) {
        Sound.unmute();
      }

      return;
    }

    if (isHallwayOver && !isLoungeOver && this.combatScenes.length > 2) {
      if (this.combatScenes.length === 3) {
        this.lounge = new Lounge();

        this.base.shouldBeDisplayed = true;
        this.plate.shouldOut = true;

        this.combatScenes.push(this.lounge);
      }

      const loungeTarget = this.lounge.setSceneTargetList();
      this.player.setTargetList(loungeTarget);
      this.lounge.setTarget([this.player]);

      return;
    }

    if (isLoungeOver && this.combatScenes.length === 4) {
      this.guardChamber = new GuardChamber();
      this.combatScenes.push(this.guardChamber);

      const guardChamberTarget = this.guardChamber.setSceneTargetList();
      this.player.setTargetList(guardChamberTarget);
      this.guardChamber.setTarget([this.player]);

      return;
    }

    if (isGuardChamberOver && this.#bossAppearanceFrame > 0) {
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

    if (isGuardChamberOver && this.combatScenes.length > 4) {
      if (this.combatScenes.length === 5) {
        this.throneRoom = new ThroneRoom();
        this.combatScenes.push(this.throneRoom);
      }

      const throneRoomTarget = this.throneRoom.setSceneTargetList();
      this.player.setTargetList(throneRoomTarget);
      this.throneRoom.setTarget([this.player]);
    }

    if (isThroneRoomOver && this.#endingFrame > 0) {
      this.#endingFrame -= 1;
      return;
    }

    if (isThroneRoomOver && !this.#isOutroDisplayed) {
      this.player.shouldOut = true;

      if (this.player.isOut) {
        this.space.shouldOut = true;
      }

      if (this.space.isOut) {
        this.outro.shouldBeDisplayed = true;
        this.#isOutroDisplayed = true;
        this.intro.battleMusic.pauseAudio();
      }
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

export default Game;
