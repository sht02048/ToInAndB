import "./style.css";
import "@fortawesome/fontawesome-free/js/all.js";

import Game from "./game/Game";

const game = new Game();

// ACTIVATE 실제 작업 시 주석해제 및 game.play 삭제 필요
// game.setUp();
game.play();

game.handleEvent();
