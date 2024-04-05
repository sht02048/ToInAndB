import Renderer from "./Renderer";
import CollisionDetector from "../physics/CollisionDetector";

class Item extends Renderer {
  #itemSpeedLimit = 5;

  constructor(itemImage, itemType) {
    super(itemImage);

    this.x;
    this.y;
    this.width = 32;
    this.height = 32;
    this.xSpeed = Math.random() * this.#itemSpeedLimit;
    this.ySpeed = this.#itemSpeedLimit - this.xSpeed;
    this.isGained = false;
    this.type = itemType;

    this.collisionDetector = new CollisionDetector([this]);
  }

  renderItem() {
    this.render(this.x, this.y);
  }

  update() {
    if (this.isGained) {
      return;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x - this.width > this.maxX || this.x < this.minX) {
      this.xSpeed *= -1;
    }

    if (this.y - this.height > this.maxY || this.y < this.minY) {
      this.ySpeed *= -1;
    }
  }

  detectItem() {
    this.collisionDetector.detectItem();
  }

  setItemLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  setTargetList(targetList) {
    this.collisionDetector.setTargetList(targetList);
  }
}

export default Item;
