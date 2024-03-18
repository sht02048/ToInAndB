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
      hitShipImage: ENEMIES.CANNON_HIT,
      width: 56,
      height: 54,
    });
  }

  update() {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.updateEnemy(
      launchMissile,
      setRoute,
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

    const missileInformation = this.setMissileInformation();

    this.loadSingleMissile(missileInformation);
  }

  setRoute() {
    if (this.y < this.ship.canvasHeight / 6) {
      this.y += this.#cannonSpeed;
    }
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }

  setMissileInformation() {
    const missileInformation = {
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      x: this.x,
      y: this.y,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: false,
    };

    return missileInformation;
  }
}

export default Cannon;
