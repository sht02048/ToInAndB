import "./style.css";
import "@fortawesome/fontawesome-free/js/all.js";

import Game from "./game/Game";

const game = new Game();

game.startIntro();
game.playIntroMusic();

const startGame = () => {
  game.startGame();
  game.playBattleMusic();

  removeEventListener("keypress", startGame);
};

addEventListener("keypress", startGame);
