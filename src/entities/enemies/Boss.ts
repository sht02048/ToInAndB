import Enemy from "./Enemy";

import Sound from "../../utils/Sound";
import MissileLauncher from "../../weapons/MissileLauncher";
import CollisionDetector from "../../physics/CollisionDetector";

import { AUDIO, ENEMIES, ENEMY_PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

interface MissileLaunchers {
  leftStraight: MissileLauncher;
  rightStraight: MissileLauncher;
  leftGuided: MissileLauncher;
  rightGuided: MissileLauncher;
}

interface CollisionDetectors {
  leftStraight: CollisionDetector;
  rightStraight: CollisionDetector;
  leftGuided: CollisionDetector;
  rightGuided: CollisionDetector;
}

class Boss extends Enemy {
  public backgroundMusic: Sound;
  public hasBackgroundMusicPlayed: boolean;
  public shouldSpawnBot: boolean;

  #bossWidth = 228;
  #bossHeight = 218;
  #guidedYModifier = 30;
  #bossSpeed = 1;
  #bossVariableSpeed = 0.01;
  #isAtInitial = false;
  #shouldMoveForward = true;
  #shouldMoveSide = true;
  #isAtMinX = false;
  #isAtMaxX = false;
  #sideCycle = 3;
  #allWayFrame = 600;
  #allWayInterval = 10;
  #allWayWidth = 16;
  #allWaySpeed = 1;
  #guidedHaltFrame = 300;
  #guidedInterval = 50;
  #guidedWidth = 23;
  #guidedSpeed = 2;
  #straightInterval = 30;
  #straightWidth = 12;
  #straightSpeed = 3;
  #resetFrame = 400;
  #AudioVolume = 0.7;
  #AudioFadeOutFrame = 200;
  #missileLaunchers: MissileLaunchers = {
    leftStraight: null,
    rightStraight: null,
    leftGuided: null,
    rightGuided: null,
  };

  #collisionDetectors: CollisionDetectors = {
    leftStraight: null,
    rightStraight: null,
    leftGuided: null,
    rightGuided: null,
  };

  constructor({ x, y }) {
    super({
      x,
      y,
      health: 600,
      shipImage: ENEMIES.BOSS,
      width: 228,
      height: 218,
      isBoss: true,
    });

    this.backgroundMusic = new Sound(AUDIO.BOSS);
    this.backgroundMusic.sound.volume = this.#AudioVolume;
    this.hasBackgroundMusicPlayed = false;
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
    this.updateEnemy({
      setRoute,
      command: MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY,
    });
  }

  render(): void {
    this.renderEnemy();

    const launchers = Object.values(this.#missileLaunchers);
    launchers.forEach((launcher: MissileLauncher) => launcher.render());
  }

  setRoute(): void {
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

    this.#guidedHaltFrame = 300;
    this.#allWayFrame = 400;
    this.#resetFrame = 400;
    this.#shouldMoveForward = true;
    this.#sideCycle = 3;
    this.#shouldMoveSide = true;
    this.#isAtMinX = false;
    this.#isAtMaxX = false;
  }

  launchAllWay(): void {
    if (this.frame % this.#allWayInterval !== 0) {
      return;
    }

    const allWayMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.NORMAL,
      y: this.y + this.#bossHeight / 2,
      missileWidth: this.#allWayWidth,
      missileSpeed: this.#allWaySpeed,
      shouldTilt: true,
    });

    this.missileLauncher.loadMultipleMissile(allWayMissile);
  }

  launchGuided(): void {
    if (this.frame % this.#guidedInterval !== 0) {
      return;
    }

    const leftMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.GUIDED,
      x: this.x - this.#bossWidth / 3,
      y: this.y + this.#bossHeight - this.#guidedYModifier,
      missileWidth: this.#guidedWidth,
      missileSpeed: this.#guidedSpeed,
      isAimed: true,
    });
    const rightMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.GUIDED,
      x: this.x + this.#bossWidth / 3,
      y: this.y + this.#bossHeight - this.#guidedYModifier,
      missileWidth: this.#guidedWidth,
      missileSpeed: this.#guidedSpeed,
      isAimed: true,
    });

    this.#missileLaunchers.leftGuided.loadSingleMissile(leftMissile);
    this.#missileLaunchers.rightGuided.loadSingleMissile(rightMissile);
  }

  launchStraight(): void {
    if (this.frame % this.#straightInterval !== 0) {
      return;
    }

    const leftMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.BOSS_GUIDED,
      x: this.x - this.#bossWidth / 3,
      y: this.y + (this.#bossHeight * 3) / 4,
      missileWidth: this.#straightWidth,
      missileSpeed: this.#straightSpeed,
      isAimed: true,
    });
    const rightMissile = this.setMissileInformation({
      projectilePath: ENEMY_PROJECTILE.BOSS_GUIDED,
      x: this.x + this.#bossWidth / 3,
      y: this.y + (this.#bossHeight * 3) / 4,
      missileWidth: this.#straightWidth,
      missileSpeed: this.#straightSpeed,
      isAimed: true,
    });

    this.#missileLaunchers.leftStraight.loadSingleMissile(leftMissile);
    this.#missileLaunchers.rightStraight.loadSingleMissile(rightMissile);
  }

  moveForward(): void {
    if (this.y > 400) {
      this.#isAtInitial = false;
      this.#shouldMoveForward = false;
      this.shouldSpawnBot = false;
    }

    this.y += this.#bossSpeed;
  }

  moveSideToSide(): void {
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

  setInitialPosition(): boolean {
    const initialX = this.ship.canvasWidth / 2 - this.#bossWidth / 2;
    const initialY = 50;
    const dx = initialX - this.x;
    const dy = initialY - this.y;

    if (Math.abs(dx) < 4.5 && Math.abs(dy) < 4.5) {
      return true;
    }

    this.x += dx * this.#bossVariableSpeed;
    this.y += dy * this.#bossVariableSpeed;

    return false;
  }

  setTargetList(targetList): void {
    this.missileLauncher.setTargetList(targetList);
    this.collisionDetector.setTargetList(targetList);

    const launchers = Object.values(this.#missileLaunchers);
    const detectors = Object.values(this.#collisionDetectors);
    launchers.forEach((launcher: MissileLauncher) =>
      launcher.setTargetList(targetList),
    );
    detectors.forEach((detector: CollisionDetector) =>
      detector.setTargetList(targetList),
    );
  }

  setMissileRoute(): void {
    const launchers = Object.entries(this.#missileLaunchers);
    launchers.forEach(([weapon, launcher]: [string, MissileLauncher]) => {
      if (weapon.includes("Guided")) {
        launcher.setMissileRoute(MISSILE_ROUTE_COMMAND.GUIDED);
        return;
      }

      if (weapon.includes("Straight")) {
        launcher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_AIMED);
      }
    });
  }

  detectCollision(): void {
    const detectors = Object.values(this.#collisionDetectors);
    detectors.forEach((detector: CollisionDetector) =>
      detector.detectCollision(),
    );
  }

  #setWeapon(): void {
    const weapons = [
      "leftGuided",
      "rightGuided",
      "leftStraight",
      "rightStraight",
    ];

    weapons.forEach((weapon) => {
      const launcher = new MissileLauncher(this.#bossWidth, this.#bossHeight);
      const detector = new CollisionDetector();
      detector.setMissileList(launcher.missileList);
      this.#missileLaunchers[weapon] = launcher;
      this.#collisionDetectors[weapon] = detector;
    });
  }

  playBossAudio(): void {
    this.backgroundMusic.playAudio();
    this.hasBackgroundMusicPlayed = true;
  }

  adjustBossAudio(): void {
    this.backgroundMusic.sound.currentTime = 16;
  }

  fadeOutAudio(): void {
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
