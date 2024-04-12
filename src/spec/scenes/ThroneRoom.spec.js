import { beforeEach } from "vitest";
import ThroneRoom from "../../scenes/ThroneRoom";

describe("ThroneRoom", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let throneRoom;

  beforeEach(() => {
    throneRoom = new ThroneRoom();
  });

  it("should have proper functions", () => {
    expect(throneRoom.update).to.be.a("function");
    expect(throneRoom.render).to.be.a("function");
    expect(throneRoom.spawnBot).to.be.a("function");
    expect(throneRoom.setTarget).to.be.a("function");
    expect(throneRoom.setSceneTargetList).to.be.a("function");
    expect(throneRoom.checkSceneStatus).to.be.a("function");
  });

  it("should render boss", () => {
    throneRoom.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should spawn bot", () => {
    const originalBotNumber = throneRoom.botList.length;
    throneRoom.frame = 60;
    throneRoom.boss.shouldSpawnBot = true;
    throneRoom.update();

    expect(originalBotNumber).to.not.equal(throneRoom.botList.length);
  });
});
