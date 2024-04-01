import Cockpit from "./Cockpit";
import SpaceShip from "./Spaceship";

import MissileLauncher from "../weapons/MissileLauncher";
import CollisionDetector from "../physics/CollisionDetector";

import Renderer from "../graphics/Renderer";
import Explosion from "../graphics/Explosion";

import TEAM from "../constants/team";
import MODIFIER from "../constants/modifier";
import PLAYER_HEALTH from "../constants/playerHealth";
import { PLAYER, PROJECTILE } from "../constants/path";
import MISSILE_ROUTE_COMMAND from "../constants/missileRouteCommand";

class Player extends SpaceShip {
  #staticWidth = 35;
  #staticHeight = 49;
  #straightMissileWidth = 36;
  #straightMissileSpeed = 5 * MODIFIER.SPEED;
  #straightMissileReload = 16 * MODIFIER.FRAME;
  #guidedMissileGap = 80;
  #guidedMissileSpeed = 3 * MODIFIER.SPEED;
  #guidedMissileReload = 100 * MODIFIER.FRAME;
  #missileDamage = 2;
  #isPlayerIn = false;
  #outSpeed = 1.5 * MODIFIER.SPEED;

  constructor() {
    super();

    this.explosion = new Explosion();
    this.leftShip = new Renderer(PLAYER.LEFT);
    this.rightShip = new Renderer(PLAYER.RIGHT);
    this.staticShip = new Renderer(PLAYER.STATIC);
    this.straightShip = new Renderer(PLAYER.STRAIGHT);
    this.straightMissileLauncher = new MissileLauncher(
      this.#staticWidth,
      this.#staticHeight,
    );
    this.guidedMissileLauncher = new MissileLauncher(
      this.#staticWidth,
      this.#staticHeight,
    );
    this.straightCollisionDetector = new CollisionDetector(
      this.straightMissileLauncher.missileList,
    );
    this.guidedCollisionDetector = new CollisionDetector(
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
    this.healthPoint = PLAYER_HEALTH;
    this.shipSpeed = 2 * MODIFIER.SPEED;
    this.isShooting = false;
    this.reloadFrame = 10 * MODIFIER.FRAME;
    this.invincibleFrame = 200 * MODIFIER.FRAME;
    this.isInvincible = false;
    this.straightProjectile = PROJECTILE.LEVEL_1;
    this.guidedProjectile = PROJECTILE.GUIDED;
    this.shouldOut = false;
    this.isOut = false;

    this.cockpit = new Cockpit(this);
  }

  update() {
    this.frame += 1;

    this.cockpit.checkPlayerStatus(this.level, this.shipSpeed);
    this.straightMissileLauncher.setMissileRoute(
      MISSILE_ROUTE_COMMAND.PLAYER_STRAIGHT,
      this.#straightMissileSpeed,
    );
    this.guidedMissileLauncher.setMissileRoute(
      MISSILE_ROUTE_COMMAND.GUIDED,
      this.#guidedMissileSpeed,
    );

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

      if (this.invincibleFrame > 100 * MODIFIER.FRAME) {
        return;
      }
    }

    this.launchMissile();
    this.setSize();
    this.upgrade();
    this.cockpit.makeShotSound();
    this.cockpit.control(this.shipSpeed);
    this.straightCollisionDetector.detectCollision();
    this.guidedCollisionDetector.detectCollision();
  }

  render() {
    this.guidedMissileLauncher.render();
    this.straightMissileLauncher.render();

    if (this.isHit) {
      this.explosion.render(this.x, this.y, this.#staticWidth);
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
    if (this.invincibleFrame > 100 * MODIFIER.FRAME) {
      this.y -= 2 * MODIFIER.SPEED;
    }

    if (this.invincibleFrame < 0) {
      this.isInvincible = false;
      this.invincibleFrame = 200 * MODIFIER.FRAME;
    }
  }

  upgrade() {
    switch (this.level) {
      case 2:
        this.#missileDamage = 3;
        this.straightProjectile = PROJECTILE.LEVEL_2;
        this.#straightMissileWidth = 52;
        break;

      case 3:
        this.#missileDamage = 4;
        this.straightProjectile = PROJECTILE.LEVEL_3;
        this.#straightMissileWidth = 106;
        break;
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
    const missileInformation = this.setMissileInformation(
      this.straightProjectile,
      this.x,
      this.y,
      this.#straightMissileWidth,
      this.#straightMissileSpeed,
    );

    this.straightMissileLauncher.loadSingleAmmo(missileInformation);
  }

  loadGuidedMissile() {
    const leftX = this.x - this.currentDirection.width / 2;
    const rightX = this.x + this.currentDirection.width / 2;
    const sharedY = this.y + this.currentDirection.height / 2;

    const leftWidth = this.#guidedMissileGap;
    const rightWidth = -this.#guidedMissileGap / 2;

    const leftMissileInformation = this.setMissileInformation(
      this.guidedProjectile,
      leftX,
      sharedY,
      leftWidth,
      this.#guidedMissileSpeed,
    );
    const rightMissileInformation = this.setMissileInformation(
      this.guidedProjectile,
      rightX,
      sharedY,
      rightWidth,
      this.#guidedMissileSpeed,
    );

    this.guidedMissileLauncher.loadSingleAmmo(leftMissileInformation);
    this.guidedMissileLauncher.loadSingleAmmo(rightMissileInformation);
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
    this.straightMissileLauncher.setTargetList(targetList);
    this.guidedMissileLauncher.setTargetList(targetList);
  }

  setSize() {
    this.width = this.currentDirection.width;
    this.height = this.currentDirection.height;
  }

  setMissileInformation(
    projectilePath,
    positionX,
    positionY,
    missileWidth,
    missileSpeed,
  ) {
    const missileInformation = {
      projectilePath: projectilePath,
      x: positionX,
      y: positionY,
      missileWidth: missileWidth,
      missileDamage: this.#missileDamage,
      missileSpeed: missileSpeed,
      team: TEAM.PLAYER,
    };

    return missileInformation;
  }
}

export default Player;
