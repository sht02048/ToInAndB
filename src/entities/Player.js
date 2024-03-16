import Cockpit from "./Cockpit";
import SpaceShip from "./Spaceship";

import Renderer from "../graphics/Renderer";
import MissileLauncher from "../weapons/MissileLauncher";
import CollisionDetector from "../physics/CollisionDetector";

import TEAM from "../constants/team";
import { SPRITE, PROJECTILE } from "../constants/path";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class Player extends SpaceShip {
  #staticWidth = 41;
  #staticHeight = 61;
  #straightMissileWidth = 36;
  #straightMissileSpeed = 5;
  #straightMissileReload = 10;
  #guidedMissileWidth = 80;
  #guidedMissileSpeed = 2.5;
  #guidedMissileReload = 100;
  #missileDamage = 2;
  #shipSpeed = 3.5;

  constructor() {
    super();

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
    this.reloadFrame = 10;
    this.straightProjectile = PROJECTILE.LEVEL_1;
    this.guidedProjectile = PROJECTILE.GUIDED;

    this.cockpit = new Cockpit(this);
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

  render() {
    this.guidedMissileLauncher.render();
    this.straightMissileLauncher.render();
    this.currentDirection.render(this.x, this.y - this.initialY);
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
    const missileInformation = this.setMissileInformation(
      this.straightProjectile,
      this.x,
      this.y,
      this.#straightMissileWidth,
      this.#straightMissileSpeed,
    );

    this.straightMissileLauncher.loadSingleAmmo(missileInformation);
  }

  loadGuidedMissile() {
    const leftX = this.x - this.currentDirection.width / 2;
    const rightX = this.x + this.currentDirection.width / 2;
    const sharedY = this.y + this.currentDirection.height / 2;

    const leftWidth = this.#guidedMissileWidth;
    const rightWidth = -this.#guidedMissileWidth / 2;

    const leftMissileInformation = this.setMissileInformation(
      this.guidedProjectile,
      leftX,
      sharedY,
      leftWidth,
      this.#guidedMissileSpeed,
    );
    const rightMissileInformation = this.setMissileInformation(
      this.guidedProjectile,
      rightX,
      sharedY,
      rightWidth,
      this.#guidedMissileSpeed,
    );

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

  setMissileInformation(
    projectilePath,
    positionX,
    positionY,
    missileWidth,
    missileSpeed,
  ) {
    const missileInformation = {
      projectilePath: projectilePath,
      x: positionX,
      y: positionY,
      missileWidth: missileWidth,
      missileDamage: this.#missileDamage,
      missileSpeed: missileSpeed,
      team: TEAM.PLATER,
    };

    return missileInformation;
  }
}

export default Player;
