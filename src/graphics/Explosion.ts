import Renderer from "./Renderer";
import Sound from "../utils/Sound";
import { EXPLOSION, EXPLOSION_BOSS, AUDIO } from "../constants/path";

class Explosion {
  #enemyExplosionList = [];
  #bossExplosionList = [];

  private isBoss: boolean;
  private explosionSound: Sound;
  private isExplosionSoundPlaying: boolean;

  public explosionFrame: number;

  constructor(isBoss: boolean) {
    this.isBoss = isBoss;
    this.explosionFrame = 0;
    this.explosionSound = new Sound(AUDIO.EXPLOSION_AUDIO);
    this.explosionSound.sound.loop = false;
    this.explosionSound.sound.volume = 0.3;
    this.isExplosionSoundPlaying = false;

    for (let i = 1; i < 12; i += 1) {
      this.#enemyExplosionList.push(new Renderer(EXPLOSION[i]));
    }

    for (let i = 1; i <= 20; i += 1) {
      this.#bossExplosionList.push(new Renderer(EXPLOSION_BOSS[i]));
    }
  }

  render(x: number, y: number, width: number, shouldMakeExplosionSound: boolean) {
    if (this.isBoss) {
      this.destroyBoss(x, y, width);
      return;
    }

    this.destroy(x, y, width, shouldMakeExplosionSound);
  }

  destroyBoss(x: number, y: number, width: number) {
    if (this.explosionFrame === 76) {
      return;
    }

    if (this.isExplosionSoundPlaying) {
      this.explosionSound.playAudio();
    }

    this.isExplosionSoundPlaying = true;

    const currentFrame = Math.floor(this.explosionFrame / 4);

    this.#bossExplosionList[currentFrame].render(x, y, width, width);

    this.explosionFrame += 1;
  }

  destroy(x: number, y: number, width: number, shouldMakeExplosionSound: boolean = true) {
    if (this.explosionFrame === 44) {
      return;
    }

    if (!this.isExplosionSoundPlaying && shouldMakeExplosionSound) {
      this.explosionSound.playAudio();
    }

    this.isExplosionSoundPlaying = true;

    const currentFrame = Math.floor(this.explosionFrame / 4);

    this.#enemyExplosionList[currentFrame].render(x, y, width, width);

    this.explosionFrame += 1;
  }

  isExploded() {
    if (this.explosionFrame === 44) {
      this.isExplosionSoundPlaying = false;
      return true;
    }

    return false;
  }

  resetExplosion() {
    this.explosionFrame = 0;
  }

  hit(substituteImage: Renderer, x: number, y: number) {
    substituteImage.render(x, y);
  }
}

export default Explosion;
