import Renderer from "../../game/Renderer";

class Missile extends Renderer {
  constructor(imagePath) {
    super(imagePath);

    this.isVanished = false;
    this.missileDamage = null;
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

  launchStraight(missileSpeed) {
    this.y -= missileSpeed;
  }
}

export default Missile;
