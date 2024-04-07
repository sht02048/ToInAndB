import Player from "../../entities/Player";
import { PROJECTILE } from "../../constants/path";

describe("player", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let player;

  beforeEach(() => {
    player = new Player();
  });

  it("should have proper functions", () => {
    expect(player.update).to.be.a("function");
    expect(player.render).to.be.a("function");
  });

  it("should be rendered on canvas", () => {
    player.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should be destroyed when hit", () => {
    player.isHit = true;
    player.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should be rendered invincible mode", () => {
    player.isInvincible = true;
    player.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should be rendered spawn", () => {
    player.renderSpawn();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should update spawn", () => {
    const previousY = player.y;

    player.updateSpawn();

    const afterY = player.y;

    expect(previousY).to.equal(afterY + 2);

    player.invincibleFrame = -1;
    player.updateSpawn();

    expect(player.invincibleFrame).to.equal(200);
  });

  it("should handle level change", () => {
    player.level = 2;
    player.upgrade();

    expect(player.straightProjectile).to.equal(PROJECTILE.LEVEL_2);

    player.level = 3;
    player.upgrade();

    expect(player.straightProjectile).to.equal(PROJECTILE.LEVEL_3);
  });

  describe("should update", () => {
    it("its status", () => {
      player.healthPoint = 0;
      player.update();

      expect(player.isDestroyed).toEqual(true);
    });

    it("execute out", () => {
      const originalY = player.y;

      player.shouldOut = true;
      player.update();

      expect(originalY).to.not.equal(player.y);
    });
  });

  describe("should launch missiles", () => {
    beforeEach(() => {
      player.isShooting = true;
    });

    it("to straight", () => {
      player.reloadFrame = 15;

      player.launchMissile();

      const ctx = mainCanvas.getContext("2d");
      const events = ctx.__getEvents();

      expect(events).toMatchSnapshot();
    });

    it("to enemy", () => {
      player.reloadFrame = 99;
      player.level = 2;

      player.launchMissile();

      const ctx = mainCanvas.getContext("2d");
      const events = ctx.__getEvents();

      expect(events).toMatchSnapshot();
    });
  });
});
