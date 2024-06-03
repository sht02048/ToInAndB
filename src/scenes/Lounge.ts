import Scene from "./Scene";

import Player from "../entities/Player";
import Cross from "../entities/enemies/Cross";
import Wings from "../entities/enemies/Wings";

class Lounge extends Scene {
  private wings: Wings;
  private crossList: Cross[];
  private player: Player;

  constructor() {
    super();

    this.wings = new Wings({ x: this.canvasWidth - 200, y: -100 });
    this.crossList = [
      new Cross({ x: 100, y: -100 }),
      new Cross({ x: 600, y: -150 }),
    ];
  }

  update() {
    this.frame += 1;
    this.respawnCross();

    this.wings.update();
    this.crossList.forEach((cross) => cross.update());
  }

  render() {
    this.wings.render();
    this.crossList.forEach((cross) => cross.render());
  }

  setTarget(player: Player) {
    this.wings.setTargetList([player]);
    this.crossList.forEach((cross) => {
      cross.setTargetList([player]);
    });

    this.player = player;
  }

  setSceneTargetList() {
    const sceneTargetList = [this.wings, ...this.crossList];

    return sceneTargetList;
  }

  checkSceneStatus() {
    this.isDone = true;

    if (!this.wings.isDestroyed && !this.wings.isVanished) {
      this.isDone = false;
    }

    this.crossList.forEach((cross) => {
      if (!cross.isDestroyed && !cross.isVanished) {
        this.isDone = false;
      }
    });

    return this.isDone;
  }

  respawnCross() {
    if (this.frame % 300 !== 0 || this.wings.isDestroyed) {
      return;
    }

    const firstRandomX =
      Math.random() * (this.canvasWidth / 2 - this.minX) + this.minX;
    const secondRandomX =
      Math.random() * (this.maxX - this.canvasWidth / 2) + this.canvasWidth / 2;
    const firstRandomY = Math.random() * 100 + 44;
    const secondRandomY = Math.random() * 100 + 44;

    const firstCross: Cross = new Cross({ x: firstRandomX, y: -firstRandomY });
    const secondCross: Cross = new Cross({
      x: secondRandomX,
      y: -secondRandomY,
    });

    firstCross.setTargetList(this.player);
    secondCross.setTargetList(this.player);

    this.crossList.push(firstCross, secondCross);
  }
}

export default Lounge;
