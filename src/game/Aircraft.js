class Aircraft {
  #leftBlockSize = 90;
  #rightBlockSize = 135;
  #PlayerAircraftHeight = 61;

  constructor({ STRAIGHT, STATIC, LEFT, RIGHT }) {
    this.canvas = document.getElementById("battle-field-canvas");
    this.ctx = this.canvas.getContext("2d");

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
    this.spriteRight = new Image();
    this.spriteRight = new Image();
    this.spriteStraight.src = STRAIGHT;
    this.spriteStatic.src = STATIC;
    this.spriteLeft.src = LEFT;
    this.spriteRight.src = RIGHT;
  }
}

export default Aircraft;
