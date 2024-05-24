import Enemy from "./Enemy";

import MissileLauncher from "../../weapons/MissileLauncher";
import CollisionDetector from "../../physics/CollisionDetector";

import { ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Wings extends Enemy {
  #missileWidth = 16;
  #missileSpeed = 1.5;
  #wingsSpeed = 1;
  #missileInterval = 250;
  #missileRound = 0;
  #reloadFrame = 50;
  #wingsWidth = 72;
  #wingsHeight = 71;
  #isWingsAppeared = false;
  #isWingsReachedMinX = false;
  #isWingsReachedMaxX = false;
  #isWingSReachedMinY = false;

  private leftMissileLauncher: MissileLauncher;
  private rightMissileLauncher: MissileLauncher;
  private leftCollisionDetector: CollisionDetector;
  private rightCollisionDetector: CollisionDetector;

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
    this.leftCollisionDetector = new CollisionDetector();
    this.leftCollisionDetector.setMissileList(
      this.leftMissileLauncher.missileList,
    );
    this.rightCollisionDetector = new CollisionDetector();
    this.rightCollisionDetector.setMissileList(
      this.rightMissileLauncher.missileList,
    );
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);

    this.leftCollisionDetector.detectCollision();
    this.rightCollisionDetector.detectCollision();
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

  render(): void {
    this.renderEnemy();
    this.leftMissileLauncher.render();
    this.rightMissileLauncher.render();
  }

  setRoute(): void {
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

  launchMissile(): void {
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

      this.leftMissileLauncher.loadSingleMissile(leftMissile);
      this.rightMissileLauncher.loadSingleMissile(rightMissile);

      this.missileLauncher.loadSingleMissile(middleMissile);

      this.#missileRound -= 1;
    }
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.leftMissileLauncher.setTargetList(targetList);
    this.rightMissileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.leftCollisionDetector.setTargetList(targetList);
    this.rightCollisionDetector.setTargetList(targetList);
  }
}

export default Wings;
