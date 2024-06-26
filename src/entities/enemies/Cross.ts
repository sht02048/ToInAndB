import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Cross extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 2;
  #missileInterval = 200;
  #crossSpeed = 0.8;

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 10,
      shipImage: ENEMIES.CROSS,
      width: 44,
      height: 44,
    });
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.seRoute.bind(this);

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

  seRoute(): void {
    this.y += this.#crossSpeed;
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Cross;
