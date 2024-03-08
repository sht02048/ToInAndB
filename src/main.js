import "./style.css";

import SPACE_PATH from "./constants/space";
import resizeCanvas from "./game/resizeCanvas";
import UserAircraft from "./aircraft/PlayerAircraft";
import BackgroundItem from "./backgrounds/BackgroundItem";
import {
  BASE_MODIFIER,
  BLOCK_MODIFIER,
  PLATE_MODIFIER,
} from "./constants/modifier";
import {
  BASE_PATH,
  BLOCK_PATH,
  PLAYER_AIRCRAFT_PATH,
  PLATE_PATH,
} from "./constants/path";

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
  scaleModifier: BLOCK_MODIFIER.SCALE,
  gapModifier: BLOCK_MODIFIER.GAP,
  heightModifier: BLOCK_MODIFIER.HEIGHT,
  isRight: true,
});

const plate = new BackgroundItem({
  imagePath: PLATE_PATH,
  gapModifier: PLATE_MODIFIER.GAP,
});

const space = new BackgroundItem({ imagePath: SPACE_PATH });

const userAircraft = new UserAircraft(PLAYER_AIRCRAFT_PATH);

userAircraft.control();
plate.drop();
leftBlock.drop();
rightBlock.drop();
