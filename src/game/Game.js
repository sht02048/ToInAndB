import Sound from "../utils/Sound";
import Intro from "../scenes/Intro";
import { SPRITE, AUDIO } from "../constants/path";
import Enemy from "../entities/enemies/Enemy";
import Background from "../scenes/Background";
import Player from "../entities/aircraft/Player";
import resizeCanvas from "../utils/resizeCanvas";
import DistanceCalculator from "../collisions/CollisionChecker";

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
    this.enemyHitList = [];
    this.enemyDestroyedList = [];

    this.introMusic = new Sound(AUDIO.INTRO);
    this.battleMusic = new Sound(AUDIO.BATTLE);

    this.enemy = new Enemy(this);
    this.player = new Player(this);

    this.distanceCalculator = new DistanceCalculator(this);

    this.intro = new Intro(this);
    this.block = new Background({
      game: this,
      imagePath: SPRITE.BLOCK,
    });
    this.plate = new Background({
      game: this,
      imagePath: SPRITE.PLATE,
    });

    this.enemy.spawn();
    this.enemy.spawn();
    this.enemy.spawn();
  }

  update() {
    this.distanceCalculator.checkHeavy();
    this.player.control();
    this.enemy.update();
    this.plate.circulateDown();
    this.block.circulateDown();
    this.player.attack();
  }

  render() {
    this.plate.render();
    this.block.render();
    this.enemy.render();
    this.player.render();
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
