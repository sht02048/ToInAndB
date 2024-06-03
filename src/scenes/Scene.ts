import Player from "../entities/Player";
import Renderer from "../graphics/Renderer";

abstract class Scene extends Renderer {
  protected isDone: boolean;
  public shouldBeDisplayed: boolean;
  public hasStarted: boolean;

  constructor() {
    super();

    this.shouldBeDisplayed = false;
    this.hasStarted = false;
    this.isDone = false;
  }

  abstract update(): void;
  abstract setTarget(player: Player): void;
  abstract setSceneTargetList();
  abstract checkSceneStatus(): void;
  abstract render(): void;
}

export default Scene;
