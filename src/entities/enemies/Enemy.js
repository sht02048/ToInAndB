import SpaceShip from "../Spaceship";

import Explosion from "../../graphics/Explosion";
import Renderer from "../../graphics/Renderer";
import CollisionDetector from "../../physics/CollisionDetector";
import MissileLauncher from "../../weapons/MissileLauncher";

class Enemy extends SpaceShip {
  constructor({
    x,
    y,
    health,
    shipImage,
    hitShipImage,
    projectileImage,
    width,
    height,
  }) {
    super(x, y, health);

    this.explosion = new Explosion();
    this.ship = new Renderer(shipImage);
    this.hitShip = new Renderer(hitShipImage);
    this.missileLauncher = new MissileLauncher(width, height);
    this.collisionDetector = new CollisionDetector(
      this.missileLauncher.missileList,
    );

    this.width = width;
    this.height = height;
    this.projectile = projectileImage;
  }

  updateEnemy(launchMissile, setRoute, command, updateItem = this.noop) {
    this.collisionDetector.detectCollision();
    this.missileLauncher.setMissileRoute(command);

    if (this.isDestroyed || this.isVanished) {
      updateItem();
      return;
    }

    launchMissile();
    setRoute();
    this.checkShipStatus();

    this.frame += 1;
  }

  renderEnemy(renderItem = this.noop) {
    this.missileLauncher.render();

    if (this.isDestroyed) {
      this.explosion.destroy(this.x, this.y, this.width);

      renderItem();

      return;
    }

    if (this.isVanished) {
      return;
    }

    if (this.isHit) {
      this.renderHit();
      return;
    }

    this.ship.render(this.x, this.y);
  }

  renderHit() {
    this.hitFrame -= 1;
    this.hitShip.render(this.x, this.y);

    if (this.hitFrame === 0) {
      this.isHit = false;
      this.hitFrame = 5;
    }
  }

  checkShipStatus() {
    if (this.healthPoint <= 0) {
      this.isDestroyed = true;
    }

    if (
      this.y - this.height > this.ship.maxY ||
      this.x > this.ship.canvasWidth ||
      this.x < 0
    ) {
      this.isVanished = true;
    }
  }

  loadSingleMissile(missileInformation) {
    this.missileLauncher.loadSingleAmmo(missileInformation);
  }

  loadMultipleMissile(missileInformation) {
    this.missileLauncher.loadMultipleAmmo(missileInformation);
  }

  setMissileInformation({
    projectilePath,
    x = this.x,
    y = this.y,
    missileWidth,
    missileSpeed,
    isAimed = false,
    shouldTilt = false,
  }) {
    const missileInformation = {
      projectilePath,
      x,
      y,
      missileWidth,
      missileSpeed,
      isAimed,
      shouldTilt,
    };

    return missileInformation;
  }

  noop() {
    return;
  }
}

export default Enemy;
