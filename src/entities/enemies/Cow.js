import Enemy from "./Enemy";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";
import MODIFIER from "../../constants/modifier";

class Cow extends Enemy {
  #missileWidth = 25;
  #missileSpeed = 2 * MODIFIER.SPEED;
  #missileInterval = 160 * MODIFIER.FRAME;
  #isCowReachedStartPoint = false;

  constructor({ x, y, isLeft }) {
    super({
      x,
      y,
      health: 30,
      shipImage: ENEMIES.COW,
      hitShipImage: ENEMIES.COW_HIT,
      width: 50,
      height: 48,
    });

    this.shootingPoint = y + 100;
    this.isLeft = isLeft;
  }

  update(x, y) {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.x = x;
    this.y = y;

    this.updateEnemy(
      launchMissile,
      setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
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

  setRoute() {
    if (this.y < this.ship.canvasHeight / 5 + this.shootingPoint) {
      return;
    }

    this.#isCowReachedStartPoint = true;
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Cow;
