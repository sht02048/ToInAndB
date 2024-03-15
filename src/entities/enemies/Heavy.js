import Explosion from "../../collisions/Explosion";
import Renderer from "../../game/Renderer";
import { SPRITE } from "../../constants/path";

class Heavy {
  #heavyWidth = 44;
  #heavyHeight = 52;

  constructor(x, y) {
    this.explosion = new Explosion();
    this.ship = new Renderer(SPRITE.ENEMY_HEAVY);
    this.destroyedShip = new Renderer(SPRITE.ENEMY_HEAVY_DESTROYED);

    this.x = x;
    this.y = y;
    this.isDestroyed = false;
    this.isVanished = false;
    this.isHit = false;
    this.healthPoint = 4;
    this.hitFrame = 5;
  }

  setSize() {
    this.width = this.ship.width;
    this.height = this.ship.height;
  }

  update() {
    if (this.isDestroyed || this.isVanished) {
      return;
    }

    this.y += 1;

    this.setSize();
    this.checkShipStatus();
  }

  render() {
    if (this.isDestroyed) {
      this.explosion.destroy(this.x, this.y, this.width);
      return;
    }

    if (this.isVanished) {
      return;
    }

    if (this.isHit) {
      this.renderHit();
      return;
    }

    this.ship.render(this.x, this.y);
  }

  renderHit() {
    this.hitFrame -= 1;
    this.destroyedShip.render(this.x, this.y);

    if (this.hitFrame === 0) {
      this.isHit = false;
    }
  }

  checkShipStatus() {
    if (this.healthPoint <= 0) {
      this.isDestroyed = true;
    }

    if (this.y > this.ship.maxY) {
      this.isVanished = true;
    }
  }
}

export default Heavy;
