import PowerUp from "../items/powerUp";
import Explosion from "../graphics/Explosion";
import Renderer from "../graphics/Renderer";
import CollisionDetector from "../physics/CollisionDetector";
import MissileLauncher from "../weapons/MissileLauncher";
import { SPRITE, ENEMY_PROJECTILE } from "../constants/path";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class Heavy {
  #heavyWidth = 44;
  #heavyHeight = 52;
  #missileWidth = 28;
  #missileHeight = 58;
  #missileSpeed = 1.5;
  #heavySpeed = 1;

  constructor(x, y) {
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

    this.x = x;
    this.y = y;
    this.isDestroyed = false;
    this.isVanished = false;
    this.isHit = false;
    this.healthPoint = 4;
    this.hitFrame = 5;
    this.frame = 0;
  }

  setSize() {
    this.width = this.ship.width;
    this.height = this.ship.height;
  }

  update() {
    this.collisionDetector.detectCollision();
    this.missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_GUIDED);

    if (this.isDestroyed || this.isVanished) {
      if (this.powerUp.isGained) {
        return;
      }

      this.updateItem();
      this.powerUp.setItemLocation(this.x, this.y);
      this.powerUp.detectItem();

      return;
    }

    if (this.frame % 100 === 0) {
      this.loadMissile();
    }

    this.y += this.#heavySpeed;

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

      this.powerUp.render(this.x, this.y);

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

    this.missileLauncher.loadMultipleAmmo(missileInformation);
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.powerUp.setTargetList(targetList);
  }

  updateItem() {
    this.x += this.powerUp.xSpeed;
    this.y += this.powerUp.ySpeed;

    if (
      this.x - this.powerUp.width > this.powerUp.maxX ||
      this.x < this.powerUp.minX
    ) {
      this.powerUp.xSpeed *= -1;
    }

    if (
      this.y - this.powerUp.height > this.powerUp.maxY ||
      this.y < this.powerUp.minY
    ) {
      this.powerUp.ySpeed *= -1;
    }
  }
}

export default Heavy;
