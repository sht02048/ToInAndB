import { ENEMY_PROJECTILE } from "../../constants/path";
import Projectile from "../../collisions/Projectile";

class EnemyBase {
  constructor(game) {
    this.game = game;
    this.bulletList = [];

    const min = Math.ceil(this.game.minX);
    const max = Math.floor(this.game.maxX);

    this.randomPosition = Math.floor(Math.random() * (max - min)) + min;
    this.x = this.randomPosition;
    this.y = 0;
    this.hitFrame = 0;
    this.isHit = false;
    this.explosionFrame = 0;
    this.isDestroyed = false;
    this.isStraightLaunched = false;
  }

  launchStraightProjectile(x, y) {
    const straightBullet = new Projectile(ENEMY_PROJECTILE.NORMAL);
    straightBullet.x = x;
    straightBullet.y = y + 50;
    straightBullet.speed = 5;

    this.bulletList.push(straightBullet);
  }
}

export default EnemyBase;
