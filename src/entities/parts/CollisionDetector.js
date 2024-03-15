class CollisionDetector {
  #targetTopModifier = 56;

  constructor(missileList) {
    this.missileList = missileList;
  }

  setTargetList(targetList) {
    this.targetList = targetList;
  }

  detectCollision() {
    this.missileList.forEach((missile) => {
      this.targetList.forEach((target) => {
        if (missile.isVanished || target.isDestroyed) {
          return;
        }

        const targetLeft = target.x;
        const targetRight = target.x + target.width;
        const targetTop = target.y + this.#targetTopModifier;
        const targetBottom = target.y + target.height;

        const missileLeft = missile.x;
        const missileRight = missile.x + missile.width;
        const missileTop = missile.y;
        const missileBottom = missile.y + missile.height;

        if (
          targetLeft <= missileRight &&
          targetRight >= missileLeft &&
          targetTop <= missileBottom &&
          targetBottom >= missileTop
        ) {
          missile.isVanished = true;
          target.isHit = true;
          target.healthPoint -= missile.damage;
        }
      });
    });
  }
}

export default CollisionDetector;
