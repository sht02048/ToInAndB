import Cockpit from "./Cockpit";

import MissileLauncher from "../parts/MissileLauncher";
import CollisionDetector from "../parts/CollisionDetector";

import Renderer from "../../game/Renderer";
import { SPRITE, PROJECTILE } from "../../constants/path";

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

    this.isShooting = false;
    this.isDestroyed = false;
    this.reloadFrame = 10;

    this.cockpit = new Cockpit(this);
  }

  render() {
    this.currentDirection.render(this.x, this.y - this.initialY);
    this.missileLauncher.render();
  }

  update() {
    this.cockpit.control(this.#shipSpeed);
    this.missileLauncher.update(this.#missileSpeed);
    this.collisionDetector.detectCollision();
    this.launch();

    if (this.initialY > 0) {
      this.in();
    }
  }

  launch() {
    if (!this.isShooting) {
      return;
    }

    this.reloadFrame += 1;

    if (this.reloadFrame % 10 !== 0) {
      return;
    }

    this.missileLauncher.load(
      PROJECTILE.LEVEL_1,
      this.x,
      this.y,
      this.#missileWidth,
      this.#missileDamage,
    );
  }

  in() {
    this.initialY -= this.currentDirection.inAndOutSpeed;
  }

  setTargetList(targetList) {
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Player;
