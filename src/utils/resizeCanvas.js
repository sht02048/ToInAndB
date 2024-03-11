import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants/canvasScale";

function resizeCanvas() {
  const canvases = document.querySelectorAll("canvas");

  canvases.forEach((canvas) => {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  });
}

export default resizeCanvas;
