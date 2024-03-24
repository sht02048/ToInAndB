import Bug from "../entities/enemies/Bug";
import Heavy from "../entities/enemies/Heavy";
import MODIFIER from "../constants/modifier";
import Renderer from "../graphics/Renderer";

class Entrance extends Renderer {
  #appearanceFrame = 300 * MODIFIER.FRAME;
  #heavyWidth = 50;
  #isDone = true;

  constructor() {
    super();

    this.bugList = Array.from({ length: 5 }, (_, index) => [
      new Bug({ x: this.minX + 100, y: index * -150 - 50, isLeft: true }),
      new Bug({ x: this.maxX - 100, y: index * -150 - 50, isLeft: false }),
    ]).flat();
    this.heavy = new Heavy(this.canvasWidth / 2 - this.#heavyWidth / 2, -200);

    this.shouldBeDisplayed = false;
    this.hasStarted = false;
  }

  update() {
    if (this.frame > this.#appearanceFrame) {
      this.bugList.forEach((bug) => bug.update());
      this.heavy.update();
    }

    this.frame += 1;
  }

  render() {
    if (this.frame > this.#appearanceFrame) {
      this.bugList.forEach((bug) => bug.render());
      this.heavy.render();
    }
  }

  setTarget(player) {
    this.bugList.forEach((bug) => bug.setTargetList(player));
    this.heavy.setTargetList(player);
  }

  setSceneTargetList() {
    const sceneTargetList = [this.heavy];

    this.bugList.forEach((bug) => sceneTargetList.push(bug));

    return sceneTargetList;
  }

  checkSceneStatus() {
    this.#isDone = true;

    this.bugList.forEach((bug) => {
      if (!bug.isDestroyed && !bug.isVanished) {
        this.#isDone = false;
      }
    });

    if (!this.heavy.isDestroyed && !this.heavy.isVanished) {
      this.#isDone = false;
    }

    return this.#isDone;
  }
}

export default Entrance;
