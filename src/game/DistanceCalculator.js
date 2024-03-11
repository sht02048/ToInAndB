class DistanceCalculator {
  constructor(game) {
    this.game = game;
    this.bulletList = this.game.bulletList;
    this.heavyList = this.game.enemyList.heavy;
  }

  getHeavyDistance() {
    this.heavyList.forEach((heavy) => {
      const heavyLeft = heavy.x;
      const heavyRight = heavy.x + heavy.width;
      const heavyY = heavy.y + heavy.height;

      this.bulletList.forEach((bullet) => {
        if (bullet.isHitByEnemy) {
          return;
        }

        const bulletLeft = bullet.x;
        const bulletRight = bullet.x + bullet.width;
        const bulletY = bullet.y + bullet.height;

        if (
          heavyLeft < bulletRight &&
          heavyRight > bulletLeft &&
          heavyY >= bulletY
        ) {
          heavy.health -= bullet.damage;
          bullet.isHitByEnemy = true;
          console.log(heavy.health);
        }
      });
    });
  }
}

export default DistanceCalculator;
