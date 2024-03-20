import Renderer from "./Renderer";

import { IMAGE } from "../constants/path";

class Paused extends Renderer {
  constructor(toggleIsPaused, restart) {
    super(IMAGE.PAUSED);

    this.buttonLeft = 670;
    this.buttonRight = 910;
    this.resumeTop = 400;
    this.resumeBottom = 440;
    this.replayTop = 500;
    this.replayBottom = 540;
    this.isPaused = false;

    this.handleEvent(toggleIsPaused, restart);
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

  handleEvent(handleIsPaused, restart) {
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
        restart();
        handleIsPaused();
        return;
      }
    };

    this.mainCanvas.addEventListener("click", checkClick);
  }
}

export default Paused;
