import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Cannon extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 5;
  #missileInterval = 60;
  #cannonSpeed = 2;

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 10,
      shipImage: ENEMIES.CANNON,
      width: 56,
      height: 54,
    });
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.updateEnemy({
      launchMissile,
      setRoute,
      command: MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT,
    });
  }

  render(): void {
    this.renderEnemy();
  }

  launchMissile(): void {
    if (this.frame % this.#missileInterval !== 0 || this.y + this.height < 0) {
      return;
    }

    const missileInformation = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: false,
    });

    this.missileLauncher.loadSingleMissile(missileInformation);
  }

  setRoute(): void {
    if (this.y < this.ship.canvasHeight / 6) {
      this.y += this.#cannonSpeed;
    }
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Cannon;
