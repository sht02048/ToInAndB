import Enemy from "./Enemy";

import PowerUp from "../items/powerUp";
import { SPRITE, ENEMY_PROJECTILE } from "../constants/path";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class Heavy extends Enemy {
  #missileWidth = 25;
  #missileSpeed = 2.5;
  #heavySpeed = 1;
  #missileInterval = 100;

  constructor(x, y) {
    super({
      x,
      y,
      health: 4,
      shipImage: SPRITE.ENEMY_HEAVY,
      destroyedShipImage: SPRITE.ENEMY_HEAVY_DESTROYED,
      width: 44,
      height: 52,
    });

    this.powerUp = new PowerUp();

    this.itemX;
    this.itemY;
  }

  update() {
    this.collisionDetector.detectCollision();
    this.missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_AIMED);

    if (this.isDestroyed || this.isVanished) {
      if (this.powerUp.isGained) {
        return;
      }

      this.updateItem();
      this.powerUp.setItemLocation(this.itemX, this.itemY);
      this.powerUp.detectItem();

      return;
    }

    if (this.frame % this.#missileInterval === 0) {
      const missileInformation = this.setMissileInformation();

      this.loadSingleMissile(missileInformation);
    }

    this.y += this.#heavySpeed;
    this.itemX = this.x;
    this.itemY = this.y;

    this.checkShipStatus();

    this.frame += 1;
  }

  render() {
    this.missileLauncher.render();

    if (this.isDestroyed) {
      this.explosion.destroy(this.x, this.y, this.width);

      if (this.powerUp.isGained) {
        return;
      }

      this.powerUp.render(this.itemX, this.itemY);

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

  updateItem() {
    this.itemX += this.powerUp.xSpeed;
    this.itemY += this.powerUp.ySpeed;

    if (
      this.itemX - this.powerUp.width > this.powerUp.maxX ||
      this.itemX < this.powerUp.minX
    ) {
      this.powerUp.xSpeed *= -1;
    }

    if (
      this.itemY - this.powerUp.height > this.powerUp.maxY ||
      this.itemY < this.powerUp.minY
    ) {
      this.powerUp.ySpeed *= -1;
    }
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.powerUp.setTargetList(targetList);
  }

  setMissileInformation() {
    const missileInformation = {
      projectilePath: ENEMY_PROJECTILE.AIMED,
      x: this.x,
      y: this.y,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: true,
    };

    return missileInformation;
  }
}

export default Heavy;
