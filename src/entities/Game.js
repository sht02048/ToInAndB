import Player from "./Player";

import Hallway from "../scenes/Hallway";
import Entrance from "../scenes/Entrance";
import Intro from "../graphics/Intro";
import Paused from "../graphics/Paused";
import Renderer from "../graphics/Renderer";
import Background from "../graphics/Background";
import { BACKGROUNDS } from "../constants/path";

class Game extends Renderer {
  #isHallwayStarted = false;

  constructor() {
    super();

    this.isPaused = false;

    this.player = new Player();
    this.intro = new Intro(this);
    this.entrance = new Entrance();
    this.hallWay = new Hallway();
    this.block = new Background(BACKGROUNDS.BLOCK);
    this.plate = new Background(BACKGROUNDS.PLATE);

    this.combat();
    this.handlePause();

    const endGame = this.endGame.bind(this);
    const toggleIsPaused = this.toggleIsPaused.bind(this);

    this.paused = new Paused(endGame, toggleIsPaused);
  }

  update() {
    this.intro.out();
    this.plate.update();
    this.block.update();
    this.entrance.update();
    this.player.update();
  }

  render() {
    this.intro.render();
    this.plate.render();
    this.block.render();
    this.entrance.render();
    this.hallWay.render();
    this.player.render();
  }

  controlPause() {
    this.paused.update(this.isPaused);

    if (this.isPaused) {
      this.paused.render(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  combat() {
    this.playerTargetList = this.entrance.setSceneTargetList();
    this.hallWay.setTarget([this.player]);
    this.entrance.setTarget([this.player]);
    this.player.setTargetList(this.playerTargetList);
  }

  controlScene() {
    if (this.entrance.checkSceneStatus()) {
      if (!this.#isHallwayStarted) {
        const hallwayTarget = this.hallWay.setSceneTargetList();
        this.player.setTargetList(hallwayTarget);
        this.#isHallwayStarted = true;
      }

      this.hallWay.update();

      this.#isHallwayStarted = true;
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
      this.controlScene();
    }

    this.render();
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
    const toggleIsPaused = this.toggleIsPaused.bind(this);

    this.activatePause = (event) => {
      if (event.key === "Escape") {
        toggleIsPaused();
      }
    };

    addEventListener("keydown", this.activatePause);
  }

  toggleIsPaused() {
    this.isPaused = !this.isPaused;
  }

  endGame() {
    cancelAnimationFrame(this.playGame);
    removeEventListener("keydown", this.activatePause);
    this.mainCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  resetGameState() {
    this.intro.playBattleMusic();
    this.play();
  }
}

export default Game;
