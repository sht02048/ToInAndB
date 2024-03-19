import Renderer from "./Renderer";

import Game from "../entities/Game";
import { IMAGE } from "../constants/path";

class Paused extends Renderer {
  constructor() {
    super(IMAGE.PAUSED);

    this.buttonLeft = 670;
    this.buttonRight = 910;
    this.resumeTop = 400;
    this.resumeBottom = 440;
    this.replayTop = 500;
    this.replayBottom = 540;
    this.isPaused = false;
  }

  render() {
    this.mainCtx.drawImage(
      this.image,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    );

    this.pauseRendered = requestAnimationFrame(() => this.render());
  }

  unmount() {
    cancelAnimationFrame(this.pauseRendered);
  }

  handleEvent(replay, handleIsPaused) {
    const checkClick = (event) => {
      if (event.clientX < this.buttonLeft || event.clientX > this.buttonRight) {
        return;
      }

      if (
        event.clientY >= this.resumeTop &&
        event.clientY <= this.resumeBottom
      ) {
        this.unmount();
        handleIsPaused();
        return;
      }

      if (
        event.clientY >= this.replayTop &&
        event.clientY <= this.replayBottom
      ) {
        const replayedGame = new Game();
        replay();
        replayedGame.resetGameState();
        this.mainCanvas.removeEventListener("click", checkClick);
        handleIsPaused();
        return;
      }
    };

    this.mainCanvas.addEventListener("click", checkClick);
  }
}

export default Paused;
