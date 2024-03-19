import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Danger extends Enemy {
  #missileWidth = 25;
  #missileSpeed = 4;
  #missileInterval = 60;
  #dangerSpeed = 4;
  #isTurningPointReached = false;

  constructor({ x, y, isLeft }) {
    super({
      x,
      y,
      health: 4,
      shipImage: ENEMIES.DANGER,
      hitShipImage: ENEMIES.DANGER_HIT,
      width: 40,
      height: 51,
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
    if (this.frame % this.#missileInterval !== 0 || this.y + this.height < 0) {
      return;
    }

    const missileInformation = this.setMissileInformation();

    this.loadSingleMissile(missileInformation);
  }

  setRoute() {
    if (this.isLeft) {
      this.leftRoute();
      return;
    }

    this.rightRoute();
  }

  leftRoute() {
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

  rightRoute() {
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

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }

  setMissileInformation() {
    const missileInformation = {
      projectilePath: ENEMY_PROJECTILE.AIMED,
      x: this.x,
      y: this.y,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: true,
    };

    return missileInformation;
  }
}

export default Danger;