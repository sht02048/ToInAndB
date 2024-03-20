import Renderer from "./Renderer";

import { IMAGE } from "../constants/path";

class Menu {
  #titleTextTop = 150;
  #pausedWidth = 408;
  #resumeWidth = 273;
  #resumeHeight = 53;
  #resumeTop = 500;
  #replayWidth = 284;
  #replayHeight = 52;
  #replayTop = 350;
  #gameOverWidth = 582;
  #buttonLeft = 640;
  #buttonRight = 930;

  constructor(toggleIsPaused, restart) {
    this.paused = new Renderer(IMAGE.PAUSED);
    this.resume = new Renderer(IMAGE.RESUME);
    this.replay = new Renderer(IMAGE.REPLAY);
    this.gameOver = new Renderer(IMAGE.GAME_OVER);
    this.ctx = this.paused.mainCtx;
    this.canvasWidth = this.paused.canvasWidth;
    this.canvasHeight = this.paused.canvasHeight;

    this.isPaused = false;
    this.isGameOver = false;

    this.handleEvent(toggleIsPaused, restart);
  }

  render() {
    this.ctx.save();
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillRect(0, 0, this.paused.canvasWidth, this.paused.canvasHeight);
    this.ctx.restore();

    if (this.isGameOver) {
      this.gameOver.render(
        this.canvasWidth / 2 - this.#gameOverWidth / 2,
        this.#titleTextTop,
      );
    } else if (this.isPaused) {
      this.paused.render(
        this.canvasWidth / 2 - this.#pausedWidth / 2,
        this.#titleTextTop,
      );
      this.resume.render(
        this.canvasWidth / 2 - this.#resumeWidth / 2,
        this.#resumeTop,
      );
    }

    this.replay.render(
      this.canvasWidth / 2 - this.#replayWidth / 2,
      this.#replayTop,
    );
  }

  update(isPaused, playerHealth) {
    this.isPaused = isPaused;

    if (playerHealth === 0) {
      this.isGameOver = true;
    } else {
      this.isGameOver = false;
    }

    if (this.isGameOver) {
      this.isPaused = false;
    }
  }

  handleEvent(handleIsPaused, restart) {
    const replayTop = this.#replayTop;
    const replayBottom = replayTop + this.#replayHeight;
    const resumeTop = this.#resumeTop;
    const resumeBottom = resumeTop + this.#resumeHeight;

    const checkClick = (event) => {
      if (
        event.clientX < this.#buttonLeft ||
        event.clientX > this.#buttonRight ||
        (!this.isPaused && !this.isGameOver)
      ) {
        return;
      }

      if (event.clientY >= replayTop && event.clientY <= replayBottom) {
        restart();

        if (!this.isGameOver) {
          handleIsPaused();
        }

        return;
      }

      if (
        event.clientY >= resumeTop &&
        event.clientY <= resumeBottom &&
        !this.isGameOver
      ) {
        handleIsPaused();
        return;
      }
    };

    this.paused.mainCanvas.addEventListener("click", checkClick);
  }
}

export default Menu;
