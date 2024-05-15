import Renderer from "./Renderer";
import CollisionDetector from "../physics/CollisionDetector";
import Player from "../entities/Player";

class Item extends Renderer {
  #itemSpeedLimit = 5;

  private xSpeed: number;
  private ySpeed: number;
  private collisionDetector: CollisionDetector;

  public x: number;
  public y: number;
  public isGained: boolean;
  public readonly type: string;

  constructor(itemImage: string, itemType: string) {
    super(itemImage);

    this.x;
    this.y;
    this.width = 32;
    this.height = 32;
    this.xSpeed = Math.random() * this.#itemSpeedLimit;
    this.ySpeed = this.#itemSpeedLimit - this.xSpeed;
    this.isGained = false;
    this.type = itemType;

    this.collisionDetector = new CollisionDetector();
    this.collisionDetector.setItem(this);
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

  setTarget(player: Player) {
    this.collisionDetector.setPlayer(player);
  }
}

export default Item;
