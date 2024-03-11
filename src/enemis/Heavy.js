import Sprite from "../game/Sprite";
import { SPRITE_PATH } from "../constants/path";
import { ENEMY_PROJECTILE_PATH } from "../constants/path";

class Heavy {
  constructor(game) {
    this.ship = new Sprite(SPRITE_PATH.ENEMY_HEAVY);

    this.game = game;

    const min = Math.ceil(this.game.minX);
    const max = Math.floor(this.game.maxX);

    this.randomPosition = Math.floor(Math.random() * (max - min)) + min;
    this.health = 5;
    this.x = this.randomPosition;
    this.y = 0;
    this.speed = 1.5;
    this.ship.onload = () => {
      this.width = this.ship.width;
      this.height = this.ship.height;
    };
    this.heavyList = this.game.enemyList.heavy;
  }

  spawn() {
    this.heavyList.push(this);
  }

  update() {
    this.heavyList.forEach((heavy) => {
      heavy.y += this.speed;
    });
  }

  render() {
    this.heavyList.forEach((heavy) => {
      this.game.mainCtx.drawImage(
        heavy.ship,
        heavy.x,
        heavy.y,
        heavy.width * 1.2,
        heavy.height * 1.2,
      );
    });
  }
}

export default Heavy;
