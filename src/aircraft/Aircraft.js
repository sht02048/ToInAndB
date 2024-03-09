import Canvas from "../game/Canvas";

class Aircraft extends Canvas {
  #leftBlockSize = 90;
  #rightBlockSize = 135;
  #PlayerAircraftHeight = 61;

  constructor({ PLAYER_STRAIGHT, PLAYER_STATIC, PLATER_LEFT, PLATER_RIGHT }) {
    super("battle-field-canvas");

    this.x = 0;
    this.y = 0;
    this.minX = this.#leftBlockSize;
    this.maxX = this.canvas.width - this.#rightBlockSize;
    this.minY = -10;
    this.maxY = this.canvas.height - this.#PlayerAircraftHeight + 5;
    this.speed = 2;

    this.spriteStraight = new Image();
    this.spriteStatic = new Image();
    this.spriteLeft = new Image();
    this.spriteRight = new Image();
    this.spriteStraight.src = PLAYER_STRAIGHT;
    this.spriteStatic.src = PLAYER_STATIC;
    this.spriteLeft.src = PLATER_LEFT;
    this.spriteRight.src = PLATER_RIGHT;
  }
}

export default Aircraft;
