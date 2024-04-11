import STATIC from "../assets/sprites/player/player_static.png";
import STRAIGHT from "../assets/sprites/player/player_straight.png";
import LEFT from "../assets/sprites/player/player_left.png";
import RIGHT from "../assets/sprites/player/player_right.png";
import LIFE from "../assets/sprites/player/player_life.png";
import HEAVY from "../assets/sprites/enemies/heavy.png";
import HEAVY_HIT from "../assets/sprites/enemies/heavy_hit.png";
import BUG from "../assets/sprites/enemies/bug.png";
import BUG_HIT from "../assets/sprites/enemies/bug_hit.png";
import MINI from "../assets/sprites/enemies/mini.png";
import MINI_HIT from "../assets/sprites/enemies/mini_hit.png";
import CANNON from "../assets/sprites/enemies/cannon.png";
import CANNON_HIT from "../assets/sprites/enemies/cannon_hit.png";
import DANGER from "../assets/sprites/enemies/danger.png";
import DANGER_HIT from "../assets/sprites/enemies/danger_hit.png";
import WINGS from "../assets/sprites/enemies/wings.png";
import WINGS_HIT from "../assets/sprites/enemies/wings_hit.png";
import CROSS from "../assets/sprites/enemies/cross.png";
import CROSS_HIT from "../assets/sprites/enemies/cross_hit.png";
import COW from "../assets/sprites/enemies/cow.png";
import COW_HIT from "../assets/sprites/enemies/cow_hit.png";
import EMPEROR from "../assets/sprites/enemies/emperor.png";
import EMPEROR_HIT from "../assets/sprites/enemies/emperor_hit.png";
import BOT from "../assets/sprites/enemies/bot.png";
import BOT_HIT from "../assets/sprites/enemies/bot_hit.png";
import BOSS from "../assets/sprites/enemies/boss.png";
import BOSS_HIT from "../assets/sprites/enemies/boss_hit.png";
import BASE from "../assets/sprites/backgrounds/base.png";
import BLOCK from "../assets/sprites/backgrounds/block.png";
import PLATE from "../assets/sprites/backgrounds/plate.png";
import SPACE_BOSS from "../assets/sprites/backgrounds/space_boss.png";
import TITLE from "/images/title.png?url";
import INSTRUCTION_START from "/images/instruction_start.png?url";
import PAUSED from "../assets/images/paused.png";
import RESUME from "../assets/images/resume.png";
import REPLAY from "../assets/images/replay.png";
import GAME_OVER from "../assets/images/game_over.png";
import OUTRO_TITLE from "../assets/images/outro_title.png";
import OUTRO_MESSAGE from "../assets/images/outro_message.png";
import BATTLE from "../assets/audios/background/pixel-perfect.mp3";
import INTRO from "../assets/audios/background/battle.mp3";
import EXPLOSION_AUDIO from "../assets/audios/effects/explosion_1.mp3";
import SHOT from "../assets/audios/effects/shot_1.mp3";
import POWER_UP_AUDIO from "../assets/audios/effects/power_up.mp3";
import SPEED_UP_AUDIO from "../assets/audios/effects/speed_up.mp3";
import OUTRO from "../assets/audios/background/outro.mp4";
import BOSS_AUDIO from "../assets/audios/background/boss.mp3";
import LEVEL_1 from "../assets/images/projectile_1.png";
import LEVEL_2 from "../assets/images/projectile_2.png";
import LEVEL_3 from "../assets/images/projectile_3.png";
import GUIDED from "../assets/images/projectile_4.png";
import NORMAL from "../assets/images/projectile_1_enemy.png";
import AIMED from "../assets/images/projectile_2_enemy.png";
import GUIDED_ENEMY from "../assets/images/projectile_3_enemy.png";
import BOOMERANG from "../assets/images/projectile_4_enemy.png";
import BOSS_GUIDED from "../assets/images/projectile_5_enemy.png";
import POWER_UP from "../assets/images/power_up.png";
import SPEED_UP from "../assets/images/speed_up.png";
import EXPLOSION_1 from "../assets/images/explosion_enemy_1.png";
import EXPLOSION_2 from "../assets/images/explosion_enemy_2.png";
import EXPLOSION_3 from "../assets/images/explosion_enemy_3.png";
import EXPLOSION_4 from "../assets/images/explosion_enemy_4.png";
import EXPLOSION_5 from "../assets/images/explosion_enemy_5.png";
import EXPLOSION_6 from "../assets/images/explosion_enemy_6.png";
import EXPLOSION_7 from "../assets/images/explosion_enemy_7.png";
import EXPLOSION_8 from "../assets/images/explosion_enemy_8.png";
import EXPLOSION_9 from "../assets/images/explosion_enemy_9.png";
import EXPLOSION_10 from "../assets/images/explosion_enemy_10.png";
import EXPLOSION_11 from "../assets/images/explosion_enemy_11.png";
import EXPLOSION_BOSS_1 from "../assets/images/explosion_boss_1.png";
import EXPLOSION_BOSS_2 from "../assets/images/explosion_boss_2.png";
import EXPLOSION_BOSS_3 from "../assets/images/explosion_boss_3.png";
import EXPLOSION_BOSS_4 from "../assets/images/explosion_boss_4.png";
import EXPLOSION_BOSS_5 from "../assets/images/explosion_boss_5.png";
import EXPLOSION_BOSS_6 from "../assets/images/explosion_boss_6.png";
import EXPLOSION_BOSS_7 from "../assets/images/explosion_boss_7.png";
import EXPLOSION_BOSS_8 from "../assets/images/explosion_boss_8.png";
import EXPLOSION_BOSS_9 from "../assets/images/explosion_boss_9.png";
import EXPLOSION_BOSS_10 from "../assets/images/explosion_boss_10.png";
import EXPLOSION_BOSS_11 from "../assets/images/explosion_boss_11.png";
import EXPLOSION_BOSS_12 from "../assets/images/explosion_boss_12.png";
import EXPLOSION_BOSS_13 from "../assets/images/explosion_boss_13.png";
import EXPLOSION_BOSS_14 from "../assets/images/explosion_boss_14.png";
import EXPLOSION_BOSS_15 from "../assets/images/explosion_boss_15.png";
import EXPLOSION_BOSS_16 from "../assets/images/explosion_boss_16.png";
import EXPLOSION_BOSS_17 from "../assets/images/explosion_boss_17.png";
import EXPLOSION_BOSS_18 from "../assets/images/explosion_boss_18.png";
import EXPLOSION_BOSS_19 from "../assets/images/explosion_boss_19.png";
import EXPLOSION_BOSS_20 from "../assets/images/explosion_boss_20.png";

