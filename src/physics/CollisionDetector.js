import ITEM from "../constants/item";

class CollisionDetector {
  constructor(gameObjectList) {
    this.gameObjectList = gameObjectList;
  }

  setTargetList(targetList) {
    this.targetList = targetList;
  }

  setItem(item) {
    this.gameObjectList = [item];
  }

  detectItem() {
    this.gameObjectList.forEach((item) => {
      this.targetList.forEach((target) => {
        if (
          item.isGained ||
          target.isDestroyed ||
          !this.isOverLapping(item, target)
        ) {
          return;
        }

        switch (item.type) {
          case ITEM.POWER_UP:
            target.level += 1;
            break;

          case ITEM.SPEED_UP:
            target.shipSpeed += 1.5;
            break;
        }

        item.isGained = true;
      });
    });
  }

  detectCollision() {
    this.gameObjectList.forEach((missile) => {
      this.targetList.forEach((target) => {
        if (
          missile.isVanished ||
          target.isDestroyed ||
          !this.isOverLapping(missile, target)
        ) {
          return;
        }

        missile.isVanished = true;
        target.isHit = true;
        target.healthPoint -= missile.damage;
      });
    });
  }

  isOverLapping(gameObject, target) {
    const targetLeft = target.x;
    const targetRight = target.x + target.width;
    const targetTop = target.y + 10;
    const targetBottom = target.y + target.height;

    const objectLeft = gameObject.x;
    const objectRight = gameObject.x + gameObject.width;
    const objectTop = gameObject.y;
    const objectBottom = gameObject.y + gameObject.height;

    return (
      targetLeft <= objectRight &&
      targetRight >= objectLeft &&
      targetTop <= objectBottom &&
      targetBottom >= objectTop
    );
  }
}

export default CollisionDetector;
