import SpaceShip from "./Spaceship";

import Explosion from "../graphics/Explosion";
import Renderer from "../graphics/Renderer";
import CollisionDetector from "../physics/CollisionDetector";
import MissileLauncher from "../weapons/MissileLauncher";

class Enemy extends SpaceShip {
  constructor({
    x,
    y,
    health,
    shipImage,
    destroyedShipImage,
    projectileImage,
    width,
    height,
  }) {
    super(x, y, health);

    this.explosion = new Explosion();
    this.ship = new Renderer(shipImage);
    this.destroyedShip = new Renderer(destroyedShipImage);
    this.missileLauncher = new MissileLauncher(width, height);
    this.collisionDetector = new CollisionDetector(
      this.missileLauncher.missileList,
    );

    this.width = width;
    this.height = height;
    this.projectile = projectileImage;
  }

  renderHit() {
    this.hitFrame -= 1;
    this.de;
  }

  renderHit() {
    this.hitFrame -= 1;
    this.destroyedShip.render(this.x, this.y);

    if (this.hitFrame === 0) {
      this.isHit = false;
    }
  }

  checkShipStatus() {
    if (this.healthPoint <= 0) {
      this.isDestroyed = true;
    }

    if (this.y > this.ship.maxY) {
      this.isVanished = true;
    }
  }

  loadSingleMissile(missileInformation) {
    this.missileLauncher.loadSingleAmmo(missileInformation);
  }

  loadMultipleMissile(missileInformation) {
    this.missileLauncher.loadMultipleAmmo(missileInformation);
  }
}

export default Enemy;
