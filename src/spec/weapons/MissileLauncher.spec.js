import MissileLauncher from "../../weapons/MissileLauncher";

import { PROJECTILE } from "../../constants/path";
import MISSILE_ROUTE_COMMAND from "../../constants/missileRouteCommand";

describe("missileLauncher", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  const missileY = 10;
  const missileX = 10;

  const singleMissileInformation = {
    projectilePath: PROJECTILE.LEVEL_1,
    x: missileX,
    y: missileY,
    missileWidth: 10,
    missileSpeed: 1,
    isAimed: true,
  };
  const multipleMissileInformation = {
    projectilePath: PROJECTILE.LEVEL_1,
    x: missileX,
    y: missileY,
    missileWidth: 10,
    missileSpeed: 1,
    isAimed: false,
    shouldTilt: true,
  };

  let missileLauncher;
  let missile;
  let target;
  let missileList;

  beforeEach(() => {
    target = {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
    };

    missileLauncher = new MissileLauncher(32, 32);
    missileLauncher.setTargetList([target]);
    missileList = missileLauncher.missileList;
  });

  it("should have proper functions", () => {
    expect(missileLauncher.setTargetList).to.be.a("function");
    expect(missileLauncher.makeMissile).to.be.a("function");
    expect(missileLauncher.loadSingleMissile).to.be.a("function");
    expect(missileLauncher.loadMultipleMissile).to.be.a("function");
    expect(missileLauncher.render).to.be.a("function");
    expect(missileLauncher.setMissileRoute).to.be.a("function");
  });

  it("should load single missile", () => {
    missileLauncher.loadSingleMissile(singleMissileInformation);
    missile = missileList[0];

    expect(missile.y).to.equal(missileY);
    expect(missile.width).to.equal(10);
    expect(missile.speed).to.equal(1);
    expect(missile.vx).to.be.a("number");
    expect(missile.vy).to.be.a("number");
    expect(missile.angle).to.be.a("number");
    expect(missile.targetIndex).to.equal(0);
  });

  it("should load multiple missiles", () => {
    missileLauncher.loadMultipleMissile(multipleMissileInformation);

    expect(missileList.length).to.equal(15);
    expect(missileList.length).to.equal(15);
  });

  it("should render missile", () => {
    missileLauncher.loadSingleMissile(singleMissileInformation);
    missileLauncher.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  describe("should setMissileRoute of", () => {
    let shipCenter;
    beforeEach(() => {
      missileLauncher.loadSingleMissile(singleMissileInformation);
      missile = missileList[0];
      shipCenter = missile.x;
    });

    it("player straight", () => {
      missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.PLAYER_STRAIGHT);

      expect(missile.y).to.equal(missileY - missile.speed);
    });

    it("enemy straight", () => {
      missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_STRAIGHT);

      expect(missile.y).to.equal(missileY + missile.speed);
    });

    it("enemy aimed", () => {
      missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_AIMED);

      expect(missile.x).to.equal(shipCenter + missile.vx);
      expect(missile.y).to.equal(missileY + missile.vy);
    });

    it("enemy guided", () => {
      missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.GUIDED);

      expect(missile.x).to.equal(shipCenter + missile.vx);
      expect(missile.y).to.equal(missileY + missile.vy);
    });

    it("enemy allway", () => {
      missileLauncher.setMissileRoute(MISSILE_ROUTE_COMMAND.ENEMY_ALLWAY);

      expect(missile.x).to.equal(shipCenter + missile.vx);
      expect(missile.y).to.equal(missileY + missile.vy);
    });
  });
});
