import "./style.css";

import { BLOCK_PATH, BLOCK_MODIFIER } from "./constants/block";
import { PLATE_PATH, PLATE_MODIFIER } from "./constants/plate";
import { BASE_PATH, BASE_MODIFIER } from "./constants/base";
import resizeCanvas from "./game/resizeCanvas";
import BackgroundItem from "./backgrounds/BackgroundItem";

resizeCanvas();

const base = new BackgroundItem({
  imagePath: BASE_PATH,
  gapModifier: BASE_MODIFIER.GAP,
});

const leftBlock = new BackgroundItem({
  imagePath: BLOCK_PATH.LEFT,
  scaleModifier: BLOCK_MODIFIER.SCALE,
  gapModifier: BLOCK_MODIFIER.GAP,
  heightModifier: BLOCK_MODIFIER.HEIGHT,
});

const rightBlock = new BackgroundItem({
  imagePath: BLOCK_PATH.RIGHT,
  isRight: true,
  scaleModifier: BLOCK_MODIFIER.SCALE,
  gapModifier: BLOCK_MODIFIER.GAP,
  heightModifier: BLOCK_MODIFIER.HEIGHT,
});

const plate = new BackgroundItem({
  imagePath: PLATE_PATH,
  gapModifier: PLATE_MODIFIER.GAP,
});

leftBlock.drop();
