import Canvas from "../game/Canvas";
import Sprite from "../game/Sprite";
import Projectile from "./Projectile";
import { PROJECTILE_PATH } from "../constants/path";

class PlayerAircraft extends Canvas {
  #bulletList = [];
  #isComingIn = true;

  constructor(playerPath) {
    const { PLAYER_STRAIGHT, PLAYER_STATIC, PLATER_LEFT, PLATER_RIGHT } =
      playerPath;

    super("battle-field-canvas");

    this.staticShip = new Sprite(PLAYER_STATIC);
    this.straightShip = new Sprite(PLAYER_STRAIGHT);
    this.leftShip = new Sprite(PLATER_LEFT);
    this.rightShip = new Sprite(PLATER_RIGHT);

    this.staticShip.onload = () => {
      this.speed += 1;
      this.width = this.staticShip.width;
      this.height = this.staticShip.height;
      this.x = this.canvas.width / 2 - this.width / 2;
      this.y = this.canvas.height - this.height * 3;
    };

    this.keyPresses = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    const handleControl = (event, isDown) => {
      if (Object.hasOwn(this.keyPresses, event.key)) {
        this.keyPresses[event.key] = isDown;
      }
    };

    const handleAttack = (event) => {
      if (event.key === " ") {
        this.bullet = new Projectile(PROJECTILE_PATH.LEVEL_1);
        this.bullet.x = this.x + 3;
        this.bullet.y = this.y - 50;

        this.#bulletList.push(this.bullet);
      }
    };

    addEventListener("keydown", (event) => handleControl(event, true));

    addEventListener("keyup", (event) => handleControl(event, false));

    addEventListener("keydown", handleAttack);
  }

  attack() {
    for (let i = 0; i < this.#bulletList.length; i++) {
      const currentBullet = this.#bulletList[i];

      if (currentBullet.y > currentBullet.minY) {
        currentBullet.y -= currentBullet.speed;

        this.ctx.drawImage(
          currentBullet.projectile,
          currentBullet.x,
          currentBullet.y,
        );
      }
    }
  }

  control() {
    if (this.#isComingIn) {
      this.in();

      return;
    }

    this.currentDirection = this.staticShip;

    if (this.keyPresses.ArrowUp) {
      this.currentDirection = this.straightShip;

      if (this.y > this.minY) {
        this.y -= this.speed;
      }
    }

    if (this.keyPresses.ArrowDown && this.y < this.maxY) {
      this.y += this.speed;
    }

    if (this.keyPresses.ArrowLeft) {
      this.currentDirection = this.leftShip;

      if (this.x > this.minX) {
        this.x -= this.speed;
      }
    }

    if (this.keyPresses.ArrowRight) {
      this.currentDirection = this.rightShip;

      if (this.x < this.maxX) {
        this.x += this.speed;
      }
    }

    this.ctx.drawImage(
      this.currentDirection,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  in() {
    this.y += this.inAndOutSpeed;

    this.ctx.drawImage(
      this.staticShip,
      this.x,
      this.y - this.canvas.height,
      this.width,
      this.height,
    );

    if (this.y > this.canvas.height * 2 - this.height * 3) {
      this.y = this.canvas.height - this.height * 3;
      this.#isComingIn = false;
    }
  }
}

export default PlayerAircraft;
