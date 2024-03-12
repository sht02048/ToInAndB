import EnemyBase from "./EnemyBase";

import Sprite from "../Sprite";

import { SPRITE } from "../../constants/path";
import Explosion from "../../collisions/Explosion";

class Heavy extends EnemyBase {
  constructor(game) {
    super(game);

    this.explosion = new Explosion(game);
    this.ship = new Sprite(SPRITE.ENEMY_HEAVY);
    this.destroyedShip = new Sprite(SPRITE.ENEMY_HEAVY_DESTROYED);

    this.game = game;
    this.heavyList = this.game.enemyList.heavy;

    this.health = 5;
    this.speed = 1;

    this.ship.onload = () => {
      this.width = this.ship.width * 1.2;
      this.height = this.ship.height * 1.2;
    };
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
      if (heavy.isDestroyed) {
        this.explosion.destroy(heavy);
        return;
      }

      if (heavy.isHit) {
        this.explosion.hit(heavy, this.destroyedShip);
        heavy.hitFrame += 1;

        if (heavy.hitFrame === 5) {
          heavy.hitFrame = 0;
          heavy.isHit = false;
        }

        return;
      }

      this.game.mainCtx.drawImage(
        heavy.ship,
        heavy.x,
        heavy.y,
        heavy.width,
        heavy.height,
      );
    });
  }
}

export default Heavy;
