import Heavy from "./Heavy";

class Enemy {
  constructor(game) {
    this.game = game;

    this.health = 5;
    this.enemyX = 0;
    this.enemyY = 0;

    // TODO scene 추가
    this.heavy1 = new Heavy(this.game);
    this.heavy2 = new Heavy(this.game);
    this.heavy3 = new Heavy(this.game);
  }

  update() {
    this.heavy1.update();
    this.heavy2.update();
    this.heavy3.update();
  }

  render() {
    this.heavy1.render();
    this.heavy2.render();
    this.heavy3.render();
  }
}

export default Enemy;
