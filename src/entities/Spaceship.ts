import Explosion from "../graphics/Explosion";
import MissileLauncher from "../weapons/MissileLauncher";
import CollisionDetector from "../physics/CollisionDetector";
import { MissileInformation } from "../types/interfaces";

class SpaceShip {
  protected hitFrame: number;
  protected frame: number;
  protected collisionDetector: CollisionDetector;
  protected readonly missileLauncher: MissileLauncher;

  public x: number;
  public y: number;
  public width: number;
  public height: number;
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
    this.shipSpeed = 0;

    this.explosion = new Explosion(isBoss);
    this.missileLauncher = new MissileLauncher(width, height);
    this.collisionDetector = new CollisionDetector();
    this.collisionDetector.setMissileList(this.missileLauncher.missileList);
  }

  public setMissileInformation({
    projectilePath,
    x = this.x,
    y = this.y + this.width,
    missileWidth,
    missileSpeed,
    missileDamage,
    isAimed = false,
    shouldTilt = false,
  }: MissileInformation) {
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
}

export default SpaceShip;
