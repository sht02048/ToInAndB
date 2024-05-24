import Renderer from "../graphics/Renderer";

import Player from "../entities/Player";
import Bug from "../entities/enemies/Bug";
import Heavy from "../entities/enemies/Heavy";

class Entrance extends Renderer {
  #appearanceFrame = 300;
  #heavyWidth = 50;
  #isDone = true;

  private bugList: Bug[];
  private heavy: Heavy;
  private shouldBeDisplayed: boolean;
  private hasStarted: boolean;

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

  update(): void {
    if (this.frame > this.#appearanceFrame) {
      this.bugList.forEach((bug) => bug.update());
      this.heavy.update();
    }

    this.frame += 1;
  }

  render(): void {
    if (this.frame > this.#appearanceFrame) {
      this.bugList.forEach((bug) => bug.render());
      this.heavy.render();
    }
  }

  setTarget(player: Player): void {
    this.bugList.forEach((bug) => bug.setTargetList(player));
    this.heavy.setTargetList(player);
  }

  setSceneTargetList(): (Heavy | Bug)[] {
    const sceneTargetList = [this.heavy, ...this.bugList];

    return sceneTargetList;
  }

  checkSceneStatus(): boolean {
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
