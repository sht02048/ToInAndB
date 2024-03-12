import Explosion from "./Explosion";

class CollisionChecker {
  constructor(game) {
    this.game = game;
    this.bulletList = this.game.bulletList;
    this.heavyList = this.game.enemyList.heavy;
    this.enemyHitList = this.game.enemyHitList;

    this.explosion = new Explosion(game);
  }

  checkHeavy() {
    this.heavyList.forEach((heavy) => {
      if (heavy.isDestroyed) {
        return;
      }

      const heavyLeft = heavy.x;
      const heavyRight = heavy.x + heavy.width;
      const heavyTop = heavy.y;
      const heavyBottom = heavy.y + heavy.height;

      this.bulletList.forEach((bullet) => {
        if (bullet.didHitEnemy) {
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
          heavy.health -= bullet.damage;
          heavy.hitNumber += 1;
          heavy.isHit = true;
          bullet.didHitEnemy = true;

          if (heavy.health <= 0) {
            heavy.isDestroyed = true;
            return;
          }
        }
      });
    });
  }
}

export default CollisionChecker;
