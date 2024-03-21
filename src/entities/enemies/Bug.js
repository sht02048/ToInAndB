import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Bug extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 5;
  #missileInterval = 60;
  #bugSpeed = 2;
  #bugAngle = 1;

  constructor({ x, y, isLeft }) {
    super({
      x,
      y,
      health: 4,
      shipImage: ENEMIES.BUG,
      hitShipImage: ENEMIES.BUG_HIT,
      width: 56,
      height: 53,
    });

    this.isLeft = isLeft;
  }

  update() {
    this.launchMissile = this.launchMissile.bind(this);
    this.setRoute = this.setRoute.bind(this);

    this.updateEnemy(
      this.launchMissile,
      this.setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT,
    );
  }

  render() {
    this.renderEnemy();
  }

  launchMissile() {
    if (this.frame % this.#missileInterval !== 0 || this.y + this.height < 0) {
      return;
    }

    const missileInformation = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: false,
    });

    this.loadSingleMissile(missileInformation);
  }

  setRoute() {
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

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Bug;
