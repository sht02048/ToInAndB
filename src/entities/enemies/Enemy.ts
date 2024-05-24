import SpaceShip from "../Spaceship";
import Renderer from "../../graphics/Renderer";

class Enemy extends SpaceShip {
  private hitShip: Renderer;
  private isBoss: boolean;

  protected ship: Renderer;
  public shouldMakeExplosionSound: boolean;

  constructor({
    x,
    y,
    health,
    shipImage,
    hitShipImage,
    width,
    height,
    isBoss = false,
  }) {
    super({
      x,
      y,
      width,
      height,
      health,
      isBoss,
    });
    this.ship = new Renderer(shipImage);
    this.hitShip = new Renderer(hitShipImage);

    this.shouldMakeExplosionSound = true;
    this.width = width;
    this.height = height;
    this.isBoss = isBoss;
  }

  updateEnemy(launchMissile, setRoute, command, updateItem = this.noop): void {
    if (!this.isBoss || (this.isBoss && !this.isDestroyed)) {
      this.collisionDetector.detectCollision();
    }

    this.missileLauncher.setMissileRoute(command);

    if (this.isDestroyed || this.isVanished) {
      updateItem();
      return;
    }

    launchMissile();
    setRoute();
    this.checkShipStatus();

    this.frame += 1;
  }

  renderEnemy(renderItem = this.noop): void {
    this.missileLauncher.render();

    if (this.isDestroyed) {
      this.explosion.render(
        this.x,
        this.y,
        this.width,
        this.shouldMakeExplosionSound,
      );

      renderItem();

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
    this.hitFrame -= 1;
    this.hitShip.render(this.x, this.y);

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
}

export default Enemy;
