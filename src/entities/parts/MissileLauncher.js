import Missile from "./Missile";

class MissileLauncher {
  constructor(width, height) {
    this.x;
    this.y;
    this.width = width;
    this.height = height;

    this.missileList = [];
  }

  load(projectilePath, x, y, missileWidth, missileHeight) {
    const missile = new Missile(projectilePath, missileWidth, missileHeight);

    this.x = x;
    this.y = y;
    missile.x = this.x + this.width / 2 - missile.width / 2;
    missile.y = this.y - 50;

    this.missileList.push(missile);
  }

  render() {
    this.missileList.forEach((missile) => missile.render(missile.x, missile.y));
  }

  update(missileSpeed) {
    this.missileList.forEach((missile) => {
      if (missile.isVanished) {
        return;
      }

      missile.checkVanished();
      missile.launchStraight(missileSpeed);
    });
  }
}

export default MissileLauncher;
