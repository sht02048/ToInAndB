import Enemy from "./Enemy";

import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";
import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MissileLauncher from "../../weapons/MissileLauncher";
import CollisionDetector from "../../physics/CollisionDetector";

class Wings extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 1;
  #wingsSpeed = 0.7;
  #missileInterval = 200;
  #missileRound = 0;
  #reloadFrame = 50;
  #wingsWidth = 72;
  #wingsHeight = 71;
  #isWingsAppeared = false;
  #isWingsReachedMinX = false;
  #isWingsReachedMaxX = false;
  #isWingSReachedMinY = false;

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 200,
      shipImage: ENEMIES.WINGS,
      hitShipImage: ENEMIES.WINGS_HIT,
      width: 72,
      height: 71,
    });

    this.leftMissileLauncher = new MissileLauncher(
      this.#wingsWidth,
      this.#wingsHeight,
    );
    this.rightMissileLauncher = new MissileLauncher(
      this.#wingsWidth,
      this.#wingsHeight,
    );
    this.leftMissileDetector = new CollisionDetector(
      this.leftMissileLauncher.missileList,
    );
    this.rightMissileDetector = new CollisionDetector(
      this.rightMissileLauncher.missileList,
    );
  }

  update() {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.leftMissileDetector.detectCollision();
    this.rightMissileDetector.detectCollision();
    this.leftMissileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_AIMED);
    this.rightMissileLauncher.setMissileRoute(
      MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
    );

    this.updateEnemy(
      launchMissile,
      setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
    );
  }

  render() {
    this.renderEnemy();
    this.leftMissileLauncher.render();
    this.rightMissileLauncher.render();
  }

  setRoute() {
    if (this.y > 100) {
      this.#isWingsAppeared = true;
      this.#isWingSReachedMinY = false;
    }

    if (this.x < 100) {
      this.#isWingsReachedMinX = true;
      this.#isWingsReachedMaxX = false;
    }

    if (this.y < 100) {
      this.#isWingSReachedMinY = true;
      this.#isWingsReachedMinX = false;
    }

    if (this.x > this.ship.maxX - 100) {
      this.#isWingsReachedMaxX = true;
      this.#isWingSReachedMinY = false;
    }

    if (!this.#isWingsAppeared) {
      this.y += this.#wingsSpeed;
      return;
    }

    if (!this.#isWingsReachedMinX) {
      this.y += Math.sqrt(this.#wingsSpeed);
      this.x -= Math.sqrt(this.#wingsSpeed * 2);
      return;
    }

    if (!this.#isWingsReachedMaxX) {
      this.x += this.#wingsSpeed;
      return;
    }

    if (!this.#isWingSReachedMinY) {
      this.y -= this.#wingsSpeed;
    }
  }

  launchMissile() {
    if (this.frame % this.#missileInterval === 0 && this.y + this.height > 0) {
      this.#missileRound = 3;
    }

    if (this.#missileRound > 0 && this.frame % this.#reloadFrame === 0) {
      const middleMissile = this.setMissileInformation({
        projectilePath: ENEMY_PROJECTILE.AIMED,
        missileWidth: this.#missileWidth,
        missileSpeed: this.#missileSpeed,
        isAimed: true,
      });
      const leftMissile = this.setMissileInformation({
        projectilePath: ENEMY_PROJECTILE.AIMED,
        x: this.x - this.#wingsWidth / 2,
        missileWidth: this.#missileWidth,
        missileSpeed: this.#missileSpeed,
        isAimed: true,
      });
      const rightMissile = this.setMissileInformation({
        projectilePath: ENEMY_PROJECTILE.AIMED,
        x: this.x + this.#wingsWidth / 2,
        missileWidth: this.#missileWidth,
        missileSpeed: this.#missileSpeed,
        isAimed: true,
      });

      this.leftMissileLauncher.loadSingleAmmo(leftMissile);
      this.rightMissileLauncher.loadSingleAmmo(rightMissile);

      this.loadSingleMissile(middleMissile);

      this.#missileRound -= 1;
    }
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.leftMissileLauncher.setTargetList(targetList);
    this.rightMissileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.leftMissileDetector.setTargetList(targetList);
    this.rightMissileDetector.setTargetList(targetList);
  }
}

export default Wings;
