import Sound from "../utils/Sound";
import { AUDIO } from "../constants/path";
import Player from "./Player";

class Cockpit {
  #keyPresses = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
  };

  #currentPower = 1;
  #currentSpeed = 2;

  private ship: Player;
  private minX: number;
  private minY: number;
  private maxX: number;
  private maxY: number;
  private shotSound: Sound;
  private powerUpSound: Sound;
  private speedUpSound: Sound;
  private isShotSoundPlaying: boolean;
  private currentSoundTime: number;
  private isInvincibleFrame: number;
  private frame: number;

  constructor(ship: Player) {
    this.ship = ship;
    this.minX = this.ship.currentDirection.minX;
    this.minY = this.ship.currentDirection.minY;
    this.maxX = this.ship.currentDirection.maxX;
    this.maxY = this.ship.currentDirection.maxY;

    this.shotSound = new Sound(AUDIO.SHOT);
    this.powerUpSound = new Sound(AUDIO.POWER_UP);
    this.speedUpSound = new Sound(AUDIO.SPEED_UP);
    this.shotSound.sound.loop = false;
    this.powerUpSound.sound.loop = false;
    this.speedUpSound.sound.loop = false;
    this.shotSound.sound.volume = 0.2;
    this.powerUpSound.sound.volume = 0.5;
    this.speedUpSound.sound.volume = 0.5;
    this.isShotSoundPlaying = false;
    this.currentSoundTime = this.shotSound.sound.currentTime;
    this.isInvincibleFrame = 200;
    this.frame = 0;

    this.addEvent();
  }

  makeShotSound() {
    if (this.#keyPresses.Space) {
      if (this.currentSoundTime === 0) {
        this.shotSound.playAudio();
      }

      if (this.shotSound.sound.currentTime > 0.022) {
        this.shotSound.sound.currentTime = 0;
      }
    }
  }

  control(shipSpeed) {
    this.ship.currentDirection = this.ship.staticShip;
    this.ship.isShooting = this.#keyPresses.Space;

    if (this.#keyPresses.ArrowUp) {
      this.ship.currentDirection = this.ship.straightShip;

      if (this.ship.y > this.ship.currentDirection.minY) {
        this.ship.y -= shipSpeed;
      }
    }

    if (this.#keyPresses.ArrowDown && this.ship.y < this.maxY) {
      this.ship.y += shipSpeed;
    }

    if (this.#keyPresses.ArrowLeft) {
      this.ship.currentDirection = this.ship.leftShip;

      if (this.ship.x > this.minX) {
        this.ship.x -= shipSpeed;
      }
    }

    if (this.#keyPresses.ArrowRight) {
      this.ship.currentDirection = this.ship.rightShip;

      if (this.ship.x < this.maxX) {
        this.ship.x += shipSpeed;
      }
    }

    this.frame += 1;
  }

  addEvent() {
    const handleControl = (event: KeyboardEvent, isDown: boolean) => {
      const pressedKey = event.key === " " ? "Space" : event.key;

      if (Object.hasOwn(this.#keyPresses, pressedKey)) {
        this.#keyPresses[pressedKey] = isDown;
      }
    };

    document.addEventListener("keydown", (event: KeyboardEvent) =>
      handleControl(event, true),
    );
    document.addEventListener("keyup", (event: KeyboardEvent) =>
      handleControl(event, false),
    );
  }

  checkPlayerStatus(power: number, speed: number) {
    if (this.ship.healthPoint <= 0) {
      this.ship.isDestroyed = true;
    }

    if (this.#currentPower < power) {
      this.powerUpSound.playAudio();
      this.#currentPower = power;
    }

    if (this.#currentPower === 3) {
      this.minX = 0;
      this.maxX = this.ship.canvasWidth - this.ship.width;
    }

    if (this.#currentSpeed < speed) {
      this.speedUpSound.playAudio();
      this.#currentSpeed = speed;
    }
  }
}

export default Cockpit;
