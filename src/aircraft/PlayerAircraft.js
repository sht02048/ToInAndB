import Sprite from "../game/Sprite";
import Projectile from "./Projectile";
import { PROJECTILE_PATH } from "../constants/path";

class PlayerAircraft {
  #isComingIn = true;

  constructor(playerPath, game) {
    const { PLAYER_STRAIGHT, PLAYER_STATIC, PLATER_LEFT, PLATER_RIGHT } =
      playerPath;

    this.game = game;
    this.staticShip = new Sprite(PLAYER_STATIC);
    this.straightShip = new Sprite(PLAYER_STRAIGHT);
    this.leftShip = new Sprite(PLATER_LEFT);
    this.rightShip = new Sprite(PLATER_RIGHT);

    this.speed = 3;
    this.x = this.game.backgroundCanvas.width / 2 - this.staticShip.width / 2;
    this.y = this.game.backgroundCanvas.height - this.staticShip.height * 3;

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

        this.game.bulletList.push(this.bullet);
      }
    };

    addEventListener("keydown", (event) => handleControl(event, true));

    addEventListener("keyup", (event) => handleControl(event, false));

    addEventListener("keydown", handleAttack);
  }

  attack() {
    for (let i = 0; i < this.game.bulletList.length; i++) {
      const currentBullet = this.game.bulletList[i];

      if (currentBullet.y > this.game.minY) {
        currentBullet.y -= currentBullet.speed;

        this.game.backgroundCtx.drawImage(
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

      if (this.y > this.game.minY) {
        this.y -= this.speed;
      }
    }

    if (this.keyPresses.ArrowDown && this.y < this.game.maxY) {
      this.y += this.speed;
    }

    if (this.keyPresses.ArrowLeft) {
      this.currentDirection = this.leftShip;

      if (this.x > this.game.minX) {
        this.x -= this.speed;
      }
    }

    if (this.keyPresses.ArrowRight) {
      this.currentDirection = this.rightShip;

      if (this.x < this.game.maxX) {
        this.x += this.speed;
      }
    }

    this.game.backgroundCtx.drawImage(
      this.currentDirection,
      this.x,
      this.y,
      this.staticShip.width,
      this.staticShip.height,
    );
  }

  in() {
    this.y += this.game.inAndOutSpeed;

    this.game.backgroundCtx.drawImage(
      this.staticShip,
      this.x,
      this.y - this.game.backgroundCanvas.height,
      this.staticShip.width,
      this.staticShip.height,
    );

    if (
      this.y >
      this.game.backgroundCanvas.height * 2 - this.staticShip.height * 3
    ) {
      this.y = this.game.backgroundCanvas.height - this.staticShip.height * 3;
      this.#isComingIn = false;
    }
  }
}

export default PlayerAircraft;
