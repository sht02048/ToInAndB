import Renderer from "../graphics/Renderer";

class Missile extends Renderer {
  public isVanished: boolean;
  public damage: number;
  public speed: number;
  public vx: number;
  public vy: number;
  public angle: number;
  public targetIndex: number | null;

  constructor(imagePath: string) {
    super(imagePath);

    this.isVanished = false;
    this.damage = 1;
    this.speed;
    this.vx;
    this.vy;
    this.angle;
    this.targetIndex = null;
  }

  #checkVanished() {
    if (
      this.x < -this.width ||
      this.x > this.canvasWidth ||
      this.y < this.minY - 40 ||
      this.y > this.maxY + 40
    ) {
      this.isVanished = true;
    }
  }

  public playerStraight(missileSpeed: number): void {
    this.y -= missileSpeed;
    this.#checkVanished();
  }

  public enemyStraight(missileSpeed: number): void {
    this.y += missileSpeed;
    this.#checkVanished();
  }

  public enemyTargetMove(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.#checkVanished();
  }
}

export default Missile;
