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

    this.player = new Player(this);
    this.intro = new Intro(this);
    this.paused = new Paused();
    this.entrance = new Entrance();
    this.hallWay = new Hallway();
    this.block = new Background(BACKGROUNDS.BLOCK);
    this.plate = new Background(BACKGROUNDS.PLATE);

    this.combat();
    this.handlePause();
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
    this.player.render();
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
      this.hallWay.render();

      this.#isHallwayStarted = true;
    }
  }

  setUp() {
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.intro.float();
    this.intro.render();

    requestAnimationFrame(() => this.setUp());
  }

  play() {
    this.mainCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (!this.isPaused) {
      this.update();
    }

    this.render();
    this.controlScene();

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
    // TODO should pause when replay the game
    this.activatePause = (event) => {
      if (event.key === "Escape") {
        this.pause();
      }
    };

    addEventListener("keydown", this.activatePause);
  }

  pause() {
    if (!this.isPaused) {
      this.paused.render(0, 0, this.canvasWidth, this.canvasHeight);
    }

    this.isPaused = true;

    const endGame = this.endGame.bind(this);
    const handleIsPaused = this.handleIsPaused.bind(this);

    this.paused.handleEvent(endGame, handleIsPaused);
  }

  handleIsPaused() {
    this.isPaused = false;
  }

  endGame() {
    cancelAnimationFrame(this.playGame);
    this.mainCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  resetGameState() {
    removeEventListener("keydown", this.activatePause);
    this.intro.playBattleMusic();
    this.play();
  }
}

export default Game;
