import Enemy from "./Enemy";

import Sound from "../../utils/Sound";
import MissileLauncher from "../../weapons/MissileLauncher";
import CollisionDetector from "../../physics/CollisionDetector";

import MODIFIER from "../../constants/modifier";
import { AUDIO, ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

class Boss extends Enemy {
  #bossWidth = 228;
  #bossHeight = 218;
  #bossSpeed = 1 * MODIFIER.SPEED;
  #isAtInitial = false;
  #shouldMoveForward = true;
  #shouldMoveSide = true;
  #isAtMinX = false;
  #isAtMaxX = false;
  #sideCycle = 3;
  #allWayFrame = 600 * MODIFIER.FRAME;
  #allWayInterval = 10 * MODIFIER.FRAME;
  #allWayWidth = 16;
  #allWaySpeed = 1 * MODIFIER.SPEED;
  #guidedHaltFrame = 300 * MODIFIER.FRAME;
  #guidedInterval = 50 * MODIFIER.FRAME;
  #guidedWidth = 23;
  #guidedSpeed = 2 * MODIFIER.SPEED;
  #straightInterval = 30 * MODIFIER.FRAME;
  #straightWidth = 12;
  #straightSpeed = 3 * MODIFIER.SPEED;
  #resetFrame = 400 * MODIFIER.FRAME;
  #AudioVolume = 0.7;
  #AudioFadeOutFrame = 200 * MODIFIER.FRAME;
  #missileLaunchers = {};
  #collisionDetectors = {};

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 600,
      shipImage: ENEMIES.BOSS,
      hitShipImage: ENEMIES.BOSS_HIT,
      width: 228,
      height: 218,
      isBoss: true,
    });

    this.backgroundMusic = new Sound(AUDIO.BOSS);
    this.backgroundMusic.sound.volume = this.#AudioVolume;
    this.#setWeapon();
    this.shouldSpawnBot = false;
  }

  update() {
    if (this.backgroundMusic.sound.currentTime > 52) {
      this.adjustBossAudio();
    }

    if (!this.isDestroyed) {
      this.detectCollision();
    }

    this.setMissileRoute();

    const setRoute = this.setRoute.bind(this);
    this.updateEnemy(this.noop, setRoute, MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY);
  }

  render() {
    this.renderEnemy();

    const launchers = Object.values(this.#missileLaunchers);
    launchers.forEach((launcher) => launcher.render());
  }

  setRoute() {
    if (!this.#isAtInitial) {
      this.#isAtInitial = this.setInitialPosition();
      return;
    }

    if (this.#guidedHaltFrame > 0) {
      this.#guidedHaltFrame -= 1;
      this.launchGuided();
      return;
    }

    if (this.#shouldMoveForward) {
      this.shouldSpawnBot = true;
      this.moveForward();
      return;
    }

    if (this.#shouldMoveSide) {
      this.moveSideToSide();
      this.launchStraight();

      return;
    }

    if (this.#allWayFrame > 0) {
      this.#allWayFrame -= 1;
      this.launchAllWay();

      return;
    }

    if (this.#resetFrame > 0) {
      this.#resetFrame -= 1;
      return;
    }

    this.#guidedHaltFrame = 300 * MODIFIER.FRAME;
    this.#allWayFrame = 400 * MODIFIER.FRAME;
    this.#resetFrame = 400 * MODIFIER.FRAME;
    this.#shouldMoveForward = true;
    this.#sideCycle = 3;
    this.#shouldMoveSide = true;
    this.#isAtMinX = false;
    this.#isAtMaxX = false;
  }

  launchAllWay() {
    if (this.frame % this.#allWayInterval !== 0) {
      return;
    }

    const allWayMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      y: this.y - this.#bossHeight / 2,
      missileWidth: this.#allWayWidth,
      missileSpeed: this.#allWaySpeed,
      shouldTilt: true,
    });

    this.loadMultipleMissile(allWayMissile);
  }

  launchGuided() {
    if (this.frame % this.#guidedInterval !== 0) {
      return;
    }

    const leftMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.GUIDED,
      x: this.x - this.#bossWidth / 2,
      y: this.y - this.#bossHeight / 2,
      missileWidth: this.#guidedWidth,
      missileSpeed: this.#guidedSpeed,
      isAimed: true,
    });
    const rightMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.GUIDED,
      x: this.x + this.#bossWidth / 2,
      y: this.y - this.#bossHeight / 2,
      missileWidth: this.#guidedWidth,
      missileSpeed: this.#guidedSpeed,
      isAimed: true,
    });

    this.#missileLaunchers.leftGuided.loadSingleAmmo(leftMissile);
    this.#missileLaunchers.rightGuided.loadSingleAmmo(rightMissile);
  }

  launchStraight() {
    if (this.frame % this.#straightInterval !== 0) {
      return;
    }

    const leftMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.BOSS_GUIDED,
      x: this.x - this.#bossWidth / 3,
      y: this.y - this.#bossHeight / 4,
      missileWidth: this.#straightWidth,
      missileSpeed: this.#straightSpeed,
      isAimed: true,
    });
    const rightMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.BOSS_GUIDED,
      x: this.x + this.#bossWidth / 3,
      y: this.y - this.#bossHeight / 4,
      missileWidth: this.#straightWidth,
      missileSpeed: this.#straightSpeed,
      isAimed: true,
    });

    this.#missileLaunchers.leftStraight.loadSingleAmmo(leftMissile);
    this.#missileLaunchers.rightStraight.loadSingleAmmo(rightMissile);
  }

  moveForward() {
    if (this.y > 400) {
      this.#isAtInitial = false;
      this.#shouldMoveForward = false;
      this.shouldSpawnBot = false;
    }

    this.y += this.#bossSpeed;
  }

  moveSideToSide() {
    const minX = 100;
    const maxX = this.ship.canvasWidth - this.ship.width - 100;

    if (this.x < minX) {
      this.#isAtMinX = true;
      this.#isAtMaxX = false;
      this.#sideCycle -= 1;
    }

    if (this.x > maxX) {
      this.#isAtMaxX = true;
      this.#isAtMinX = false;
      this.#sideCycle -= 1;
    }

    if (!this.#isAtMinX) {
      this.x -= this.#bossSpeed;
      return;
    }

    if (!this.#isAtMaxX) {
      this.x += this.#bossSpeed;
    }

    if (this.#sideCycle === 0) {
      this.#shouldMoveSide = false;
      this.#isAtInitial = false;
    }
  }

  setInitialPosition() {
    const initialX = this.ship.canvasWidth / 2 - this.#bossWidth / 2;
    const initialY = 50;
    const dx = initialX - this.x;
    const dy = initialY - this.y;

    if (Math.abs(dx) < 4.5 && Math.abs(dy) < 4.5) {
      return true;
    }

    this.x += dx * 0.01 * MODIFIER.SPEED;
    this.y += dy * 0.01 * MODIFIER.SPEED;

    return false;
  }

  setTargetList(targetList) {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);

    const launchers = Object.values(this.#missileLaunchers);
    const detectors = Object.values(this.#collisionDetectors);
    launchers.forEach((launcher) => launcher.setTargetList(targetList));
    detectors.forEach((detector) => detector.setTargetList(targetList));
  }

  setMissileRoute() {
    const launchers = Object.entries(this.#missileLaunchers);
    launchers.forEach(([weapon, launcher]) => {
      if (weapon.includes("Guided")) {
        launcher.setMissileRoute(MISSILE_ROUTE_COMMAND.GUIDED);
        return;
      }

      if (weapon.includes("Straight")) {
        launcher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_AIMED);
      }
    });
  }

  detectCollision() {
    const detectors = Object.values(this.#collisionDetectors);
    detectors.forEach((detector) => detector.detectCollision());
  }

  #setWeapon() {
    const weapons = [
      "leftGuided",
      "rightGuided",
      "leftStraight",
      "rightStraight",
    ];

    weapons.forEach((weapon) => {
      const launcher = new MissileLauncher(this.#bossWidth, this.#bossHeight);
      const detector = new CollisionDetector(launcher.missileList);
      this.#missileLaunchers[weapon] = launcher;
      this.#collisionDetectors[weapon] = detector;
    });
  }

  playBossAudio() {
    this.backgroundMusic.playAudio();
  }

  adjustBossAudio() {
    this.backgroundMusic.sound.currentTime = 16;
  }

  fadeOutAudio() {
    if (
      this.backgroundMusic.sound.volume <=
      this.#AudioVolume / this.#AudioFadeOutFrame
    ) {
      this.backgroundMusic.pauseAudio();
      return;
    }

    this.backgroundMusic.sound.volume -=
      this.#AudioVolume / this.#AudioFadeOutFrame;
  }
}

export default Boss;
