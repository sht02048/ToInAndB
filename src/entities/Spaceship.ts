import Explosion from "../graphics/Explosion";
import MissileLauncher from "../weapons/MissileLauncher";
import CollisionDetector from "../physics/CollisionDetector";

class SpaceShip {
  private hitFrame: number;
  private collisionDetector: CollisionDetector;

  protected height: number;
  protected frame: number;
  protected readonly missileLauncher: MissileLauncher;

  public x: number;
  public y: number;
  public width: number;
  public isDestroyed: boolean;
  public isVanished: boolean;
  public isHit: boolean;
  public isInvincible: boolean;
  public shipSpeed: number;
  public healthPoint: number;
  public readonly explosion: Explosion;

  constructor({ x, y, width, height, health, isBoss }) {
    this.x = x;
    this.y = y;
    this.isDestroyed = false;
    this.isVanished = false;
    this.isHit = false;
    this.isInvincible = false;
    this.healthPoint = health;
    this.hitFrame = 6;
    this.frame = 0;
    this.width = width;
    this.height = height;
    this.shipSpeed;

    this.explosion = new Explosion(isBoss);
    this.missileLauncher = new MissileLauncher(width, height);
    this.collisionDetector = new CollisionDetector();
    this.collisionDetector.setMissileList(this.missileLauncher.missileList);
  }

  setMissileInformation({
    projectilePath,
    x = this.x,
    y = this.y + this.width,
    missileWidth,
    missileSpeed,
    missileDamage,
    isAimed = false,
    shouldTilt = false,
  }) {
    const missileInformation = {
      projectilePath,
      x,
      y,
      missileWidth,
      missileSpeed,
      missileDamage,
      isAimed,
      shouldTilt,
    };

    return missileInformation;
  }

  noop() {
    return;
  }
}

export default SpaceShip;
