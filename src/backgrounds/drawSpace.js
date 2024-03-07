import { SPACE } from "../constants/path";

function drawSpace() {
  const canvas = document.getElementById("space-canvas");
  const ctx = canvas.getContext("2d");
  const space = new Image();

  space.onload = () => {
    const spaceScale = canvas.width / space.width;

    ctx.drawImage(
      space,
      0,
      0,
      space.width * spaceScale,
      space.height * spaceScale,
    );
  };

  space.src = SPACE;
}

export default drawSpace;
