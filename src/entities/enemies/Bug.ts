import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Bug extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 5;
  #missileInterval = 60;
  #bugSpeed = 2;
  #bugAngle = 1;

  private isLeft: boolean;

  constructor({ x, y, isLeft }) {
    super({
      x,
      y,
      health: 4,
      shipImage: ENEMIES.BUG,
      width: 56,
      height: 53,
    });

    this.isLeft = isLeft;
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
    this.y += this.#bugSpeed;

    if (this.frame > 300) {
      if (this.isLeft) {
        this.x += this.#bugSpeed;
        return;
      }

      this.x -= this.#bugSpeed;
      return;
    }

    this.#bugAngle += 0.05;
    this.x += Math.sin(this.#bugAngle) * 5;
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Bug;
