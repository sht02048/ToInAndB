import Player from "../aircraft/Player";

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
    this.isHit = false;
    this.hitFrame = 0;
    this.explosionFrame = 0;
    this.isDestroyed = false;
    this.isStraightLaunched = false;
    this.frame = 0;
  }

  load(enemy, bulletType) {
    const enemyBullet = new Projectile(ENEMY_PROJECTILE.NORMAL);
    const shipCenter = enemy.x + enemy.width / 2 - enemyBullet.width / 2;

    enemyBullet.x = shipCenter;
    enemyBullet.y = enemy.y + 50;
    enemyBullet.speed = 5;
    enemyBullet.width /= 2;
    enemyBullet.height /= 2;

    return enemyBullet;
  }

  launchStraight(enemy) {
    console.log(enemy);
    if (this.frame % 120 === 0 && !enemy.isDestroyed) {
      const straightBullet = this.load(enemy);
      straightBullet.type = "STRAIGHT";

      this.bulletList.push(straightBullet);
    }
  }

  launchAimed(enemy) {
    if (this.frame % 60 === 0 && !enemy.isDestroyed) {
      const aimedBullet = this.load(enemy);
      aimedBullet.type = "AIMED";

      const dx = Player.x - aimedBullet.x;
      const dy = Player.y - aimedBullet.y;
      const magnitude = Math.sqrt(dx ** 2 + dy ** 2);
      const normalizedDx = dx / magnitude;
      const normalizedDy = dy / magnitude;

      aimedBullet.vx = normalizedDx * aimedBullet.speed;
      aimedBullet.vy = normalizedDy * aimedBullet.speed;

      this.bulletList.push(aimedBullet);
      console.log(this.bulletList);
    }
  }

  launchedGuided(enemy) {
    if (this.frame % 60 === 0 && !enemy.isDestroyed) {
      const aimedBullet = this.load(enemy);
      aimedBullet.type = "GUIDED";
      aimedBullet.speed = 1;

      this.bulletList.push(aimedBullet);
    }
  }

  launchAllWay(enemy) {
    if (this.frame % 100 !== 0 || enemy.isDestroyed) {
      return;
    }

    const projectileNumber = 40;
    const radiansPerProjectile = (Math.PI * 2) / projectileNumber;

    for (let i = 0; i < projectileNumber; i += 1) {
      const angle = radiansPerProjectile * i;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const speed = 1;

      const allWayBullet = this.load(enemy);
      allWayBullet.type = "ALLWAY";
      allWayBullet.vx = dx * speed;
      allWayBullet.vy = dy * speed;

      this.bulletList.push(allWayBullet);
    }
  }

  updateBullet(enemy) {
    this.frame += 1;
    this.bulletList.forEach((bullet) => {
      if (bullet.didHit) {
        return;
      }

      switch (bullet.type) {
        case "STRAIGHT":
          this.updateStraight(bullet);
          break;
        case "AIMED":
          this.updateAimed(bullet);
          break;
        case "GUIDED":
          this.updatedGuided(bullet);
        case "ALLWAY":
          this.updateAimed(bullet);
      }
    });
  }

  updateStraight(bullet) {
    bullet.y += bullet.speed;
  }

  updateAimed(bullet) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
  }

  updatedGuided(bullet) {
    if (bullet.frame < 120) {
      const dx = Player.x - bullet.x;
      const dy = Player.y - bullet.y;
      const magnitude = Math.sqrt(dx ** 2 + dy ** 2);
      const normalizedDx = dx / magnitude;
      const normalizedDy = dy / magnitude;

      bullet.vx = normalizedDx * bullet.speed;
      bullet.vy = normalizedDy * bullet.speed;

      bullet.angle = Math.atan2(dy, dx) - Math.PI / 2;

      bullet.frame += 1;
    }

    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
  }

  renderBullet(enemy) {
    this.bulletList.forEach((bullet) => {
      if (bullet.didHit) {
        return;
      }

      this.renderGuided(enemy, bullet);
    });
  }

  renderAimed(bullet) {}

  renderStraight(enemy, bullet) {
    if (bullet.isHit) {
      return;
    }

    this.game.mainCtx.drawImage(
      bullet.projectile,
      bullet.x,
      bullet.y + 10,
      bullet.width,
      bullet.height,
    );
  }

  renderGuided(enemy, bullet) {
    if (bullet.isHit) {
      return;
    }

    const ctx = this.game.mainCtx;
    ctx.save();
    ctx.translate(bullet.x, bullet.y + 10);
    ctx.rotate(bullet.angle);
    ctx.drawImage(
      bullet.projectile,
      -bullet.width / 2,
      -bullet.height,
      bullet.width,
      bullet.height,
    );
    ctx.restore();
  }
}

export default EnemyBase;
