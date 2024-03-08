import Aircraft from "../game/Aircraft";

class PlayerAircraft extends Aircraft {
  constructor(playerPath) {
    super(playerPath);

    this.speed += 1;
    this.width = this.spriteStatic.width;
    this.height = this.spriteStatic.height;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height - this.height * 3;
    this.previousPosition = this.speed + 2;

    this.keyPresses = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    const handleKeyPress = (event, isDown) => {
      if (Object.hasOwn(this.keyPresses, event.key)) {
        this.keyPresses[event.key] = isDown;
      }
    };

    addEventListener("keydown", (event) => handleKeyPress(event, true));

    addEventListener("keyup", (event) => handleKeyPress(event, false));
  }

  control() {
    this.currentDirection = this.spriteStatic;

    if (this.keyPresses.ArrowUp) {
      this.currentDirection = this.spriteStraight;

      if (this.y > this.minY) {
        this.y -= this.speed;
        this.dy = this.previousPosition;
        this.dx = 0;
      }
    }

    if (this.keyPresses.ArrowDown && this.y < this.maxY) {
      this.y += this.speed;
      this.dy = -this.previousPosition;
      this.dx = 0;
    }

    if (this.keyPresses.ArrowLeft) {
      this.currentDirection = this.spriteLeft;

      if (this.x > this.minX) {
        this.x -= this.speed;

        if (!this.keyPresses.ArrowRight) {
          this.dx = this.previousPosition;
        }

        if (
          (!this.keyPresses.ArrowDown && !this.keyPresses.ArrowUp) ||
          (this.keyPresses.ArrowDown && this.keyPresses.ArrowUp)
        ) {
          this.dy = 0;
        }
      }
    }

    if (this.keyPresses.ArrowRight) {
      this.currentDirection = this.spriteRight;

      if (this.x < this.maxX) {
        this.x += this.speed;

        if (!this.keyPresses.ArrowLeft) {
          this.dx = -this.previousPosition;
        }

        if (
          (!this.keyPresses.ArrowDown && !this.keyPresses.ArrowUp) ||
          (this.keyPresses.ArrowDown && this.keyPresses.ArrowUp)
        ) {
          this.dy = 0;
        }
      }
    }

    this.ctx.clearRect(
      this.x + this.dx,
      this.y + this.dy,
      this.width,
      this.height,
    );

    this.ctx.drawImage(
      this.currentDirection,
      this.x,
      this.y,
      this.width,
      this.height,
    );

    requestAnimationFrame(() => this.control());
  }
}

export default PlayerAircraft;
