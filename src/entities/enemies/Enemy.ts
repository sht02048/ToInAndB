import SpaceShip from "../Spaceship";
import Renderer from "../../graphics/Renderer";

interface EnemyUpdateInformation {
  launchMissile?: () => void;
  setRoute: () => void;
  command: string;
  updateItem?: () => void;
}

class Enemy extends SpaceShip {
  private hitShip: Renderer;
  private isBoss: boolean;

  protected ship: Renderer;
  public shouldMakeExplosionSound: boolean;

  constructor({ x, y, health, shipImage, width, height, isBoss = false }) {
    super({
      x,
      y,
      width,
      height,
      health,
      isBoss,
    });
    this.ship = new Renderer(shipImage);

    this.shouldMakeExplosionSound = true;
    this.width = width;
    this.height = height;
    this.isBoss = isBoss;
  }

  updateEnemy({
    launchMissile,
    setRoute,
    command,
    updateItem,
  }: EnemyUpdateInformation): void {
    this.isInvincible = this.isAboveCanvas();

    if (!this.isBoss || (this.isBoss && !this.isDestroyed)) {
      this.collisionDetector.detectCollision();
    }

    this.missileLauncher.setMissileRoute(command);

    if (this.isDestroyed || this.isVanished) {
      if (updateItem !== undefined) {
        updateItem();
      }

      return;
    }

    if (launchMissile !== undefined) {
      launchMissile();
    }

    setRoute();
    this.checkShipStatus();

    this.frame += 1;
  }

  renderEnemy(renderItem?: () => void): void {
    this.missileLauncher.render();

    if (this.isDestroyed) {
      this.explosion.render(
        this.x,
        this.y,
        this.width,
        this.shouldMakeExplosionSound,
      );

      if (renderItem !== undefined) {
        renderItem();
      }

      return;
    }

    if (this.isVanished) {
      return;
    }

    if (this.isHit) {
      this.renderHit();
      return;
    }

    this.ship.render(this.x, this.y);
  }

  renderHit(): void {
    this.ship.mainCtx.save();
    this.ship.mainCtx.filter = "brightness(120%)";
    this.ship.render(this.x, this.y);
    this.ship.mainCtx.restore();

    this.hitFrame -= 1;

    if (this.hitFrame === 0) {
      this.isHit = false;
      this.hitFrame = 6;
    }
  }

  checkShipStatus(): void {
    if (this.healthPoint <= 0) {
      this.isDestroyed = true;
    }

    if (
      this.y - this.height > this.ship.maxY ||
      this.x > this.ship.canvasWidth ||
      this.x < 0
    ) {
      this.isVanished = true;
    }
  }

  isAboveCanvas(): boolean {
    if (this.y < 0) {
      return true;
    }

    return false;
  }
}

export default Enemy;
