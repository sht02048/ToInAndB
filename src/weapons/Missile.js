import Renderer from "../graphics/Renderer";

class Missile extends Renderer {
  constructor(imagePath) {
    super(imagePath);

    this.isVanished = false;
    this.missileDamage = null;
    this.vx;
    this.vy;
    this.angle;
  }

  checkVanished() {
    if (
      this.x < this.minX ||
      this.x > this.maxX + 50 ||
      this.y < this.minY - 50 ||
      this.y > this.maxY
    ) {
      this.isVanished = true;
    }
  }

  playerStraight(missileSpeed) {
    this.y -= missileSpeed;
  }

  enemyStraight(missileSpeed) {
    this.y += missileSpeed;
  }

  enemyTargetMove() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

export default Missile;
