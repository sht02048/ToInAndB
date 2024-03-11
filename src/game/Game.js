import Intro from "./Intro";
import Enemy from "../enemis/Enemy";
import Player from "../aircraft/Player";
import DistanceCalculator from "./DistanceCalculator";
import resizeCanvas from "./resizeCanvas";
import Background from "../backgrounds/Background";
import { SPRITE_PATH } from "../constants/path";

class Game {
  #leftBlockSize = 100;
  #rightBlockSize = 145;
  #PlayerAircraftHeight = 61;

  constructor() {
    resizeCanvas();
    this.mainCanvas = document.getElementById("main-canvas");
    this.introCanvas = document.getElementById("intro-canvas");
    this.mainCtx = this.mainCanvas.getContext("2d");
    this.introCtx = this.introCanvas.getContext("2d");

    this.minX = this.#leftBlockSize;
    this.maxX = this.mainCanvas.width - this.#rightBlockSize;
    this.minY = -10;
    this.maxY = this.mainCanvas.height - this.#PlayerAircraftHeight + 5;
    this.inAndOutSpeed = 4;

    this.bulletList = [];
    this.enemyList = {
      heavy: [],
    };

    this.intro = new Intro(this);
    this.enemy = new Enemy(this);
    this.player = new Player(this);
    this.distanceCalculator = new DistanceCalculator(this);
    this.block = new Background({
      game: this,
      imagePath: SPRITE_PATH.BLOCK,
    });
    this.plate = new Background({
      game: this,
      imagePath: SPRITE_PATH.PLATE,
    });

    this.enemy.spawn();
    this.enemy.spawn();
    this.enemy.spawn();
  }

  update() {
    this.distanceCalculator.getHeavyDistance();
    this.player.control();
    this.enemy.update();
    this.plate.circulateDown();
    this.block.circulateDown();
    this.player.attack();
  }

  render() {
    this.plate.render();
    this.block.render();
    this.player.render();
    this.enemy.render();
  }

  play() {
    this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.update();
    this.render();

    requestAnimationFrame(() => this.play());
  }

  handleEvent() {
    this.player.addEvent();
  }
}

export default Game;
