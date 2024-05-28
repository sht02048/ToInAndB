import ITEM_TYPE from "../constants/item";
import Player from "../entities/Player";
import SpaceShip from "../entities/Spaceship";
import Item from "../graphics/Item";
import Missile from "../weapons/Missile";

class CollisionDetector {
  #hitBoxModifier = 10;

  private targetList: SpaceShip[];
  private missileList: Missile[];
  private item: Item;
  private player: Player;

  setTargetList(targetList: SpaceShip[]) {
    this.targetList = targetList;
  }

  setMissileList(missileList: Missile[]) {
    this.missileList = missileList;
  }

  setItem(item: Item) {
    this.item = item;
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  detectItem() {
    if (
      this.item.isGained ||
      this.player.isDestroyed ||
      !this.isOverLapping(this.item, this.player)
    ) {
      return;
    }

    switch (this.item.type) {
      case ITEM_TYPE.POWER_UP: {
        this.player.level += 1;
        break;
      }

      case ITEM_TYPE.SPEED_UP: {
        this.player.shipSpeed += 1.5;
        break;
      }
    }

    this.item.isGained = true;
  }

  detectCollision() {
    this.missileList.forEach((missile) => {
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

  isOverLapping(gameObject, target): boolean {
    const targetLeft = target.x;
    const targetRight = target.x + target.width;
    const targetTop = target.y + this.#hitBoxModifier;
    const targetBottom = target.y + target.height - this.#hitBoxModifier;

    const objectLeft = gameObject.x;
    const objectRight = gameObject.x + gameObject.width;
    const objectTop = gameObject.y;
    const objectBottom = gameObject.y + gameObject.height;

    return (
      targetLeft < objectRight &&
      targetRight > objectLeft &&
      targetTop < objectBottom &&
      targetBottom > objectTop
    );
  }
}

export default CollisionDetector;
