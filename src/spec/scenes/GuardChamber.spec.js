import { beforeEach, describe, expect } from "vitest";
import GuardChamber from "../../scenes/GuardChamber";

describe("GuardChamber", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let guardChamber;

  beforeEach(() => {
    guardChamber = new GuardChamber();
  });

  it("should have proper functions", () => {
    expect(guardChamber.update).to.be.a("function");
    expect(guardChamber.render).to.be.a("function");
    expect(guardChamber.setTarget).to.be.a("function");
    expect(guardChamber.setSceneTargetList).to.be.a("function");
    expect(guardChamber.checkSceneStatus).to.be.a("function");
  });

  it("should render enemies", () => {
    guardChamber.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should render enemies", () => {
    guardChamber.update();
    guardChamber.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should check if the scene is done", () => {
    guardChamber.guard.isDestroyed = true;
    guardChamber.cowLeftList.forEach((cow) => (cow.isDestroyed = true));
    guardChamber.cowRightList.forEach((cow) => (cow.isDestroyed = true));

    expect(guardChamber.checkSceneStatus()).to.equal(true);
  });
});
