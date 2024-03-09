class Sprite {
  constructor(imagePath) {
    this.sprite = new Image();
    this.sprite.src = imagePath;
    this.width = this.sprite.width;
    this.height = this.sprite.height;

    return this.sprite;
  }
}

export default Sprite;
