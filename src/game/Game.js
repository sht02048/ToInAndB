import Intro from "../scenes/Intro";
import { SPRITE } from "../constants/path";
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
    this.intro.out();
    this.distanceCalculator.checkHeavy();
    this.player.update();
    this.enemy.update();
    this.plate.update();
    this.block.update();
  }

  render() {
    this.intro.render();
    this.plate.render();
    this.block.render();
    this.enemy.render();
    this.player.render();
  }

  setUp() {
    this.introCtx.clearRect(
      0,
      0,
      this.introCanvas.width,
      this.introCanvas.height,
    );

    this.intro.float();
    this.intro.render();

    requestAnimationFrame(() => this.setUp());
  }

  play() {
    this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.introCtx.clearRect(
      0,
      0,
      this.introCanvas.width,
      this.introCanvas.height,
    );

    this.update();
    this.render();

    requestAnimationFrame(() => this.play());
  }

  handleEvent() {
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        this.intro.playBattleMusic();
        this.play();
        this.player.addEvent();

        removeEventListener("keydown", handleEnter);
      }
    };

    this.intro.playIntroMusic();
    addEventListener("keydown", handleEnter);
  }
}

export default Game;
