import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Bot extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 2;
  #missileInterval = 80;
  #botInSpeed = 2;
  #botOutSpeed = 0.5;
  #hasReachedPoint = false;

  private isLeft: boolean;

  constructor({ x, y, isLeft }) {
    super({
      x,
      y,
      health: 12,
      shipImage: ENEMIES.BOT,
      hitShipImage: ENEMIES.BOT_HIT,
      width: 48,
      height: 29,
    });

    this.isLeft = isLeft;
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.updateEnemy(
      launchMissile,
      setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
    );
  }

  render(): void {
    this.renderEnemy();
  }

  launchMissile(): void {
    if (this.frame % this.#missileInterval !== 0) {
      return;
    }

    const guidedMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: true,
    });

    this.missileLauncher.loadSingleMissile(guidedMissile);
  }

  setRoute(): void {
    if (this.y < this.ship.canvasHeight / 10) {
      this.#hasReachedPoint = true;
    }

    if (!this.#hasReachedPoint) {
      this.y -= this.#botInSpeed;
      return;
    }

    if (this.isLeft) {
      this.x -= Math.sqrt(8) * this.#botOutSpeed;
      this.y += Math.sqrt(2) * this.#botOutSpeed;

      return;
    }

    this.x += Math.sqrt(8) * this.#botOutSpeed;
    this.y += Math.sqrt(2) * this.#botOutSpeed;
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }

  markDestroyed() {
    this.isDestroyed = true;
    this.shouldMakeExplosionSound = false;
  }
}

export default Bot;
