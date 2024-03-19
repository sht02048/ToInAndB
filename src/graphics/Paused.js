import Renderer from "./Renderer";

import Game from "../entities/Game";
import { IMAGE } from "../constants/path";

class Paused extends Renderer {
  constructor(endGame, toggleIsPaused) {
    super(IMAGE.PAUSED);

    this.endGame = endGame;
    this.toggleIsPaused = toggleIsPaused;

    this.buttonLeft = 670;
    this.buttonRight = 910;
    this.resumeTop = 400;
    this.resumeBottom = 440;
    this.replayTop = 500;
    this.replayBottom = 540;
    this.isPaused = false;

    this.handleEvent(endGame, toggleIsPaused);
  }

  update(isPaused) {
    this.isPaused = isPaused;
  }

  render() {
    this.mainCtx.drawImage(
      this.image,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    );

    requestAnimationFrame(() => this.render());
  }

  handleEvent(endGame, handleIsPaused) {
    const checkClick = (event) => {
      if (
        event.clientX < this.buttonLeft ||
        event.clientX > this.buttonRight ||
        !this.isPaused
      ) {
        return;
      }

      if (
        event.clientY >= this.resumeTop &&
        event.clientY <= this.resumeBottom
      ) {
        handleIsPaused();
        return;
      }

      if (
        event.clientY >= this.replayTop &&
        event.clientY <= this.replayBottom
      ) {
        const replayedGame = new Game();
        endGame();
        replayedGame.resetGameState();
        this.mainCanvas.removeEventListener("click", checkClick);
        return;
      }
    };

    this.mainCanvas.addEventListener("click", checkClick);
  }
}

export default Paused;
