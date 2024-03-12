const CANVAS_WIDTH = window.innerWidth * 0.6;
const CANVAS_HEIGHT = window.innerHeight;

function resizeCanvas() {
  const canvases = document.querySelectorAll("canvas");

  canvases.forEach((canvas) => {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  });
}

export default resizeCanvas;
