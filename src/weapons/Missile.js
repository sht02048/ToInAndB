import Renderer from "../graphics/Renderer";

class Missile extends Renderer {
  constructor(imagePath) {
    super(imagePath);

    this.isLockedOn = false;
    this.isVanished = false;
    this.damage;
    this.vx;
    this.vy;
    this.angle;
  }

  #checkVanished() {
    if (
      this.x < -100 ||
      this.x > this.canvasWidth ||
      this.y < this.minY - 40 ||
      this.y > this.maxY + 40
    ) {
      this.isVanished = true;
    }
  }

  playerStraight(missileSpeed) {
    this.y -= missileSpeed;
    this.#checkVanished();
  }

  enemyStraight(missileSpeed) {
    this.y += missileSpeed;
    this.#checkVanished();
  }

  enemyTargetMove() {
    this.x += this.vx;
    this.y += this.vy;
    this.#checkVanished();
  }
}

export default Missile;
