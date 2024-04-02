import Renderer from "../graphics/Renderer";

import Boss from "../entities/enemies/Boss";
import Bot from "../entities/enemies/Bot";

class ThroneRoom extends Renderer {
  #bossWidth = 228;
  #spawnInterval = 60;

  constructor() {
    super();

    this.boss = new Boss({
      x: this.canvasWidth / 2 - this.#bossWidth / 2,
      y: -300,
    });
    this.botList = [];

    this.shouldBeDisplayed = false;
    this.hasStarted = false;
  }

  update() {
    this.boss.update();
    this.botList.forEach((bot) => {
      if (this.boss.isDestroyed) {
        bot.isDestroyed = true;
        bot.makeExplosionSound = false;
      }

      bot.update();
    });

    this.spawnBot();

    this.frame += 1;
  }

  render() {
    this.boss.render();
    this.botList.forEach((bot) => bot.render());
  }

  spawnBot() {
    if (
      !this.boss.shouldSpawnBot ||
      this.frame % this.#spawnInterval !== 0 ||
      this.boss.isDestroyed
    ) {
      return;
    }

    const leftBotX = this.boss.x + this.#bossWidth / 2 - 60;
    const rightBotX = this.boss.x + this.#bossWidth / 2 + 10;
    const botY = this.boss.y;

    const leftBot = new Bot({
      x: leftBotX,
      y: botY,
      isLeft: true,
    });
    const rightBot = new Bot({
      x: rightBotX,
      y: botY,
      isLeft: false,
    });

    this.botList.push(leftBot, rightBot);
  }

  setTarget(player) {
    this.boss.setTargetList(player);
    this.botList.forEach((bot) => bot.setTargetList(player));
  }

  setSceneTargetList() {
    const sceneTargetList = [this.boss];

    this.botList.forEach((bot) => sceneTargetList.push(bot));

    return sceneTargetList;
  }

  checkSceneStatus() {
    this.isDone = true;

    if (!this.boss.isDestroyed) {
      this.isDone = false;
    }

    this.botList.forEach((bot) => {
      if (!bot.isDestroyed && !bot.isVanished) {
        this.isDone = false;
      }
    });

    return this.isDone;
  }
}

export default ThroneRoom;
