import { PLANETS, NEBULAS } from "../constants/path";

function drawCelestial() {
  const canvas = document.getElementById("celestial-canvas");
  const ctx = canvas.getContext("2d");

  const greenPlanet = new Image();
  const greyPlanet = new Image();
  const orangePlanet = new Image();

  greenPlanet.onload = () => {
    ctx.drawImage(greenPlanet, greenPlanet.width, greenPlanet.height);
  };

  greenPlanet.src = PLANETS.GREEN;
  greyPlanet.src = PLANETS.GREY;
  orangePlanet.src = PLANETS.ORANGE;
}

export default drawCelestial;
