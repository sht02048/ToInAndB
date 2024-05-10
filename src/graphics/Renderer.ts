class Renderer {
  #leftBlockSize = 100;
  #rightBlockSize = 145;
  #playerShipHeight = 61;

  private imagePath?: string;
  private image: HTMLImageElement;
  private introCanvas: HTMLCanvasElement;
  private introCtx: CanvasRenderingContext2D;

  protected frame: number;
  protected width: number;

  public height: number;
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
    this.image.src = this.imagePath || "";

    this.mainCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    this.introCanvas = document.getElementById("intro-canvas") as HTMLCanvasElement;
    this.mainCtx = this.mainCanvas.getContext("2d");
    this.introCtx = this.introCanvas.getContext("2d");
    this.canvasWidth = this.mainCanvas.width;
    this.canvasHeight = this.mainCanvas.height;
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
    if (width !== undefined && height !== undefined) {
      this.mainCtx.drawImage(this.image, x, y, width, height);

      return;
    }

    this.mainCtx.drawImage(this.image, x, y);
  }

  renderAngle(x: number, y: number, width: number, height: number, angle: number): void {
    this.mainCtx.save();
    this.mainCtx.translate(x, y + 10);
    this.mainCtx.rotate(angle);
    this.mainCtx.drawImage(this.image, -width, -height, width, height);
    this.mainCtx.restore();
  }

  renderIntro(x: number, y: number, width: number, height: number): void  {
    this.introCtx.drawImage(this.image, x, y, width, height);
  }
}

export default Renderer;
