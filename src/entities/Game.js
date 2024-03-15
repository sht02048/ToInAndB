import Intro from "../scenes/Intro";
import { SPRITE } from "../constants/path";
import Background from "../scenes/Background";
import Player from "./Player";
import Heavy from "./Heavy";
import Renderer from "../graphics/Renderer";

class Game extends Renderer {
  constructor() {
    super();
    this.player = new Player(this);
    this.intro = new Intro(this);
    this.block = new Background(SPRITE.BLOCK);
    this.plate = new Background(SPRITE.PLATE);
    this.heavy = new Heavy(200, 0);

    this.combat();
  }

  combat() {
    this.player.setTargetList([this.heavy]);
    this.heavy.setTargetList([this.player]);
  }

  update() {
    this.intro.out();
    this.plate.update();
    this.block.update();
    this.player.update();
    this.heavy.update();
  }

  render() {
    this.intro.render();
    this.plate.render();
    this.block.render();
    this.heavy.render();
    this.player.render();
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

    requestAnimationFrame(() => this.play());
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
}

export default Game;
