import Renderer from "../graphics/Renderer";
import { ITEMS } from "../constants/path";
import CollisionDetector from "../physics/CollisionDetector";

class PowerUp extends Renderer {
  constructor() {
    super(ITEMS.POWER_UP);

    this.x;
    this.y;
    this.width = 32;
    this.height = 32;
    this.xSpeed = 1;
    this.ySpeed = 3.3;
    this.isGained = false;

    this.collisionDetector = new CollisionDetector([this]);
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

export default PowerUp;
