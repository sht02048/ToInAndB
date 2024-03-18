import Player from "./Player";

import Intro from "../graphics/Intro";
import Entrance from "../scenes/Entrance";
import Hallway from "../scenes/Hallway";
import Renderer from "../graphics/Renderer";
import { BACKGROUNDS } from "../constants/path";
import Background from "../graphics/Background";

class Game extends Renderer {
  #isHallwayStarted = false;

  constructor() {
    super();
    this.player = new Player(this);
    this.intro = new Intro(this);
    this.block = new Background(BACKGROUNDS.BLOCK);
    this.plate = new Background(BACKGROUNDS.PLATE);
    this.entrance = new Entrance();
    this.hallWay = new Hallway();
    this.combat();
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

    this.update();
    this.render();
    this.controlScene();

    this.playGame = requestAnimationFrame(() => this.play());
  }

  handleEvent() {
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        this.intro.playBattleMusic();
        // ACTIVATE 실제 작업 시 주석해제 및 하단 this.player.addEvent 삭제 필요
        this.play();

        removeEventListener("keydown", handleEnter);
      }
    };

    this.intro.playIntroMusic();
    addEventListener("keydown", handleEnter);
  }

  endGame() {
    cancelAnimationFrame(this.playGame);
    this.mainCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.introCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  resetGameState() {
    this.intro.playBattleMusic();
    this.play();
  }
}

export default Game;
