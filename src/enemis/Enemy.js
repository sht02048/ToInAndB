import Heavy from "./Heavy";

class Enemy {
  constructor(game) {
    this.game = game;

    this.health = 5;
    this.enemyX = 0;
    this.enemyY = 0;
  }

  spawn() {
    this.heavy = new Heavy(this.game);
    this.heavy.spawn();
  }

  update() {
    this.heavy.update();
  }

  render() {
    this.heavy.render();
  }
}

export default Enemy;
