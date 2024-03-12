import Sprite from "../entities/Sprite";

class Projectile {
  constructor(imagePath) {
    this.projectile = new Sprite(imagePath);

    this.speed = 5;
    this.damage = 2;
    this.didHit = false;
    this.x;
    this.y;

    this.width = this.projectile.width;
    this.height = this.projectile.height;
  }
}

export default Projectile;
