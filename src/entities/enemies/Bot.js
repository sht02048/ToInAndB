import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Bot extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 2;
  #missileInterval = 80;
  #botSpeed = 2;
  #hasReachedPoint = false;

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

  update() {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.updateEnemy(
      launchMissile,
      setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
    );
  }

  render() {
    this.renderEnemy();
  }

  launchMissile() {
    if (this.frame % this.#missileInterval !== 0) {
      return;
    }

    const guidedMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: true,
    });

    this.loadSingleMissile(guidedMissile);
  }

  setRoute() {
    if (this.y < this.ship.canvasHeight / 10) {
      this.#hasReachedPoint = true;
    }

    if (!this.#hasReachedPoint) {
      this.y -= this.#botSpeed;
      return;
    }

    if (this.isLeft) {
      this.x -= Math.sqrt(8) * 0.5;
      this.y += Math.sqrt(2) * 0.5;

      return;
    }

    this.x += Math.sqrt(8) * 0.5;
    this.y += Math.sqrt(2) * 0.5;
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Bot;
