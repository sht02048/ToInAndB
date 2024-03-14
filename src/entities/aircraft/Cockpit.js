class Cockpit {
  #keyPresses = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
  };

  constructor(ship) {
    this.ship = ship;
    this.minX = this.ship.currentDirection.minX;
    this.maxX = this.ship.currentDirection.maxX;
    this.minY = this.ship.currentDirection.minY;
    this.maxY = this.ship.currentDirection.maxY;

    this.addEvent();
  }

  control(shipSpeed) {
    this.ship.currentDirection = this.ship.staticShip;
    this.ship.isShooting = this.#keyPresses.Space;

    if (this.#keyPresses.ArrowUp) {
      this.ship.currentDirection = this.ship.straightShip;

      if (this.ship.y > this.ship.currentDirection.minY) {
        this.ship.y -= shipSpeed;
      }
    }

    if (this.#keyPresses.ArrowDown && this.ship.y < this.maxY) {
      this.ship.y += shipSpeed;
    }

    if (this.#keyPresses.ArrowLeft) {
      this.ship.currentDirection = this.ship.leftShip;

      if (this.ship.x > this.minX) {
        this.ship.x -= shipSpeed;
      }
    }

    if (this.#keyPresses.ArrowRight) {
      this.ship.currentDirection = this.ship.rightShip;

      if (this.ship.x < this.maxX) {
        this.ship.x += shipSpeed;
      }
    }
  }

  addEvent() {
    const handleControl = (event, isDown) => {
      const pressedKey = event.key === " " ? "Space" : event.key;

      if (Object.hasOwn(this.#keyPresses, pressedKey)) {
        this.#keyPresses[pressedKey] = isDown;
      }
    };

    addEventListener("keydown", (event) => handleControl(event, true));
    addEventListener("keyup", (event) => handleControl(event, false));
  }
}

export default Cockpit;
