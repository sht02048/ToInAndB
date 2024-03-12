function estimateRefreshRate() {
  const frameTimes = [];
  let lastTimestamp = performance.now();
  const maxFrames = 60;

  return new Promise((resolve) => {
    const collectFrameTime = (timestamp) => {
      if (frameTimes.length >= maxFrames) {
        const averageFrameTime =
          frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;

        const estimatedFrequency = 1000 / averageFrameTime;
        resolve(Math.round(estimatedFrequency));
        return;
      }

      frameTimes.push(timestamp - lastTimestamp);
      lastTimestamp = timestamp;

      requestAnimationFrame(collectFrameTime);
    };

    requestAnimationFrame(collectFrameTime);
  });
}

export default estimateRefreshRate;
