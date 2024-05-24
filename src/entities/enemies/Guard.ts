import Enemy from "./Enemy";
import Item from "../../graphics/Item";

import ITEM_TYPE from "../../constants/item";
import { ENEMIES, ENEMY_PROJECTILE, ITEM_IMAGE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Guard extends Enemy {
  #missileWidth = 45;
  #missileSpeed = 2;
  #diagonalSpeed = 0.2;
  #missileInterval = 160;
  #emperorSpeed = 1;
  #isEmperorReachedStartPoint = false;
  #isEmperorReachedMinX = false;
  #isEmperorReachedMaxX = false;
  #isEmperorReachedMinY = false;
  #isEmperorReachedMaxY = false;
  #isItemSpawned = false;

  private powerUp: Item;

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 200,
      shipImage: ENEMIES.EMPEROR,
      width: 71,
      height: 71,
    });

    this.powerUp = new Item(ITEM_IMAGE.POWER_UP, ITEM_TYPE.POWER_UP);
  }

  update(): void {
    const launchMissile = this.launchMissile.bind(this);
    const setRoute = this.setRoute.bind(this);
    const updateItem = this.updateItem.bind(this);

    this.updateEnemy({
      launchMissile,
      setRoute,
      command: MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT,
      updateItem,
    });

    this.frame += 1;
  }

  render(): void {
    const renderItem = this.renderItem.bind(this);

    this.renderEnemy(renderItem);
  }

  launchMissile(): void {
    if (
      this.frame % this.#missileInterval !== 0 ||
      this.y + this.height < 0 ||
      !this.#isEmperorReachedStartPoint
    ) {
      return;
    }

    const missileInformation = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.BOOMERANG,
      missileWidth: this.#missileWidth,
      missileSpeed: this.#missileSpeed,
      isAimed: false,
    });

    this.missileLauncher.loadSingleMissile(missileInformation);
  }

  setRoute(): void {
    if (
      this.y < this.ship.canvasHeight / 5 &&
      !this.#isEmperorReachedStartPoint
    ) {
      this.y += this.#emperorSpeed;
      return;
    }

    this.#isEmperorReachedStartPoint = true;

    if (this.x < 300) {
      this.#isEmperorReachedMinX = true;
      this.#isEmperorReachedMaxX = false;
    }

    if (this.x > 600) {
      this.#isEmperorReachedMaxX = true;
      this.#isEmperorReachedMinX = false;
    }

    if (this.y < 96) {
      this.#isEmperorReachedMinY = true;
      this.#isEmperorReachedMaxY = false;
    }

    if (this.y > 272) {
      this.#isEmperorReachedMaxY = true;
      this.#isEmperorReachedMinY = false;
    }

    if (this.#isEmperorReachedMaxX && !this.#isEmperorReachedMinY) {
      this.y -= Math.sqrt(2) * this.#emperorSpeed;
      return;
    }

    if (!this.#isEmperorReachedMinX && !this.#isEmperorReachedMinY) {
      this.y -= Math.sqrt(2) * this.#diagonalSpeed;
      this.x -= Math.sqrt(6) * this.#diagonalSpeed;
      return;
    }

    if (!this.#isEmperorReachedMaxX && !this.#isEmperorReachedMaxY) {
      this.y += Math.sqrt(2) * this.#diagonalSpeed;
      this.x += Math.sqrt(6) * this.#diagonalSpeed;
      return;
    }

    if (!this.#isEmperorReachedMinX && !this.#isEmperorReachedMaxY) {
      this.y += Math.sqrt(2) * this.#diagonalSpeed;
      this.x -= Math.sqrt(6) * this.#diagonalSpeed;
      return;
    }

    if (this.#isEmperorReachedMinX && this.#isEmperorReachedMaxY) {
      this.y -= Math.sqrt(2) * this.#emperorSpeed;
    }
  }

  updateItem(): void {
    if (!this.#isItemSpawned) {
      this.powerUp.setItemLocation(this.x, this.y);
      this.#isItemSpawned = true;
    }

    this.powerUp.update();
    this.powerUp.detectItem();
  }

  renderItem(): void {
    if (this.powerUp.isGained) {
      return;
    }

    this.powerUp.renderItem();
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);
    this.powerUp.setTarget(targetList[0]);
  }
}

export default Guard;
