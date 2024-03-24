class DisplayOptimizer {
  static canvasWidth = window.innerWidth * 0.6;
  static canvasHeight = window.innerHeight;

  static resize() {
    const canvases = document.querySelectorAll("canvas");

    canvases.forEach((canvas) => {
      canvas.width = DisplayOptimizer.canvasWidth;
      canvas.height = DisplayOptimizer.canvasHeight;
    });
  }

  static getRefreshRate() {
    return new Promise((resolve) => {
      let frames = 0;
      const start = performance.now();

      function countFrames() {
        frames++;
        const now = performance.now();
        const duration = now - start;

        if (duration < 1000) {
          requestAnimationFrame(countFrames);
        } else {
          resolve(frames);
        }
      }

      requestAnimationFrame(countFrames);
    });
  }
}

export default DisplayOptimizer;
