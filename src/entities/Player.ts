import Cockpit from "./Cockpit";
import SpaceShip from "./Spaceship";

import MissileLauncher from "../weapons/MissileLauncher";
import CollisionDetector from "../physics/CollisionDetector";

import Renderer from "../graphics/Renderer";

import PLAYER_HEALTH from "../constants/playerHealth";
import { PLAYER, PROJECTILE } from "../constants/path";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class Player extends SpaceShip {
  #staticWidth = 35;
  #staticHeight = 49;
  #straightMissileWidth = 36;
  #straightMissileSpeed = 5;
  #straightMissileReload = 16;
  #guidedMissileGap = 80;
  #guidedMissileSpeed = 3;
  #guidedMissileReload = 100;
  #missileDamage = 2;
  #isPlayerIn = false;
  #outSpeed = 1.5;

  private guidedMissileLauncher: MissileLauncher;
  private straightCollisionDetector: CollisionDetector;
  private guidedCollisionDetector: CollisionDetector;
  private canvasHeight: number;
  private spawnX: number;
  private spawnY: number;
  private initialY: number;
  private reloadFrame: number;
  private invincibleFrame: number;
  private straightProjectile: string;
  private guidedProjectile: string;
  private isOut: boolean;
  private cockpit: Cockpit;

  public shouldOut: boolean;
  public level: number;
  public isShooting: boolean;
  public currentDirection: Renderer;
  public readonly canvasWidth: number;
  public readonly leftShip: Renderer;
  public readonly rightShip: Renderer;
  public readonly staticShip: Renderer;
  public readonly straightShip: Renderer;

  constructor() {
    super({
      x: 0,
      y: 0,
      width: 35,
      height: 49,
      health: PLAYER_HEALTH,
      isBoss: false,
    });

    this.leftShip = new Renderer(PLAYER.LEFT);
    this.rightShip = new Renderer(PLAYER.RIGHT);
    this.staticShip = new Renderer(PLAYER.STATIC);
    this.straightShip = new Renderer(PLAYER.STRAIGHT);
    this.guidedMissileLauncher = new MissileLauncher(
      this.#staticWidth,
      this.#staticHeight,
    );
    this.straightCollisionDetector = new CollisionDetector();
    this.straightCollisionDetector.setMissileList(
      this.missileLauncher.missileList,
    );
    this.guidedCollisionDetector = new CollisionDetector();
    this.guidedCollisionDetector.setMissileList(
      this.guidedMissileLauncher.missileList,
    );

    this.currentDirection = this.staticShip;
    this.canvasWidth = this.currentDirection.canvasWidth;
    this.canvasHeight = this.currentDirection.canvasHeight;
    this.spawnX = this.canvasWidth / 2 - this.#staticWidth / 2;
    this.spawnY = this.canvasHeight + this.#staticHeight;

    this.initialY = this.canvasHeight;
    this.x = this.spawnX;
    this.y = this.canvasHeight - this.#staticHeight * 3;

    this.level = 1;
    this.shipSpeed = 2;
    this.isShooting = false;
    this.reloadFrame = 10;
    this.invincibleFrame = 200;
    this.straightProjectile = PROJECTILE.LEVEL_1;
    this.guidedProjectile = PROJECTILE.GUIDED;
    this.shouldOut = false;
    this.isOut = false;

    this.cockpit = new Cockpit(this);
  }

  update() {
    this.frame += 1;

    this.cockpit.checkPlayerStatus(this.level, this.shipSpeed);
    this.missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.PLAYER_STRAIGHT);
    this.guidedMissileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.GUIDED);
    this.straightCollisionDetector.detectCollision();
    this.guidedCollisionDetector.detectCollision();

    if (this.shouldOut) {
      this.out();
      return;
    }

    if (!this.#isPlayerIn) {
      this.in();
      return;
    }

    if (this.isHit) {
      this.isInvincible = true;
      this.updateExplosion();
      return;
    }

    if (this.isInvincible) {
      this.updateSpawn();
      this.invincibleFrame -= 1;

      if (this.invincibleFrame > 100) {
        return;
      }
    }

    this.launchMissile();
    this.setSize();
    this.upgrade();
    this.cockpit.makeShotSound();
    this.cockpit.control(this.shipSpeed);
  }

  render() {
    this.guidedMissileLauncher.render();
    this.missileLauncher.render();

    if (this.isHit) {
      this.explosion.render(this.x, this.y, this.#staticWidth, true);
      return;
    }

    if (this.isInvincible) {
      this.renderSpawn();
      return;
    }

    if (this.shouldOut) {
      this.straightShip.render(this.x, this.y);
      return;
    }

    this.currentDirection.render(this.x, this.y - this.initialY);
  }

  updateExplosion() {
    this.isHit = !this.explosion.isExploded();

    if (!this.isHit) {
      this.x = this.spawnX;
      this.y = this.spawnY;
    }
  }

  renderSpawn() {
    this.straightShip.mainCtx.save();
    this.straightShip.mainCtx.globalAlpha = 0.4;
    this.straightShip.render(this.x, this.y - this.initialY);
    this.straightShip.mainCtx.restore();
  }

  updateSpawn() {
    if (this.invincibleFrame > 100) {
      this.y -= 2;
    }

    if (this.invincibleFrame < 0) {
      this.isInvincible = false;
      this.invincibleFrame = 200;
    }
  }

  upgrade() {
    switch (this.level) {
      case 2: {
        this.#missileDamage = 3;
        this.straightProjectile = PROJECTILE.LEVEL_2;
        this.#straightMissileWidth = 52;
        break;
      }

      case 3: {
        this.#missileDamage = 4;
        this.straightProjectile = PROJECTILE.LEVEL_3;
        this.#straightMissileWidth = 106;
        break;
      }
    }
  }

  launchMissile() {
    if (!this.isShooting) {
      return;
    }

    this.reloadFrame += 1;

    if (this.reloadFrame % this.#straightMissileReload === 0) {
      this.loadStraightMissile();
    }

    if (this.reloadFrame % this.#guidedMissileReload === 0 && this.level > 1) {
      this.loadGuidedMissile();
    }
  }

  loadStraightMissile() {
    const missileInformation = this.setMissileInformation({
      projectilePath: this.straightProjectile,
      x: this.x,
      y: this.y - this.#staticHeight,
      missileWidth: this.#straightMissileWidth,
      missileSpeed: this.#straightMissileSpeed,
      missileDamage: this.#missileDamage,
    });

    this.missileLauncher.loadSingleMissile(missileInformation);
  }

  loadGuidedMissile() {
    const leftX = this.x - this.currentDirection.width / 2;
    const rightX = this.x + this.currentDirection.width / 2;
    const sharedY = this.y + this.currentDirection.height / 2;

    const leftWidth = this.#guidedMissileGap;
    const rightWidth = -this.#guidedMissileGap / 2;

    const leftMissileInformation = this.setMissileInformation({
      projectilePath: this.guidedProjectile,
      x: leftX,
      y: sharedY,
      missileWidth: leftWidth,
      missileSpeed: this.#guidedMissileSpeed,
      missileDamage: this.#missileDamage,
    });
    const rightMissileInformation = this.setMissileInformation({
      projectilePath: this.guidedProjectile,
      x: rightX,
      y: sharedY,
      missileWidth: rightWidth,
      missileSpeed: this.#guidedMissileSpeed,
      missileDamage: this.#missileDamage,
    });

    this.guidedMissileLauncher.loadSingleMissile(leftMissileInformation);
    this.guidedMissileLauncher.loadSingleMissile(rightMissileInformation);
  }

  in() {
    if (this.initialY < 0) {
      this.#isPlayerIn = true;
    }

    this.initialY -= this.currentDirection.inAndOutSpeed;
  }

  out() {
    if (this.y < 0) {
      this.isOut = true;
    }

    this.y -= this.#outSpeed;
  }

  setTargetList(targetList) {
    this.straightCollisionDetector.setTargetList(targetList);
    this.guidedCollisionDetector.setTargetList(targetList);
    this.missileLauncher.setTargetList(targetList);
    this.guidedMissileLauncher.setTargetList(targetList);
  }

  setSize() {
    this.width = this.currentDirection.width;
    this.height = this.currentDirection.height;
  }
}

export default Player;
