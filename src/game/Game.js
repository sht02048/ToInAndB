import Intro from "./Intro";
import resizeCanvas from "./resizeCanvas";
import Background from "../backgrounds/Background";
import { SPRITE_PATH } from "../constants/path";

class Game {
  constructor() {
    resizeCanvas();
    this.mainCanvas = document.getElementById("main-canvas");
    this.introCanvas = document.getElementById("intro-canvas");
    this.mainCtx = this.mainCanvas.getContext("2d");
    this.introCtx = this.introCanvas.getContext("2d");

    this.inAndOutSpeed = 4;

    this.intro = new Intro(this);
    this.block = new Background({
      game: this,
      imagePath: SPRITE_PATH.BLOCK,
    });
    this.plate = new Background({
      game: this,
      imagePath: SPRITE_PATH.PLATE,
    });
  }

  update() {
    this.plate.in();
    this.block.in();
    this.plate.circulateDown();
    this.block.circulateDown();
  }

  render() {
    this.plate.render();
    this.block.render();
  }

  play() {
    this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.update();
    this.render();

    requestAnimationFrame(() => this.play());
  }
}

export default Game;
