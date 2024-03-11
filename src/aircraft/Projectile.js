import Sprite from "../game/Sprite";

class Projectile {
  constructor(imagePath, game, subjectX, subjectY) {
    this.game = game;
    this.speed = 5;
    this.damage = 2;
    this.x;
    this.y;

    this.projectile = new Sprite(imagePath);
  }

  launch() {
    for (let i = 0; i < this.game, bulletList.length; i++) {
      const currentBullet = this.game.bulletList[i];

      if (currentBullet.y > currentBullet.game.minY) {
        currentBullet.y -= currentBullet.speed;

        this.game.backgroundCtx.drawImage(
          currentBullet.projectile,
          this.x,
          this.y,
        );
      }
    }
  }
}

export default Projectile;
