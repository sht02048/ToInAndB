import Renderer from "./Renderer";
import Sound from "../utils/Sound";
import { ENEMY_EXPLOSION, AUDIO } from "../constants/path";
import MODIFIER from "../constants/modifier";

class Explosion {
  #enemyExplosionList = [];

  constructor(game) {
    this.game = game;
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
  }

  destroy(x, y, width, makeExplosionSound = true) {
    if (this.explosionFrame === 22) {
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
    if (this.explosionFrame === 22) {
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
