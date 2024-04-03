import ITEM_TYPE from "../../constants/item";
import CollisionDetector from "../../physics/CollisionDetector";

describe("collisionDetector", () => {
  let collisionDetector;

  beforeEach(() => {
    collisionDetector = new CollisionDetector();
  });

  it("should have proper functions", () => {
    expect(collisionDetector.setTargetList).to.be.a("function");
    expect(collisionDetector.setItem).to.be.a("function");
    expect(collisionDetector.detectItem).to.be.a("function");
    expect(collisionDetector.detectCollision).to.be.a("function");
    expect(collisionDetector.isOverLapping).to.be.a("function");
  });

  describe("should detect item collision", () => {
    let item;
    let target;

    beforeEach(() => {
      item = {
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        isGained: false,
        type: ITEM_TYPE.POWER_UP,
      };
      target = {
        x: 20,
        y: 20,
        width: 20,
        height: 32,
        isDestroyed: false,
      };
    });

    it("when item is adjacent to target", () => {
      collisionDetector.setItem(item);
      collisionDetector.setTargetList([target]);
      collisionDetector.detectItem();

      expect(item.isGained).to.equal(true);
    });

    it("but ignore when item is not adjacent to target", () => {
      target.x = 50;
      target.y = 50;

      collisionDetector.setItem(item);
      collisionDetector.setTargetList([target]);
      collisionDetector.detectItem();

      expect(item.isGained).to.equal(false);
    });

    it("but ignore when target is already destroyed", () => {
      target.isDestroyed = true;

      collisionDetector = new CollisionDetector();
      collisionDetector.setItem(item);
      collisionDetector.setTargetList([target]);
      collisionDetector.detectItem();

      expect(item.isGained).to.equal(false);
    });
  });

  describe("should detect collision between target and missile", () => {
    const healthPoint = 3;
    const explosionFrame = 5;

    let target;
    let missile;

    beforeEach(() => {
      target = {
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        healthPoint,
        isDestroyed: false,
        isVanished: false,
        isInvincible: false,
        isHit: false,
        explosion: { explosionFrame },
      };
      missile = {
        x: 10,
        y: 10,
        width: 28,
        height: 28,
        isVanished: false,
        damage: 1,
      };
    });

    it("when target is adjacent to missile", () => {
      collisionDetector.setItem(missile);
      collisionDetector.setTargetList([target]);
      collisionDetector.detectCollision();

      expect(target.isHit).to.equal(true);
      expect(missile.isVanished).to.equal(true);
      expect(target.healthPoint).to.equal(healthPoint - missile.damage);
      expect(target.explosion.explosionFrame).to.equal(0);
    });

    it("but ignore when target is not adjacent to missile", () => {
      missile.x = 33;
      missile.y = 33;

      collisionDetector.setItem(missile);
      collisionDetector.setTargetList([target]);
      collisionDetector.detectCollision();

      expect(target.isHit).to.equal(false);
      expect(missile.isVanished).to.equal(false);
      expect(target.healthPoint).to.equal(healthPoint);
      expect(target.explosion.explosionFrame).to.equal(explosionFrame);
    });

    it("but ignore when target or missile is not active", () => {
      target.isDestroyed = true;

      expect(target.isHit).to.equal(false);

      target.isDestroyed = false;
      target.isVanished = true;

      expect(target.isHit).to.equal(false);

      target.isVanished = false;
      target.isInvincible = true;

      expect(target.isHit).to.equal(false);

      target.isInvincible = false;
      missile.isVanished = true;

      expect(target.isHit).to.equal(false);
    });
  });
});
