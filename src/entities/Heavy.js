import Enemy from "./Enemy";

import PowerUp from "../items/powerUp";
import Explosion from "../graphics/Explosion";
import Renderer from "../graphics/Renderer";
import CollisionDetector from "../physics/CollisionDetector";
import MissileLauncher from "../weapons/MissileLauncher";
import { SPRITE, ENEMY_PROJECTILE } from "../constants/path";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class Heavy extends Enemy {
  #heavyWidth = 44;
  #heavyHeight = 52;
  #missileWidth = 25;
  #missileSpeed = 1.5;
  #heavySpeed = 1;
  #missileInterval = 100;

  constructor(x, y) {
    super(x, y, 4);

    this.powerUp = new PowerUp();
    this.explosion = new Explosion();
    this.ship = new Renderer(SPRITE.ENEMY_HEAVY);
    this.destroyedShip = new Renderer(SPRITE.ENEMY_HEAVY_DESTROYED);
    this.missileLauncher = new MissileLauncher(
      this.#heavyWidth,
      this.#heavyHeight,
    );
    this.collisionDetector = new CollisionDetector(
      this.missileLauncher.missileList,
    );

    this.itemX;
    this.itemY;
  }

  setSize() {
    this.width = this.ship.width;
    this.height = this.ship.height;
  }

  update() {
    this.collisionDetector.detectCollision();
    this.missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT);

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
      this.loadMissile();
    }

    this.y += this.#heavySpeed;
    this.itemX = this.x;
    this.itemY = this.y;

    this.setSize();
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

  loadMissile() {
    const missileInformation = {
      projectilePath: ENEMY_PROJECTILE.GUIDED,
      x: this.x,
      y: this.y,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
    };

    this.missileLauncher.loadSingleAmmo(missileInformation);
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.powerUp.setTargetList(targetList);
  }

  updateItem() {
    this.itemX += this.powerUp.xSpeed;
    this.itemY += this.powerUp.ySpeed;

    if (
      this.itemX - this.powerUp.width > this.powerUp.maxX ||
      this.itemY < this.powerUp.minX
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
}

export default Heavy;
