import { SPRITE_PATH } from "../constants/path";
import Sprite from "../game/Sprite";

class Player {
  #speed = 3.5;

  constructor(game) {
    this.game = game;

    this.leftShip = new Sprite(SPRITE_PATH.PLATER_LEFT);
    this.rightShip = new Sprite(SPRITE_PATH.PLATER_RIGHT);
    this.staticShip = new Sprite(SPRITE_PATH.PLAYER_STATIC);
    this.straightShip = new Sprite(SPRITE_PATH.PLAYER_STRAIGHT);

    this.currentDirection = this.staticShip;
    this.initialY = this.game.mainCanvas.height;

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

    const handleControl = (event, isDown) => {
      if (Object.hasOwn(this.keyPresses, event.key)) {
        this.keyPresses[event.key] = isDown;
      }
    };

    addEventListener("keydown", (event) => handleControl(event, true));
    addEventListener("keyup", (event) => handleControl(event, false));
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

  render() {
    this.game.mainCtx.drawImage(
      this.currentDirection,
      this.x,
      this.y - this.initialY,
    );
  }
}

export default Player;
