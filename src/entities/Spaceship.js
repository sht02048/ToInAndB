import MODIFIER from "../constants/modifier";

import Explosion from "../graphics/Explosion";
import MissileLauncher from "../weapons/MissileLauncher";
import CollisionDetector from "../physics/CollisionDetector";

class SpaceShip {
  constructor({ x, y, width, height, health, isBoss = false }) {
    this.x = x;
    this.y = y;
    this.isDestroyed = false;
    this.isVanished = false;
    this.isHit = false;
    this.healthPoint = health;
    this.hitFrame = 6 * MODIFIER.FRAME;
    this.frame = 0;

    this.explosion = new Explosion(isBoss);
    this.missileLauncher = new MissileLauncher(width, height);
    this.collisionDetector = new CollisionDetector(
      this.missileLauncher.missileList,
    );
  }

  setMissileInformation({
    projectilePath,
    x = this.x,
    y = this.y + this.width,
    missileWidth,
    missileSpeed,
    missileDamage,
    isAimed = false,
    shouldTilt = false,
  }) {
    const missileInformation = {
      projectilePath,
      x,
      y,
      missileWidth,
      missileSpeed,
      missileDamage,
      isAimed,
      shouldTilt,
    };

    return missileInformation;
  }

  noop() {
    return;
  }
}

export default SpaceShip;
