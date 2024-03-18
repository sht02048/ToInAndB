import Enemy from "./Enemy";

import ITEM from "../../constants/item";
import Item from "../../item/item";
import { ENEMIES, ENEMY_PROJECTILE, ITEM_IMAGE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Heavy extends Enemy {
  #missileWidth = 25;
  #missileSpeed = 2.5;
  #heavySpeed = 1;
  #missileInterval = 100;
  #missileRound = 0;
  #reloadFrame = 20;
  #isHeavyReached = false;
  #isItemSpawned = false;

  constructor(x, y) {
    super({
      x,
      y,
      health: 20,
      shipImage: ENEMIES.HEAVY,
      hitShipImage: ENEMIES.HEAVY_HIT,
      width: 50,
      height: 64,
    });

    this.powerUp = new Item(ITEM_IMAGE.SPEED_UP, ITEM.SPEED_UP);

    this.itemX;
    this.itemY;
  }

  update() {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);
    const updateItem = this.updateItem.bind(this);

    this.updateEnemy(
      launchMissile,
      setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
      updateItem,
    );

    this.itemX = this.x;
    this.itemY = this.y;
  }

  render() {
    const renderItem = this.renderItem.bind(this);

    this.renderEnemy(renderItem);
  }

  launchMissile() {
    if (this.frame % this.#missileInterval === 0 && this.y + this.height > 0) {
      this.#missileRound = 3;
    }

    if (this.#missileRound > 0 && this.frame % this.#reloadFrame === 0) {
      const missileInformation = this.setMissileInformation();

      this.loadSingleMissile(missileInformation);

      this.#missileRound -= 1;
    }
  }

  setRoute() {
    if (this.y > this.ship.canvasHeight / 3) {
      this.#isHeavyReached = true;
    }

    if (!this.#isHeavyReached) {
      this.y += this.#heavySpeed;
      return;
    }
  }

  renderItem() {
    if (this.powerUp.isGained) {
      return;
    }

    this.powerUp.renderItem();
  }

  updateItem() {
    if (!this.#isItemSpawned) {
      this.powerUp.setItemLocation(this.x, this.y);
      this.#isItemSpawned = true;
    }

    this.powerUp.update();
    this.powerUp.detectItem();
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.powerUp.setTargetList(targetList);
  }

  setMissileInformation() {
    const missileInformation = {
      projectilePath: ENEMY_PROJECTILE.AIMED,
      x: this.x,
      y: this.y,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: true,
    };

    return missileInformation;
  }
}

export default Heavy;
