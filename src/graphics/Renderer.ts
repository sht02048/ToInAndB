class Renderer {
  #leftBlockSize = 100;
  #rightBlockSize = 145;
  #playerShipHeight = 61;

  private imagePath?: string;
  private image: HTMLImageElement;
  private introCanvas: HTMLCanvasElement;
  private introCtx: CanvasRenderingContext2D;

  protected frame: number;

  public height: number;
  public width: number;
  public x: number | null;
  public y: number | null;
  public readonly maxX: number;
  public readonly minY: number;
  public readonly maxY: number;
  public readonly minX: number;
  public readonly canvasWidth: number;
  public readonly canvasHeight: number;
  public readonly mainCanvas: HTMLCanvasElement;
  public readonly mainCtx: CanvasRenderingContext2D;
  public readonly inAndOutSpeed: number;

  constructor(imagePath?: string) {
    this.imagePath = imagePath;
    this.image = new Image();
    this.image.src = this.imagePath;

    this.mainCanvas = document.getElementById(
      "main-canvas",
    ) as HTMLCanvasElement;
    this.introCanvas = document.getElementById(
      "intro-canvas",
    ) as HTMLCanvasElement;
    this.mainCtx = this.mainCanvas.getContext("2d");
    this.introCtx = this.introCanvas.getContext("2d");
    this.canvasWidth = this.mainCanvas.width;
    this.canvasHeight = this.mainCanvas.height;
    this.x = null;
    this.y = null;
    this.minX = this.#leftBlockSize;
    this.maxX = this.canvasWidth - this.#rightBlockSize;
    this.minY = -10;
    this.maxY = this.canvasHeight - this.#playerShipHeight + 5;
    this.inAndOutSpeed = 4;
    this.frame = 0;

    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };
  }

  render(x: number, y: number, width?: number, height?: number): void {
    if (width && height) {
      this.mainCtx.drawImage(this.image, x, y, width, height);
    } else {
      this.mainCtx.drawImage(this.image, x, y);
    }
  }

  renderAngle(
    x: number,
    y: number,
    width: number,
    height: number,
    angle: number,
  ): void {
    this.mainCtx.save();
    this.mainCtx.translate(x + width / 2, y + height / 2);
    this.mainCtx.rotate(angle);
    this.mainCtx.drawImage(this.image, -width / 2, -height / 2, width, height);
    this.mainCtx.restore();
  }

  renderIntro(x: number, y: number, width: number, height: number): void {
    this.introCtx.drawImage(this.image, x, y, width, height);
  }
}

export default Renderer;
