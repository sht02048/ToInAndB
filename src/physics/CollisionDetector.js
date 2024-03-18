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

        item.isGained = true;
        target.level += 1;
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
    const targetTop = target.y;
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
