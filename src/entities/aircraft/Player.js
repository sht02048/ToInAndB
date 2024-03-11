import Projectile from "./Projectile";

import Sprite from "../Sprite";
import { SPRITE_PATH, PROJECTILE_PATH } from "../../constants/path";

class Player {
  #speed = 3.5;

  constructor(game) {
    this.game = game;

    this.leftShip = new Sprite(SPRITE_PATH.PLATER_LEFT);
    this.rightShip = new Sprite(SPRITE_PATH.PLATER_RIGHT);
    this.staticShip = new Sprite(SPRITE_PATH.PLAYER_STATIC);
    this.straightShip = new Sprite(SPRITE_PATH.PLAYER_STRAIGHT);
    this.level = "LEVEL_1";

    this.currentDirection = this.staticShip;

    // ACTIVATE 실제 작업시 주석해제 필요
    // this.initialY = this.game.mainCanvas.height;
    this.initialY = 0;

    this.currentDirection.onload = () => {
      this.x = this.game.mainCanvas.width / 2 - this.currentDirection.width / 2;
      this.y = this.game.mainCanvas.height - this.currentDirection.height * 3;
    };

    this.keyPresses = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
  }

  control() {
    this.currentDirection = this.staticShip;

    if (this.keyPresses.ArrowUp) {
      this.currentDirection = this.straightShip;

      if (this.y > this.game.minY) {
        this.y -= this.#speed;
      }
    }

    if (this.keyPresses.ArrowDown && this.y < this.game.maxY) {
      this.y += this.#speed;
    }

    if (this.keyPresses.ArrowLeft) {
      this.currentDirection = this.leftShip;

      if (this.x > this.game.minX) {
        this.x -= this.#speed;
      }
    }

    if (this.keyPresses.ArrowRight) {
      this.currentDirection = this.rightShip;

      if (this.x < this.game.maxX) {
        this.x += this.#speed;
      }
    }
  }

  in() {
    if (this.initialY > 0) {
      this.initialY -= this.game.inAndOutSpeed;
    }
  }

  addEvent() {
    const handleControl = (event, isDown) => {
      if (Object.hasOwn(this.keyPresses, event.key)) {
        this.keyPresses[event.key] = isDown;
      }
    };

    const handleAttack = (event) => {
      if (event.key === " ") {
        console.log(event);
        this.bullet = new Projectile(PROJECTILE_PATH[this.level]);
        this.bullet.x =
          this.x +
          (this.currentDirection.width * 1.2) / 2 -
          this.bullet.width / 2;
        this.bullet.y = this.y - 50;

        this.game.bulletList.push(this.bullet);
      }
    };

    addEventListener("keydown", (event) => handleControl(event, true));
    addEventListener("keyup", (event) => handleControl(event, false));
    addEventListener("keypress", handleAttack);
  }

  attack() {
    this.game.bulletList.forEach((bullet) => {
      if (bullet.isHitByEnemy) {
        return;
      }

      if (bullet.y > this.game.minY - 50) {
        bullet.y -= bullet.speed;
      }
    });
  }

  render() {
    this.game.mainCtx.drawImage(
      this.currentDirection,
      this.x,
      this.y - this.initialY,
      this.currentDirection.width * 1.2,
      this.currentDirection.height * 1.2,
    );

    this.game.bulletList.forEach((bullet) => {
      if (bullet.isHitByEnemy) {
        return;
      }

      this.game.mainCtx.drawImage(bullet.projectile, bullet.x, bullet.y);
    });
  }
}

export default Player;
