import Player from "./Player";

import Sound from "../utils/Sound";
import Hallway from "../scenes/Hallway";
import Entrance from "../scenes/Entrance";
import Intro from "../graphics/Intro";
import Menu from "../graphics/Menu";
import LifeBoard from "../graphics/Life";
import Renderer from "../graphics/Renderer";
import Background from "../graphics/Background";
import { BACKGROUNDS } from "../constants/path";
import Lounge from "../scenes/Lounge";

class Game extends Renderer {
  #isMutedDuringPause = false;
  #isGameStarted = false;

  constructor() {
    super();

    const toggleIsPaused = this.toggleIsPaused.bind(this);
    const restart = this.restart.bind(this);

    this.intro = new Intro();
    this.block = new Background(BACKGROUNDS.BLOCK);
    this.plate = new Background(BACKGROUNDS.PLATE);
    this.lifeBoard = new LifeBoard();
    this.menu = new Menu(toggleIsPaused, restart);

    this.isPaused = false;
    this.backgroundScenes = [
      this.intro,
      this.plate,
      this.block,
      this.lifeBoard,
    ];

    this.setUpCombatScenes();
    this.setTargetList();
    this.handlePause();
  }

  update() {
    this.backgroundScenes.forEach((background, index) => {
      if (index === 0) {
        background.out();
        return;
      }

      background.update?.();
    });

    this.combatScenes.forEach((combat) => combat.update());
  }

  render() {
    this.backgroundScenes.forEach((background, index) => {
      if (index === 3) {
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

  setTargetList() {
    this.playerTargetList = this.entrance.setSceneTargetList();
    this.entrance.setTarget([this.player]);
    this.player.setTargetList(this.playerTargetList);
  }

  controlScene() {
    const isEntranceOver = this.entrance.checkSceneStatus();
    const isHallwayOver = this.hallWay?.checkSceneStatus();
    const isLoungeOver = this.lounge?.checkSceneStatus();

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
        this.combatScenes.push(this.lounge);

        if (Sound.isPlaying) {
          Sound.unmute();
        }
      }

      const loungeTarget = this.lounge.setSceneTargetList();
      this.player.setTargetList(loungeTarget);
      this.lounge.setTarget([this.player]);
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

  restart() {
    this.setUpCombatScenes();
    this.setTargetList();
    Sound.unmute();
  }
}

export default Game;
