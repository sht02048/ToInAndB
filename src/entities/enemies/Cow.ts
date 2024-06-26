import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Cow extends Enemy {
  #missileWidth = 25;
  #missileSpeed = 2;
  #missileInterval = 160;
  #isCowReachedStartPoint = false;

  private shootingPoint: number;

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 30,
      shipImage: ENEMIES.COW,
      width: 50,
      height: 48,
    });

    this.shootingPoint = y + 100;
  }

  update(x, y): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.x = x;
    this.y = y;

    this.updateEnemy({
      launchMissile,
      setRoute,
      command: MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
    });

    this.frame += 1;
  }

  render(): void {
    this.renderEnemy();
  }

  launchMissile(): void {
    if (
      this.frame % this.#missileInterval !== 0 ||
      this.y + this.height < 0 ||
      !this.#isCowReachedStartPoint
    ) {
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
    if (this.y < this.ship.canvasHeight / 5 + this.shootingPoint) {
      return;
    }

    this.#isCowReachedStartPoint = true;
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Cow;
