abstract class Background {
  public shouldBeDisplayed: boolean;
  public shouldOut: boolean;
  protected x: number;
  protected y: number;

  constructor() {
    this.shouldBeDisplayed = false;
    this.x = 0;
    this.y = 0;
  }

  public abstract render(): void;
}

export default Background;
