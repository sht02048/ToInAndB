import Canvas from "../game/Canvas";

class BackgroundSprite extends Canvas {
  constructor(imagePath) {
    super("background-canvas");

    this.x = 0;
    this.y = 0;
    this.speed = 2;
    this.sprite = new Image();
    this.sprite.src = imagePath;
  }
}

export default BackgroundSprite;
