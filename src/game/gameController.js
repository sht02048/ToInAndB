import Intro from "./Intro";
import Sound from "./Sound";
import resizeCanvas from "./resizeCanvas";
import PlayerAircraft from "../aircraft/PlayerAircraft";
import BackgroundItem from "../backgrounds/BackgroundItem";
import { SPRITE_PATH, IMAGE_PATH, AUDIO_PATH } from "../constants/path";
import {
  BASE_MODIFIER,
  BLOCK_MODIFIER,
  PLATE_MODIFIER,
} from "../constants/modifier";

resizeCanvas();

const base = new BackgroundItem({
  imagePath: SPRITE_PATH.BASE,
  gapModifier: BASE_MODIFIER.GAP,
});

const leftBlock = new BackgroundItem({
  imagePath: SPRITE_PATH.BLOCK_LEFT,
  scaleModifier: BLOCK_MODIFIER.SCALE,
  gapModifier: BLOCK_MODIFIER.GAP,
  heightModifier: BLOCK_MODIFIER.HEIGHT,
});

const rightBlock = new BackgroundItem({
  imagePath: SPRITE_PATH.BLOCK_RIGHT,
  scaleModifier: BLOCK_MODIFIER.SCALE,
  gapModifier: BLOCK_MODIFIER.GAP,
  heightModifier: BLOCK_MODIFIER.HEIGHT,
  isRight: true,
});

const plate = new BackgroundItem({
  imagePath: SPRITE_PATH.PLATE,
  gapModifier: PLATE_MODIFIER.GAP,
});

const playAircraft = new PlayerAircraft(SPRITE_PATH);

const intro = new Intro(IMAGE_PATH.TITLE, IMAGE_PATH.INSTRUCTION_START);
const introMusic = new Sound(AUDIO_PATH.INTRO);

const backgroundMusic = new Sound(AUDIO_PATH.BATTLE);

function playIntro() {
  const muteToggle = document.getElementById("mute-toggle");

  intro.float();

  muteToggle.addEventListener("click", () => {
    introMusic.playAudio();
    Sound.toggleSound(muteToggle);
  });

  addEventListener("keydown", (event) => {
    introMusic.pauseAudio();
    onEnterPress(event);
  });
}

function start() {
  backgroundMusic.playAudio();
  intro.gameStart();
  playAircraft.gameStart();
  plate.gameStart();
  leftBlock.gameStart();
  rightBlock.gameStart();
}

function onEnterPress(event) {
  if (event.key === "Enter") {
    start();
    removeEventListener("keydown", onEnterPress);
  }
}

export default playIntro;