const PLAYER = {
  STATIC,
  STRAIGHT,
  LEFT,
  RIGHT,
  LIFE,
};

const ENEMIES = {
  HEAVY,
  HEAVY_HIT,
  BUG,
  BUG_HIT,
  MINI,
  MINI_HIT,
  CANNON,
  CANNON_HIT,
  DANGER,
  DANGER_HIT,
  WINGS,
  WINGS_HIT,
  CROSS,
  CROSS_HIT,
  COW,
  COW_HIT,
  EMPEROR,
  EMPEROR_HIT,
  BOT,
  BOT_HIT,
  BOSS,
  BOSS_HIT,
};

const BACKGROUNDS = {
  BASE,
  BLOCK,
  PLATE,
  SPACE_BOSS,
};

const IMAGE = {
  TITLE,
  INSTRUCTION_START,
  PAUSED,
  RESUME,
  REPLAY,
  GAME_OVER,
  OUTRO_TITLE,
  OUTRO_MESSAGE,
};

const AUDIO = {
  BATTLE,
  INTRO,
  EXPLOSION_AUDIO,
  SHOT,
  POWER_UP: POWER_UP_AUDIO,
  SPEED_UP: SPEED_UP_AUDIO,
  OUTRO,
  BOSS: BOSS_AUDIO,
};

const PROJECTILE = {
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  GUIDED,
};

const ENEMY_PROJECTILE = {
  NORMAL,
  AIMED,
  GUIDED: GUIDED_ENEMY,
  BOOMERANG,
  BOSS_GUIDED,
};

const EXPLOSION = {
  1: EXPLOSION_1,
  2: EXPLOSION_2,
  3: EXPLOSION_3,
  4: EXPLOSION_4,
  5: EXPLOSION_5,
  6: EXPLOSION_6,
  7: EXPLOSION_7,
  8: EXPLOSION_8,
  9: EXPLOSION_9,
  10: EXPLOSION_10,
  11: EXPLOSION_11,
};

const EXPLOSION_BOSS = {
  1: EXPLOSION_BOSS_1,
  2: EXPLOSION_BOSS_2,
  3: EXPLOSION_BOSS_3,
  4: EXPLOSION_BOSS_4,
  5: EXPLOSION_BOSS_5,
  6: EXPLOSION_BOSS_6,
  7: EXPLOSION_BOSS_7,
  8: EXPLOSION_BOSS_8,
  9: EXPLOSION_BOSS_9,
  10: EXPLOSION_BOSS_10,
  11: EXPLOSION_BOSS_11,
  12: EXPLOSION_BOSS_12,
  13: EXPLOSION_BOSS_13,
  14: EXPLOSION_BOSS_14,
  15: EXPLOSION_BOSS_15,
  16: EXPLOSION_BOSS_16,
  17: EXPLOSION_BOSS_17,
  18: EXPLOSION_BOSS_18,
  19: EXPLOSION_BOSS_19,
  20: EXPLOSION_BOSS_20,
};

const ITEM_IMAGE = {
  POWER_UP,
  SPEED_UP,
};

export {
  PLAYER,
  ENEMIES,
  BACKGROUNDS,
  IMAGE,
  AUDIO,
  PROJECTILE,
  ENEMY_PROJECTILE,
  EXPLOSION,
  EXPLOSION_BOSS,
  ITEM_IMAGE,
};
