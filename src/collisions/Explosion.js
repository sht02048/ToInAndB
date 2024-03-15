import Renderer from "../game/Renderer";
import { ENEMY_EXPLOSION } from "../constants/path";

class Explosion {
  #enemyExplosionList = [];

  constructor(game) {
    this.game = game;

    for (let i = 1; i < 12; i += 1) {
      this.#enemyExplosionList.push(
        new Renderer(`${ENEMY_EXPLOSION}enemy_${i}.png`),
      );
    }

    this.explosionFrame = 0;
  }

  destroy(x, y, width) {
    if (this.explosionFrame === 44) {
      return;
    }

    const currentFrame = Math.floor(this.explosionFrame / 4);

    this.#enemyExplosionList[currentFrame].render(x, y, width, width);

    this.explosionFrame += 1;
  }

  hit(substituteImage, x, y) {
    substituteImage.render(x, y);
  }
}

export default Explosion;
