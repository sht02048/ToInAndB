import Renderer from "../graphics/Renderer";

import Player from "../entities/Player";
import Mini from "../entities/enemies/Mini";
import Cannon from "../entities/enemies/Cannon";
import Danger from "../entities/enemies/Danger";

class Hallway extends Renderer {
  #isDone = true;
  #miniWidth = 44;

  private mini: Mini;
  private cannonList: Cannon[];
  private dangerList: Danger[];
  private shouldBeDisplayed: boolean;
  private hasStarted: boolean;

  constructor() {
    super();

    this.mini = new Mini(this.canvasWidth / 2 - this.#miniWidth / 2, -45);
    this.cannonList = [
      new Cannon({ x: this.minX + 100, y: -100 }),
      new Cannon({ x: this.maxX - 100, y: -100 }),
    ];
    this.dangerList = Array.from({ length: 3 }, (_, index) => [
      new Danger({
        x: this.canvasWidth / 2 - 300,
        y: index * -100 - 100,
        isLeft: true,
      }),
      new Danger({
        x: this.canvasWidth / 2 + 300,
        y: index * -100 - 100,
        isLeft: false,
      }),
    ]).flat();

    this.shouldBeDisplayed = false;
    this.hasStarted = false;
  }

  update() {
    this.mini.update();
    this.cannonList.forEach((cannon) => cannon.update());
    this.dangerList.forEach((danger) => danger.update());
  }

  render() {
    this.mini.render();
    this.cannonList.forEach((cannon) => cannon.render());
    this.dangerList.forEach((danger) => danger.render());
  }

  setTarget(player: Player) {
    this.mini.setTargetList(player);
    this.cannonList.forEach((cannon) => cannon.setTargetList(player));
    this.dangerList.forEach((danger) => danger.setTargetList(player));
  }

  setSceneTargetList() {
    const sceneTargetList = [this.mini, ...this.cannonList, ...this.dangerList];

    return sceneTargetList;
  }

  checkSceneStatus() {
    this.#isDone = true;

    if (!this.mini.isDestroyed && !this.mini.isVanished) {
      this.#isDone = false;
    }

    this.cannonList.forEach((cannon) => {
      if (!cannon.isDestroyed && !cannon.isVanished) {
        this.#isDone = false;
      }
    });

    this.dangerList.forEach((danger) => {
      if (!danger.isDestroyed && !danger.isVanished) {
        this.#isDone = false;
      }
    });

    return this.#isDone;
  }
}

export default Hallway;
