import Renderer from "./Renderer";

import { PLAYER } from "../constants/path";
import PLAYER_HEALTH from "../constants/playerHealth";

class LifeBoard {
  private healthList: Renderer[];
  public shouldBeDisplayed: boolean;

  #currentHealth = PLAYER_HEALTH - 1;

  constructor() {
    this.healthList = [];
    this.shouldBeDisplayed = true;

    for (let i = 0; i < this.#currentHealth; i += 1) {
      this.healthList.push(new Renderer(PLAYER.LIFE));
    }
  }

  render(playerHealth: number): void {
    this.healthList.forEach((health, index) => {
      if (playerHealth - 1 <= index) {
        return;
      }

      health.render(health.minX + index * 40 + 20, 20);
    });
  }
}

export default LifeBoard;
