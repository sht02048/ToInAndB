import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Danger extends Enemy {
  #missileWidth = 25;
  #missileSpeed = 2;
  #missileInterval = 60;
  #dangerSpeed = 4;
  #isTurningPointReached = false;

  private isLeft: boolean;

  constructor({ x, y, isLeft }) {
    super({
      x,
      y,
      health: 4,
      shipImage: ENEMIES.DANGER,
      width: 40,
      height: 51,
    });

    this.isLeft = isLeft;
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.updateEnemy({
      launchMissile,
      setRoute,
      command: MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
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
      projectilePath: ENEMY_PROJECTILE.AIMED,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: true,
    });

    this.missileLauncher.loadSingleMissile(missileInformation);
  }

  setRoute(): void {
    if (this.isLeft) {
      this.leftRoute();
      return;
    }

    this.rightRoute();
  }

  leftRoute(): void {
    if (this.x + this.width / 2 > this.ship.canvasWidth / 2) {
      this.#isTurningPointReached = true;
    }

    if (!this.#isTurningPointReached) {
      this.x += this.#dangerSpeed / Math.sqrt(4);
      this.y += this.#dangerSpeed / 1.5;
      return;
    }

    this.x -= this.#dangerSpeed / Math.sqrt(4);
    this.y += this.#dangerSpeed / 1.5;
  }

  rightRoute(): void {
    if (this.x + this.width / 2 < this.ship.canvasWidth / 2) {
      this.#isTurningPointReached = true;
    }

    if (!this.#isTurningPointReached) {
      this.x -= this.#dangerSpeed / Math.sqrt(4);
      this.y += this.#dangerSpeed / 1.5;
      return;
    }

    this.x += this.#dangerSpeed / Math.sqrt(4);
    this.y += this.#dangerSpeed / 1.5;
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Danger;
