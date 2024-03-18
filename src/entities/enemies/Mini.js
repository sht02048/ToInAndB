import Enemy from "./Enemy";

import Item from "../../item/item";
import ITEM_TYPE from "../../constants/item";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";
import { ENEMIES, ENEMY_PROJECTILE, ITEM_IMAGE } from "../../constants/path";

class Mini extends Enemy {
  #miniSpeed = 2;
  #missileWidth = 16;
  #missileSpeed = 2;
  #missileInterval = 300;
  #isItemSpawned = false;
  #isMiniReached = false;

  constructor(x, y) {
    super({
      x,
      y,
      health: 60,
      shipImage: ENEMIES.MINI,
      hitShipImage: ENEMIES.MINI_HIT,
      width: 44,
      height: 47,
    });

    this.speedUp = new Item(ITEM_IMAGE.SPEED_UP, ITEM_TYPE.SPEED_UP);
  }

  update() {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);
    const updateItem = this.updateItem.bind(this);

    this.updateEnemy(
      launchMissile,
      setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY,
      updateItem,
    );
  }

  render() {
    const renderItem = this.renderItem.bind(this);

    this.renderEnemy(renderItem);
  }

  launchMissile() {
    if (
      this.frame % this.#missileInterval !== 0 ||
      this.y + this.height < 0 ||
      !this.#isMiniReached
    ) {
      return;
    }

    const missileInformation = this.setMissileInformation();

    this.loadMultipleMissile(missileInformation);

    this.#missileInterval = 300;
  }

  setRoute() {
    if (this.y > this.ship.canvasHeight / 2.5) {
      this.#isMiniReached = true;
      return;
    }

    this.y += this.#miniSpeed;
  }

  updateItem() {
    if (!this.#isItemSpawned) {
      this.speedUp.setItemLocation(this.x, this.y);
      this.#isItemSpawned = true;
    }

    this.speedUp.update();
    this.speedUp.detectItem();
  }

  renderItem() {
    if (this.speedUp.isGained) {
      return;
    }

    this.speedUp.renderItem();
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.speedUp.setTargetList(targetList);
  }

  setMissileInformation() {
    const missileInformation = {
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      x: this.x,
      y: this.y,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: false,
    };

    return missileInformation;
  }
}

export default Mini;
