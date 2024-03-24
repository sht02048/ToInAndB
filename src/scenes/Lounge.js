import Renderer from "../graphics/Renderer";
import Cross from "../entities/enemies/Cross";
import Wings from "../entities/enemies/Wings";

class Lounge extends Renderer {
  #isDone = true;

  constructor() {
    super();

    this.wings = new Wings({ x: this.canvasWidth - 200, y: -100 });
    this.crossList = [
      new Cross({ x: 100, y: -100 }),
      new Cross({ x: 600, y: -150 }),
    ];

    this.shouldBeDisplayed = false;
    this.hasStarted = false;
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

  setTarget(player) {
    this.wings.setTargetList(player);
    this.crossList.forEach((cross) => {
      cross.setTargetList(player);
    });

    this.player = player;
  }

  setSceneTargetList() {
    const sceneTargetList = [this.wings];

    this.crossList.forEach((cross) => sceneTargetList.push(cross));

    return sceneTargetList;
  }

  checkSceneStatus() {
    this.#isDone = true;

    if (!this.wings.isDestroyed && !this.wings.isVanished) {
      this.#isDone = false;
    }

    this.crossList.forEach((cross) => {
      if (!cross.isDestroyed && !cross.isVanished) {
        this.#isDone = false;
      }
    });

    return this.#isDone;
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

    const firstCross = new Cross({ x: firstRandomX, y: -firstRandomY });
    const secondCross = new Cross({ x: secondRandomX, y: -secondRandomY });

    firstCross.setTargetList(this.player);
    secondCross.setTargetList(this.player);

    this.crossList.push(firstCross, secondCross);
  }
}

export default Lounge;
