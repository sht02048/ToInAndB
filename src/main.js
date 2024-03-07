import "./style.css";

import { BLOCK_LIST, BLOCK_ID } from "./constants/block";
import { PLATE_LIST, PLATE_SCALE, PLATE_ID } from "./constants/plate";
import { BASE_LIST, BASE_SCALE, BASE_ID } from "./constants/base";
import drawSpace from "./backgrounds/drawSpace";
import drawBackground from "./backgrounds/drawBackground";
import resizeCanvas from "./backgrounds/resizeCanvas";

function draw() {
  drawBackground({
    itemList: BLOCK_LIST,
    canvasId: BLOCK_ID,
  });
  drawBackground({
    itemList: PLATE_LIST,
    itemScale: PLATE_SCALE,
    canvasId: PLATE_ID,
    splitCanvas: true,
  });
}

resizeCanvas();

window.onload = draw;
