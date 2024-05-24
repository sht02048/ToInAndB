import Renderer from "../graphics/Renderer";

import Player from "../entities/Player";
import Boss from "../entities/enemies/Boss";
import Bot from "../entities/enemies/Bot";

class ThroneRoom extends Renderer {
  #bossWidth = 228;
  #spawnInterval = 60;

  private boss: Boss;
  private botList: Bot[];
  private shouldBeDisplayed: boolean;
  private hasStarted: boolean;
  private isDone: boolean;

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

  update(): void {
    this.boss.update();
    this.botList.forEach((bot: Bot) => {
      if (this.boss.isDestroyed) {
        bot.markDestroyed();
      }

      bot.update();
    });

    this.spawnBot();

    this.frame += 1;
  }

  render(): void {
    this.boss.render();
    this.botList.forEach((bot) => bot.render());
  }

  spawnBot(): void {
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

  setTarget(player: Player): void {
    this.boss.setTargetList(player);
    this.botList.forEach((bot) => bot.setTargetList(player));
  }

  setSceneTargetList(): (Boss | Bot)[] {
    const sceneTargetList = [this.boss, ...this.botList];

    return sceneTargetList;
  }

  checkSceneStatus(): boolean {
    this.isDone = true;

    if (!this.boss.isDestroyed) {
      this.isDone = false;
    }

    this.botList.forEach((bot: Bot) => {
      if (!bot.isDestroyed && !bot.isVanished) {
        this.isDone = false;
      }
    });

    return this.isDone;
  }
}

export default ThroneRoom;
