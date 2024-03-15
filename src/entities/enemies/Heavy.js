import CollisionDetector from "../parts/CollisionDetector";
import MissileLauncher from "../parts/MissileLauncher";

import Explosion from "../../collisions/Explosion";
import Renderer from "../../game/Renderer";
import { SPRITE, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Heavy {
  #heavyWidth = 44;
  #heavyHeight = 52;
  #missileWidth = 20;
  #missileHeight = 58;
  #missileSpeed = 1;
  #heavySpeed = 1;

  constructor(x, y) {
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
    this.missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY);

    if (this.isDestroyed || this.isVanished) {
      return;
    }

    if (this.frame % 500 === 0) {
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
      projectilePath: ENEMY_PROJECTILE.NORMAL,
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
  }
}

export default Heavy;
