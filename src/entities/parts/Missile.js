import Renderer from "../../game/Renderer";

class Missile extends Renderer {
  constructor(imagePath, width, height) {
    super(imagePath, width, height);

    this.isVanished = false;
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
