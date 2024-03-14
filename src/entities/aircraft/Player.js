import Cockpit from "./Cockpit";
import MissileLauncher from "../parts/MissileLauncher";

import Renderer from "../../game/Renderer";
import { SPRITE, PROJECTILE } from "../../constants/path";

class Player {
  #leftWidth = 41;
  #leftHeight = 61;
  #rightWidth = 41;
  #rightHeight = 61;
  #staticWidth = 41;
  #staticHeight = 61;
  #straightWidth = 41;
  #straightHeight = 61;
  #missileWidth = 36;
  #missileHeight = 49;
  #missileSpeed = 5;
  #shipSpeed = 3.5;

  constructor() {
    this.leftShip = new Renderer(
      SPRITE.PLATER_LEFT,
      this.#leftWidth,
      this.#leftHeight,
    );
    this.rightShip = new Renderer(
      SPRITE.PLATER_RIGHT,
      this.#rightWidth,
      this.#rightHeight,
    );
    this.staticShip = new Renderer(
      SPRITE.PLAYER_STATIC,
      this.#staticWidth,
      this.#staticHeight,
    );
    this.straightShip = new Renderer(
      SPRITE.PLAYER_STRAIGHT,
      this.#straightWidth,
      this.#straightHeight,
    );

    this.currentDirection = this.staticShip;
    this.canvasWidth = this.currentDirection.canvasWidth;
    this.canvasHeight = this.currentDirection.canvasHeight;

    // ACTIVATE 배포 및 플로우 점검시 주석해제 후 하단에 있는 initialY 삭제 필요
    this.initialY = this.canvasHeight;
    // this.initialY = 0;
    this.x = this.canvasWidth / 2 - this.#missileWidth / 2;
    this.y = this.canvasHeight - this.#staticHeight * 3;

    this.isShooting = false;
    this.reloadFrame = 10;

    this.controller = new Cockpit(this);
    this.missileLauncher = new MissileLauncher(
      this.#staticWidth,
      this.#staticHeight,
    );
  }

  render() {
    this.currentDirection.render(this.x, this.y - this.initialY);
    this.missileLauncher.render();
  }

  update() {
    this.controller.control(this.#shipSpeed);
    this.missileLauncher.update(this.#missileSpeed);
    this.in();
    this.launch();
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
      this.#missileHeight,
    );
  }

  in() {
    if (this.initialY > 0) {
      this.initialY -= this.currentDirection.inAndOutSpeed;
    }
  }
}

export default Player;
