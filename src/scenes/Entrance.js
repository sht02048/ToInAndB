import Bug from "../entities/enemies/Bug";
import Heavy from "../entities/enemies/Heavy";
import Renderer from "../graphics/Renderer";

class Entrance extends Renderer {
  #heavyWidth = 50;

  constructor() {
    super();

    this.bugList = Array.from({ length: 5 }, (_, index) => [
      new Bug({ x: this.minX + 100, y: index * -150, isLeft: true }),
      new Bug({ x: this.maxX - 100, y: index * -150, isLeft: false }),
    ]).flat();
    this.heavy = new Heavy(this.canvasWidth / 2 - this.#heavyWidth / 2, -200);
  }

  update() {
    this.bugList.forEach((bug) => bug.update());
    this.heavy.update();
  }

  render() {
    this.bugList.forEach((bug) => bug.render());
    this.heavy.render();
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
    let isDone = true;

    this.bugList.forEach((bug) => {
      if (!bug.isDestroyed || !isVanished) {
        isDone = false;
      }
    });

    if (!this.heavy.isDestroyed || !this.heavy.isVanished) {
      isDone = false;
    }

    return isDone;
  }
}

export default Entrance;
