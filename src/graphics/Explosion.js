import Renderer from "./Renderer";
import Sound from "../utils/Sound";
import { ENEMY_EXPLOSION, AUDIO } from "../constants/path";
import MODIFIER from "../constants/modifier";

class Explosion {
  #enemyExplosionList = [];
  #bossExplosionList = [];

  constructor(isBoss) {
    this.isBoss = isBoss;
    this.explosionFrame = 0;
    this.explosionSound = new Sound(AUDIO.EXPLOSION);
    this.explosionSound.sound.loop = false;
    this.explosionSound.sound.volume = 0.3;
    this.isExplosionSoundPlaying = false;

    for (let i = 1; i < 12; i += 1) {
      this.#enemyExplosionList.push(
        new Renderer(`${ENEMY_EXPLOSION}enemy_${i}.png`),
      );
    }

    for (let i = 1; i < 20; i += 1) {
      this.#bossExplosionList.push(
        new Renderer(`${ENEMY_EXPLOSION}boss_${i}.png`),
      );
    }
  }

  render(x, y, width, makeExplosionSound) {
    if (this.isBoss) {
      this.destroyBoss(x, y, width);
      return;
    }

    this.destroy(x, y, width, makeExplosionSound);
  }

  destroyBoss(x, y, width) {
    if (this.explosionFrame === 76 * MODIFIER.FRAME) {
      return;
    }

    if (this.isExplosionSoundPlaying) {
      this.explosionSound.playAudio();
    }

    this.isExplosionSoundPlaying = true;

    const currentFrame = Math.floor(this.explosionFrame / (4 * MODIFIER.FRAME));

    this.#bossExplosionList[currentFrame].render(x, y, width, width);

    this.explosionFrame += 1;
  }

  destroy(x, y, width, makeExplosionSound = true) {
    if (this.explosionFrame === 44 * MODIFIER.FRAME) {
      return;
    }

    if (!this.isExplosionSoundPlaying && makeExplosionSound) {
      this.explosionSound.playAudio();
    }

    this.isExplosionSoundPlaying = true;

    const currentFrame = Math.floor(this.explosionFrame / (4 * MODIFIER.FRAME));

    this.#enemyExplosionList[currentFrame].render(x, y, width, width);

    this.explosionFrame += 1;
  }

  isExploded() {
    if (this.explosionFrame === 44 * MODIFIER.FRAME) {
      this.isExplosionSoundPlaying = false;
      return true;
    }

    return false;
  }

  resetExplosion() {
    this.explosionFrame = 0;
  }

  hit(substituteImage, x, y) {
    substituteImage.render(x, y);
  }
}

export default Explosion;
