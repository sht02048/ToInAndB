import Cockpit from "./Cockpit";

import Renderer from "../graphics/Renderer";
import MissileLauncher from "../weapons/MissileLauncher";
import CollisionDetector from "../physics/CollisionDetector";

import TEAM from "../constants/team";
import { SPRITE, PROJECTILE } from "../constants/path";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class Player {
  #staticWidth = 41;
  #staticHeight = 61;
  #straightMissileWidth = 36;
  #straightMissileSpeed = 5;
  #straightMissileReload = 10;
  #guidedMissileWidth = 80;
  #guidedMissileSpeed = 1.5;
  #guidedMissileReload = 100;
  #missileDamage = 2;
  #shipSpeed = 3.5;

  constructor() {
    this.leftShip = new Renderer(SPRITE.PLATER_LEFT);
    this.rightShip = new Renderer(SPRITE.PLATER_RIGHT);
    this.staticShip = new Renderer(SPRITE.PLAYER_STATIC);
    this.straightShip = new Renderer(SPRITE.PLAYER_STRAIGHT);
    this.straightMissileLauncher = new MissileLauncher(
      this.#staticWidth,
      this.#staticHeight,
    );
    this.guidedMissileLauncher = new MissileLauncher(
      this.#staticWidth,
      this.#staticHeight,
    );
    this.straightCollisionDetector = new CollisionDetector(
      this.straightMissileLauncher.missileList,
    );
    this.guidedCollisionDetector = new CollisionDetector(
      this.guidedMissileLauncher.missileList,
    );

    this.currentDirection = this.staticShip;
    this.canvasWidth = this.currentDirection.canvasWidth;
    this.canvasHeight = this.currentDirection.canvasHeight;

    // ACTIVATE 배포 및 플로우 점검시 주석해제 후 하단에 있는 initialY 삭제 필요
    // this.initialY = this.canvasHeight;
    this.initialY = 0;
    this.x = this.canvasWidth / 2 - this.#staticWidth / 2;
    this.y = this.canvasHeight - this.#staticHeight * 3;

    this.level = 1;
    this.isShooting = false;
    this.isDestroyed = false;
    this.reloadFrame = 10;
    this.straightProjectile = PROJECTILE.LEVEL_1;
    this.guidedProjectile = PROJECTILE.GUIDED;
    this.frame = 0;

    this.cockpit = new Cockpit(this);
  }

  render() {
    this.guidedMissileLauncher.render();
    this.straightMissileLauncher.render();
    this.currentDirection.render(this.x, this.y - this.initialY);
  }

  update() {
    this.launchMissile();
    this.setSize();
    this.upgrade();
    this.cockpit.makeShotSound();
    this.cockpit.control(this.#shipSpeed);
    this.straightCollisionDetector.detectCollision();
    this.guidedCollisionDetector.detectCollision();
    this.straightMissileLauncher.setMissileRoute(
      MISSILE_ROUTE_COMMAND.PLATER_STRAIGHT,
      this.#straightMissileSpeed,
    );
    this.guidedMissileLauncher.setMissileRoute(
      MISSILE_ROUTE_COMMAND.GUIDED,
      this.#guidedMissileSpeed,
    );

    if (this.initialY > 0) {
      this.in();
    }

    this.frame += 1;
  }

  launchMissile() {
    if (!this.isShooting) {
      return;
    }

    this.reloadFrame += 1;

    if (this.reloadFrame % this.#straightMissileReload !== 0) {
      return;
    }

    this.loadStraightMissile();
  }

  loadStraightMissile() {
    const missileInformation = {
      projectilePath: this.straightProjectile,
      x: this.x,
      y: this.y,
      missileWidth: this.#straightMissileWidth,
      missileDamage: this.#missileDamage,
      missileSpeed: this.#straightMissileSpeed,
      team: TEAM.PLATER,
    };

    this.straightMissileLauncher.loadSingleAmmo(missileInformation);
  }

  loadGuidedMissile() {
    const leftMissileInformation = {
      projectilePath: this.guidedProjectile,
      x: this.x - this.currentDirection.width / 2,
      y: this.y + this.currentDirection.height / 2,
      missileWidth: this.#guidedMissileWidth,
      missileDamage: this.#missileDamage,
      missileSpeed: this.#straightMissileSpeed,
      team: TEAM.PLATER,
    };

    const rightMissileInformation = {
      projectilePath: this.guidedProjectile,
      x: this.x + this.currentDirection.width / 2,
      y: this.y + this.currentDirection.height / 2,
      missileWidth: -this.#guidedMissileWidth / 2,
      missileDamage: this.#missileDamage,
      missileSpeed: this.#straightMissileSpeed,
      team: TEAM.PLATER,
    };

    this.guidedMissileLauncher.loadSingleAmmo(leftMissileInformation);
    this.guidedMissileLauncher.loadSingleAmmo(rightMissileInformation);
  }

  in() {
    this.initialY -= this.currentDirection.inAndOutSpeed;
  }

  setTargetList(targetList) {
    this.straightCollisionDetector.setTargetList(targetList);
    this.guidedCollisionDetector.setTargetList(targetList);
    this.straightMissileLauncher.setTargetList(targetList);
    this.guidedMissileLauncher.setTargetList(targetList);
  }

  setSize() {
    this.width = this.currentDirection.width;
    this.height = this.currentDirection.height;
  }

  upgrade() {
    switch (this.level) {
      case 2:
        this.#missileDamage += 1;
        this.straightProjectile = PROJECTILE.LEVEL_2;
        this.#straightMissileWidth = 52;
        break;

      case 3:
        this.#missileDamage += 1;
        this.straightProjectile = PROJECTILE.LEVEL_3;
        this.#straightMissileWidth = 90;
        break;
    }

    if (this.reloadFrame % this.#guidedMissileReload === 0 && this.level > 1) {
      this.loadGuidedMissile();
    }
  }
}

export default Player;
