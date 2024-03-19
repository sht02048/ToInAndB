import Renderer from "./Renderer";
import Sound from "../utils/Sound";
import { ENEMY_EXPLOSION, AUDIO } from "../constants/path";

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

  destroy(x, y, width) {
    if (this.explosionFrame === 44) {
      return;
    }

    if (!this.isExplosionSoundPlaying) {
      this.explosionSound.playAudio();
    }

    this.isExplosionSoundPlaying = true;

    const currentFrame = Math.floor(this.explosionFrame / 4);

    this.#enemyExplosionList[currentFrame].render(x, y, width, width);

    this.explosionFrame += 1;
  }

  isExploded() {
    if (this.explosionFrame === 44) {
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
