import Canvas from "../game/Canvas";
import Sprite from "../game/Sprite";

class Projectile extends Canvas {
  constructor(imagePath) {
    super("battle-field-canvas");

    this.speed += 6;
    this.damage = 2;
    this.projectileX;
    this.projectileY;

    this.projectile = new Sprite(imagePath);
  }

  launch(subjectX, subjectY) {
    this.x = subjectX;
    this.y = subjectY;

    this.x += this.speed;
    this.y += this.speed;

    this.ctx.drawImage(
      this.projectile,
      this.x,
      this.y - 100,
      this.projectile.width,
      this.projectile.height,
    );
  }
}

export default Projectile;
