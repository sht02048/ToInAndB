import Player from "./Player";

import Hallway from "../scenes/Hallway";
import Entrance from "../scenes/Entrance";
import Intro from "../graphics/Intro";
import Paused from "../graphics/Paused";
import LifeBoard from "../graphics/Life";
import Renderer from "../graphics/Renderer";
import Background from "../graphics/Background";
import { BACKGROUNDS } from "../constants/path";

class Game extends Renderer {
  constructor() {
    super();

    this.isPaused = false;

    this.intro = new Intro();
    this.hallWay = new Hallway();
    this.block = new Background(BACKGROUNDS.BLOCK);
    this.plate = new Background(BACKGROUNDS.PLATE);
    this.lifeBoard = new LifeBoard();

    this.backgroundScenes = [
      this.intro,
      this.plate,
      this.block,
      this.lifeBoard,
    ];

    this.setUpCombatScenes();
    this.setTargetList();
    this.handlePause();

    const toggleIsPaused = this.toggleIsPaused.bind(this);
    const restart = this.restart.bind(this);
    this.paused = new Paused(toggleIsPaused, restart);
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
  }

  setUpCombatScenes() {
    this.combatScenes = [];
    this.player = new Player();
    this.entrance = new Entrance();

    this.combatScenes.push(this.player, this.entrance);
  }

  controlPause() {
    this.paused.update(this.isPaused);

    if (this.isPaused) {
      this.paused.render(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  setTargetList() {
    this.playerTargetList = this.entrance.setSceneTargetList();
    this.entrance.setTarget([this.player]);
    this.player.setTargetList(this.playerTargetList);
  }

  controlScene() {
    const isEntranceOver = this.entrance.checkSceneStatus();

    if (isEntranceOver && this.combatScenes.length === 2) {
      this.hallWay = new Hallway();
      const hallwayTarget = this.hallWay.setSceneTargetList();
      this.player.setTargetList(hallwayTarget);
      this.hallWay.setTarget([this.player]);
      this.combatScenes.push(this.hallWay);
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
    this.controlPause();

    this.playGame = requestAnimationFrame(() => this.play());
  }

  handleEvent() {
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        this.intro.playBattleMusic();
        this.play();

        removeEventListener("keydown", handleEnter);
      }
    };

    this.intro.playIntroMusic();
    addEventListener("keydown", handleEnter);
  }

  handlePause() {
    this.activatePause = (event) => {
      if (event.key === "Escape") {
        this.toggleIsPaused();
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
  }
}

export default Game;
