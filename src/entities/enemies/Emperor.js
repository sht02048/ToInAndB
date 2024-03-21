import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Emperor extends Enemy {
  #missileWidth = 45;
  #missileSpeed = 2;
  #diagonalSpeed = 0.2;
  #missileInterval = 160;
  #emperorSpeed = 1;
  #isEmperorReachedStartPoint = false;
  #isEmperorReachedMinX = false;
  #isEmperorReachedMaxX = false;
  #isEmperorReachedMinY = false;
  #isEmperorReachedMaxY = false;

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 200,
      shipImage: ENEMIES.EMPEROR,
      hitShipImage: ENEMIES.EMPEROR_HIT,
      width: 71,
      height: 71,
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

    this.frame += 1;
  }

  render() {
    this.renderEnemy();
  }

  launchMissile() {
    if (
      this.frame % this.#missileInterval !== 0 ||
      this.y + this.height < 0 ||
      !this.#isEmperorReachedStartPoint
    ) {
      return;
    }

    const missileInformation = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.BOOMERANG,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: false,
    });

    this.loadSingleMissile(missileInformation);
  }

  setRoute() {
    if (
      this.y < this.ship.canvasHeight / 5 &&
      !this.#isEmperorReachedStartPoint
    ) {
      this.y += this.#emperorSpeed;
      return;
    }

    this.#isEmperorReachedStartPoint = true;

    if (this.x < 300) {
      this.#isEmperorReachedMinX = true;
      this.#isEmperorReachedMaxX = false;
    }

    if (this.x > 600) {
      this.#isEmperorReachedMaxX = true;
      this.#isEmperorReachedMinX = false;
    }

    if (this.y < 96) {
      this.#isEmperorReachedMinY = true;
      this.#isEmperorReachedMaxY = false;
    }

    if (this.y > 272) {
      this.#isEmperorReachedMaxY = true;
      this.#isEmperorReachedMinY = false;
    }

    if (this.#isEmperorReachedMaxX && !this.#isEmperorReachedMinY) {
      this.y -= Math.sqrt(2) * this.#emperorSpeed;
      return;
    }

    if (!this.#isEmperorReachedMinX && !this.#isEmperorReachedMinY) {
      this.y -= Math.sqrt(2) * this.#diagonalSpeed;
      this.x -= Math.sqrt(6) * this.#diagonalSpeed;
      return;
    }

    if (!this.#isEmperorReachedMaxX && !this.#isEmperorReachedMaxY) {
      this.y += Math.sqrt(2) * this.#diagonalSpeed;
      this.x += Math.sqrt(6) * this.#diagonalSpeed;
      return;
    }

    if (!this.#isEmperorReachedMinX && !this.#isEmperorReachedMaxY) {
      this.y += Math.sqrt(2) * this.#diagonalSpeed;
      this.x -= Math.sqrt(6) * this.#diagonalSpeed;
      return;
    }

    if (this.#isEmperorReachedMinX && this.#isEmperorReachedMaxY) {
      this.y -= Math.sqrt(2) * this.#emperorSpeed;
      return;
    }
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Emperor;
