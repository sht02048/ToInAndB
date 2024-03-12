class EnemyBase {
  constructor(game) {
    this.game = game;

    const min = Math.ceil(this.game.minX);
    const max = Math.floor(this.game.maxX);

    this.randomPosition = Math.floor(Math.random() * (max - min)) + min;
    this.x = this.randomPosition;
    this.y = 0;
    this.hitFrame = 0;
    this.isHit = false;
    this.explosionFrame = 0;
    this.isDestroyed = false;
  }
}

export default EnemyBase;
