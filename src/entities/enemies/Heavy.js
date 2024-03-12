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
  }

  update() {
    this.heavyList.forEach((heavy) => {
      const bulletList = heavy.bulletList;

      bulletList.forEach((bullet) => {
        if (bullet.didHit) {
          return;
        }

        bullet.y += bullet.speed + this.speed;
      });

      if (heavy.isDestroyed || heavy.y > this.game.mainCanvas.height) {
        clearInterval(heavy.straightInterval);
        return;
      }

      heavy.y += this.speed;
    });
  }

  render() {
    this.heavyList.forEach((heavy) => {
      const bulletList = heavy.bulletList;

      bulletList.forEach((bullet) => {
        if (bullet.didHit) {
          return;
        }

        this.game.mainCtx.drawImage(
          bullet.projectile,
          bullet.x,
          bullet.y + 10,
          bullet.width / 2,
          bullet.height / 2,
        );
      });

      if (heavy.isDestroyed || heavy.y > this.game.mainCanvas.height) {
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

  spawn() {
    this.heavyList.push(this);
    this.startAttack();
  }

  startAttack() {
    if (this.isStraightLaunched) {
      return;
    }

    this.straightInterval = setInterval(() => {
      this.launchStraightProjectile(this.x, this.y);
    }, 1000);

    this.isStraightLaunched = true;
  }
}

export default Heavy;
