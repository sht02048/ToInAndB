class Enemy {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.isDestroyed = false;
    this.isVanished = false;
    this.isHit = false;
    this.healthPoint = health;
    this.hitFrame = 5;
    this.frame = 0;
  }
}

export default Enemy;
