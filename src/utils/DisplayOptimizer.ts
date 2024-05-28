class DisplayOptimizer {
  static canvasWidth = window.innerWidth * 0.6;
  static canvasHeight = window.innerHeight;

  static resize() {
    const canvases = document.querySelectorAll("canvas");

    canvases.forEach((canvas: HTMLCanvasElement) => {
      canvas.width = DisplayOptimizer.canvasWidth;
      canvas.height = DisplayOptimizer.canvasHeight;
    });
  }
}

export default DisplayOptimizer;
