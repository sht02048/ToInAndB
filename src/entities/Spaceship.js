import MODIFIER from "../constants/modifier";

class SpaceShip {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.isDestroyed = false;
    this.isVanished = false;
    this.isHit = false;
    this.healthPoint = health;
    this.hitFrame = 6 * MODIFIER.FRAME;
    this.frame = 0;
  }
}

export default SpaceShip;
