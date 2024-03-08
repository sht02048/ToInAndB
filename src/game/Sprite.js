class Sprite {
  constructor(imagePath) {
    this.x = 0;
    this.y = 0;
    this.speed = 2;
    this.sprite = new Image();
    this.sprite.src = imagePath;
    this.canvas = document.getElementById("background-canvas");
    this.ctx = this.canvas.getContext("2d");
  }
}

export default Sprite;
