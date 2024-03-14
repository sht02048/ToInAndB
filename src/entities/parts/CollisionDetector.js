import DistanceCalculator from "../../utils/DistanceCalculator";

class CollisionDetector {
  constructor(missileList) {
    this.missileList = missileList;
    this.distanceCalculator = new DistanceCalculator();
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
        const targetTop = target.y;
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
          target.isDestroyed = true;
        }
      });
    });
  }
}

export default CollisionDetector;
