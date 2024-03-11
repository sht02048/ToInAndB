import Sprite from "../game/Sprite";

class Projectile {
  constructor(imagePath) {
    this.projectile = new Sprite(imagePath);

    this.speed = 5;
    this.damage = 2;
    this.x;
    this.y;
    this.width = this.projectile.width;
  }
}

export default Projectile;
