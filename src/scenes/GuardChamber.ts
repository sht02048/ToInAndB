import Renderer from "../graphics/Renderer";

import Player from "../entities/Player";
import Guard from "../entities/enemies/Guard";
import Cow from "../entities/enemies/Cow";

class GuardChamber extends Renderer {
  #emperorWidth = 71;
  #isDone = true;

  private guard: Guard;
  private cowLeftList: Cow[];
  private cowRightList: Cow[];
  private shouldBeDisplayed: boolean;
  private hasStarted: boolean;

  constructor() {
    super();

    this.guard = new Guard({
      x: this.canvasWidth / 2 - this.#emperorWidth / 2,
      y: -100,
    });
    this.cowLeftList = [
      new Cow({
        x: this.canvasWidth / 2 - this.#emperorWidth / 2,
        y: -150,
      }),
      new Cow({
        x: this.canvasWidth / 2 - this.#emperorWidth / 2,
        y: -200,
      }),
    ];
    this.cowRightList = [
      new Cow({
        x: this.canvasWidth / 2 - this.#emperorWidth / 2,
        y: -150,
      }),
      new Cow({
        x: this.canvasWidth / 2 - this.#emperorWidth / 2,
        y: -200,
      }),
    ];

    this.shouldBeDisplayed = false;
    this.hasStarted = false;
  }

  update() {
    this.guard.update();
    this.cowLeftList.forEach((cow, index) =>
      cow.update(
        this.guard.x - (index + 1) * 100,
        this.guard.y - (index + 1) * 50,
      ),
    );
    this.cowRightList.forEach((cow, index) =>
      cow.update(
        this.guard.x + (index + 1) * 100,
        this.guard.y - (index + 1) * 50,
      ),
    );
  }

  render() {
    this.guard.render();
    this.cowLeftList.forEach((cow) => cow.render());
    this.cowRightList.forEach((cow) => cow.render());
  }

  setTarget(player: Player) {
    this.guard.setTargetList(player);
    this.cowLeftList.forEach((cow) => cow.setTargetList(player));
    this.cowRightList.forEach((cow) => cow.setTargetList(player));
  }

  setSceneTargetList() {
    const sceneTargetList = [this.guard, ...this.cowLeftList, ...this.cowRightList];

    return sceneTargetList;
  }

  checkSceneStatus() {
    this.#isDone = true;

    if (!this.guard.isDestroyed && !this.guard.isVanished) {
      this.#isDone = false;
    }

    this.cowLeftList.forEach((cow) => {
      if (!cow.isDestroyed && !cow.isVanished) {
        this.#isDone = false;
      }
    });

    this.cowRightList.forEach((cow) => {
      if (!cow.isDestroyed && !cow.isVanished) {
        this.#isDone = false;
      }
    });

    return this.#isDone;
  }
}

export default GuardChamber;
