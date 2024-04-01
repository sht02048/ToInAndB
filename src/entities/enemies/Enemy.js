import SpaceShip from "../Spaceship";

import Explosion from "../../graphics/Explosion";
import Renderer from "../../graphics/Renderer";

import MODIFIER from "../../constants/modifier";
import MissileLauncher from "../../weapons/MissileLauncher";
import CollisionDetector from "../../physics/CollisionDetector";

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
    isBoss = false,
  }) {
    super({
      x,
      y,
      width,
      height,
      health,
      isBoss,
    });

    this.explosion = new Explosion(isBoss);
    this.ship = new Renderer(shipImage);
    this.hitShip = new Renderer(hitShipImage);
    this.missileLauncher = new MissileLauncher(width, height);
    this.collisionDetector = new CollisionDetector(
      this.missileLauncher.missileList,
    );

    this.makeExplosionSound = true;
    this.width = width;
    this.height = height;
    this.projectile = projectileImage;
    this.isBoss = isBoss;
  }

  updateEnemy(launchMissile, setRoute, command, updateItem = this.noop) {
    if (!this.isBoss || (this.isBoss && !this.isDestroyed)) {
      this.collisionDetector.detectCollision();
    }

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
      this.explosion.render(
        this.x,
        this.y,
        this.width,
        this.makeExplosionSound,
      );

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
      this.hitFrame = 6 * MODIFIER.FRAME;
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
}

export default Enemy;
