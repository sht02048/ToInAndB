import Explosion from "./Explosion";
import Player from "../entities/aircraft/Player";

class CollisionChecker {
  constructor(game) {
    this.game = game;

    this.enemyList = this.game.enemyList;
    this.playerBulletList = this.game.playerBulletList;
    this.enemyBulletList = this.game.enemyBulletList;

    this.explosion = new Explosion(game);
  }

  update() {
    this.checkEnemy(this.enemyList.heavy);
  }

  checkEnemy(enemyList) {
    enemyList.forEach((enemy) => {
      if (enemy.isDestroyed) {
        return;
      }

      enemy.bulletList.forEach((bullet) => {
        if (bullet.didHit) {
          return;
        }

        const playerLeft = Player.x;
        const playerRight = Player.x + Player.width;
        const playerTop = Player.y;
        const playerBottom = Player.y + Player.height;

        const bulletLeft = bullet.x;
        const bulletRight = bullet.x + bullet.width;
        const bulletBottom = bullet.y + bullet.height - 20;

        if (
          playerLeft <= bulletRight &&
          playerRight >= bulletLeft &&
          playerTop <= bulletBottom &&
          playerBottom >= bulletBottom
        ) {
          bullet.didHit = true;
        }
      });

      const heavyLeft = enemy.x;
      const heavyRight = enemy.x + enemy.width;
      const heavyTop = enemy.y;
      const heavyBottom = enemy.y + enemy.height;

      this.playerBulletList.forEach((bullet) => {
        if (bullet.didHit) {
          return;
        }

        const bulletLeft = bullet.x;
        const bulletRight = bullet.x + bullet.width;
        const bulletTop = bullet.y;

        if (
          heavyLeft < bulletRight &&
          heavyRight > bulletLeft &&
          heavyTop <= bulletTop &&
          heavyBottom >= bulletTop
        ) {
          enemy.health -= bullet.damage;
          enemy.isHit = true;
          bullet.didHit = true;

          if (enemy.health <= 0) {
            enemy.isDestroyed = true;
            return;
          }
        }
      });
    });
  }
}

export default CollisionChecker;
