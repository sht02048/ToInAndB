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
  #missileWidth = 36;
  #missileSpeed = 5;
  #missileDamage = 2;
  #shipSpeed = 3.5;

  constructor() {
    this.leftShip = new Renderer(SPRITE.PLATER_LEFT);
    this.rightShip = new Renderer(SPRITE.PLATER_RIGHT);
    this.staticShip = new Renderer(SPRITE.PLAYER_STATIC);
    this.straightShip = new Renderer(SPRITE.PLAYER_STRAIGHT);
    this.missileLauncher = new MissileLauncher(
      this.#staticWidth,
      this.#staticHeight,
    );
    this.collisionDetector = new CollisionDetector(
      this.missileLauncher.missileList,
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
    this.projectile = PROJECTILE.LEVEL_1;

    this.cockpit = new Cockpit(this);
  }

  render() {
    this.currentDirection.render(this.x, this.y - this.initialY);
    this.missileLauncher.render();
  }

  update() {
    this.launchMissile();
    this.setSize();
    this.checkLevel();
    this.cockpit.makeShotSound();
    this.cockpit.control(this.#shipSpeed);
    this.collisionDetector.detectCollision();
    this.missileLauncher.setMissileRoute(
      MISSILE_ROUTE_COMMAND.PLATER_STRAIGHT,
      this.#missileSpeed,
    );

    if (this.initialY > 0) {
      this.in();
    }
  }

  launchMissile() {
    if (!this.isShooting) {
      return;
    }

    this.reloadFrame += 1;

    if (this.reloadFrame % 10 !== 0) {
      return;
    }

    this.loadMissile();
  }

  loadMissile() {
    const missileInformation = {
      projectilePath: this.projectile,
      x: this.x,
      y: this.y,
      missileWidth: this.#missileWidth,
      missileDamage: this.#missileDamage,
      missileSpeed: this.#missileSpeed,
      team: TEAM.PLATER,
    };

    this.missileLauncher.loadSingleAmmo(missileInformation);
  }

  in() {
    this.initialY -= this.currentDirection.inAndOutSpeed;
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
  }

  setSize() {
    this.width = this.currentDirection.width;
    this.height = this.currentDirection.height;
  }

  checkLevel() {
    switch (this.level) {
      case 2:
        this.#missileDamage += 1;
        this.projectile = PROJECTILE.LEVEL_2;
        this.#missileWidth = 52;
        break;

      case 3:
        this.#missileDamage += 1;
        this.projectile = PROJECTILE.LEVEL_3;
        this.#missileWidth = 90;
        break;
    }
  }
}

export default Player;
