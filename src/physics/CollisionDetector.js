import ITEM from "../constants/item";
import MODIFIER from "../constants/modifier";

class CollisionDetector {
  #hitBoxModifier = 10;

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
            target.shipSpeed += 1.5 * MODIFIER.SPEED;
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
          target.isVanished ||
          target.isInvincible ||
          !this.isOverLapping(missile, target)
        ) {
          return;
        }

        missile.isVanished = true;
        target.isHit = true;
        target.healthPoint -= missile.damage;
        target.explosion.explosionFrame = 0;
      });
    });
  }

  isOverLapping(gameObject, target) {
    const targetLeft = target.x;
    const targetRight = target.x + target.width;
    const targetTop = target.y + this.#hitBoxModifier;
    const targetBottom = target.y + target.height - this.#hitBoxModifier;

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
