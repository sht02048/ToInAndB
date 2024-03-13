import Sprite from "../entities/Sprite";
import { ENEMY_EXPLOSION } from "../constants/path";

class Explosion {
  #enemyExplosionList = [];

  constructor(game) {
    this.game = game;

    for (let i = 1; i < 12; i += 1) {
      this.#enemyExplosionList.push(
        new Sprite(`${ENEMY_EXPLOSION}enemy_${i}.png`),
      );
    }
  }

  destroy(enemy) {
    if (enemy.explosionFrame === 44) {
      return;
    }

    const currentFrame = Math.floor(enemy.explosionFrame / 4);

    this.game.mainCtx.drawImage(
      this.#enemyExplosionList[currentFrame],
      enemy.x,
      enemy.y,
      enemy.width,
      enemy.height,
    );

    enemy.explosionFrame += 1;
  }

  hit(enemy, substituteImage) {
    this.game.mainCtx.drawImage(
      substituteImage,
      enemy.x,
      enemy.y,
      enemy.width,
      enemy.height,
    );
  }
}

export default Explosion;
