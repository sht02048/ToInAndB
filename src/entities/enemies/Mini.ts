import Enemy from "./Enemy";
import Item from "../../graphics/Item";

import ITEM_TYPE from "../../constants/item";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";
import { ENEMIES, ENEMY_PROJECTILE, ITEM_IMAGE } from "../../constants/path";

class Mini extends Enemy {
  #miniSpeed = 2;
  #missileWidth = 16;
  #missileSpeed = 2;
  #missileInterval = 200;
  #isItemSpawned = false;
  #isMiniReached = false;

  private speedUp: Item;

  constructor(x, y) {
    super({
      x,
      y,
      health: 60,
      shipImage: ENEMIES.MINI,
      width: 44,
      height: 47,
    });

    this.speedUp = new Item(ITEM_IMAGE.SPEED_UP, ITEM_TYPE.SPEED_UP);
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);
    const updateItem = this.updateItem.bind(this);

    this.updateEnemy({
      launchMissile,
      setRoute,
      command: MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY,
      updateItem,
    });
  }

  render(): void {
    const renderItem = this.renderItem.bind(this);

    this.renderEnemy(renderItem);
  }

  launchMissile(): void {
    if (
      this.frame % this.#missileInterval !== 0 ||
      this.y + this.height < 0 ||
      !this.#isMiniReached
    ) {
      return;
    }

    const missileInformation = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: false,
    });

    this.missileLauncher.loadMultipleMissile(missileInformation);
  }

  setRoute(): void {
    if (this.y > this.ship.canvasHeight / 2.5) {
      this.#isMiniReached = true;
      return;
    }

    this.y += this.#miniSpeed;
  }

  updateItem(): void {
    if (!this.#isItemSpawned) {
      this.speedUp.setItemLocation(this.x, this.y);
      this.#isItemSpawned = true;
    }

    this.speedUp.update();
    this.speedUp.detectItem();
  }

  renderItem(): void {
    if (this.speedUp.isGained) {
      return;
    }

    this.speedUp.renderItem();
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.speedUp.setTarget(targetList[0]);
  }
}

export default Mini;
