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

    this.health = 4;
    this.speed = 1;

    this.ship.onload = () => {
      this.width = this.ship.width * 1.2;
      this.height = this.ship.height * 1.2;
    };

    this.heavyList.push(this);
  }

  update() {
    this.launchedGuided(this);
    this.updateBullet(this);

    if (this.isDestroyed || this.y > this.game.mainCanvas.height) {
      this.isDestroyed = true;
      return;
    }

    this.y += this.speed;
  }

  render() {
    this.renderBullet(this);

    if (this.isDestroyed || this.y > this.game.mainCanvas.height) {
      this.explosion.destroy(this);
      return;
    }

    if (this.isHit) {
      this.explosion.hit(this, this.destroyedShip);
      this.hitFrame += 1;

      if (this.hitFrame === 5) {
        this.hitFrame = 0;
        this.isHit = false;
      }

      return;
    }

    this.game.mainCtx.drawImage(
      this.ship,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export default Heavy;
