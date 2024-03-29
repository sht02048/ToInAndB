import Renderer from "./Renderer";
import { PLAYER } from "../constants/path";

class LifeBoard {
  #currentHealth = 2;

  constructor() {
    this.healthList = [];
    this.shouldBeDisplayed = true;

    for (let i = 0; i < this.#currentHealth; i += 1) {
      this.healthList.push(new Renderer(PLAYER.LIFE));
    }
  }

  render(playerHealth) {
    this.healthList.forEach((health, index) => {
      if (playerHealth - 1 <= index) {
        return;
      }

      health.render(health.minX + index * 40 + 20, 20);
    });
  }
}

export default LifeBoard;
