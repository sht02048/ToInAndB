import Enemy from "./Enemy";

import Item from "../../graphics/Item";

import ITEM_TYPE from "../../constants/item";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";
import { ENEMIES, ENEMY_PROJECTILE, ITEM_IMAGE } from "../../constants/path";

class Heavy extends Enemy {
  #missileWidth = 25;
  #missileSpeed = 2.5;
  #heavySpeed = 1;
  #missileInterval = 100;
  #missileRound = 0;
  #reloadFrame = 20;
  #isHeavyReached = false;
  #isItemSpawned = false;

  private powerUp: Item;

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

    this.powerUp = new Item(ITEM_IMAGE.POWER_UP, ITEM_TYPE.POWER_UP);
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);
    const updateItem = this.updateItem.bind(this);

    this.updateEnemy(
      launchMissile,
      setRoute,
      MISSILE_ROUTE_COMMAND.ENEMY_AIMED,
      updateItem,
    );
  }

  render(): void {
    const renderItem = this.renderItem.bind(this);

    this.renderEnemy(renderItem);
  }

  launchMissile(): void {
    if (this.frame % this.#missileInterval === 0 && this.y + this.height > 0) {
      this.#missileRound = 3;
    }

    if (this.#missileRound > 0 && this.frame % this.#reloadFrame === 0) {
      const missileInformation = this.setMissileInformation({
        projectilePath: ENEMY_PROJECTILE.AIMED,
        missileWidth: this.#missileWidth,
        missileSpeed: this.#missileSpeed,
        isAimed: true,
      });

      this.missileLauncher.loadSingleMissile(missileInformation);

      this.#missileRound -= 1;
    }
  }

  setRoute(): void {
    if (this.y > this.ship.canvasHeight / 3) {
      this.#isHeavyReached = true;
    }

    if (!this.#isHeavyReached) {
      this.y += this.#heavySpeed;
    }
  }

  renderItem(): void {
    if (this.powerUp.isGained) {
      return;
    }

    this.powerUp.renderItem();
  }

  updateItem(): void {
    if (!this.#isItemSpawned) {
      this.powerUp.setItemLocation(this.x, this.y);
      this.#isItemSpawned = true;
    }

    this.powerUp.update();
    this.powerUp.detectItem();
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    // Todo 추후에 collisionDetector 로직 수정 필요. 단일 개체 혹은 배열 들어올 수 있음
    this.powerUp.setTarget(targetList[0]);
  }
}

export default Heavy;
