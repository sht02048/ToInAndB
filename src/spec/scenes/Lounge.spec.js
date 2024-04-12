import Lounge from "../../scenes/Lounge";

describe("Lounge", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let lounge;

  beforeEach(() => {
    lounge = new Lounge();
  });

  it("should have proper functions", () => {
    expect(lounge.update).to.be.a("function");
    expect(lounge.render).to.be.a("function");
    expect(lounge.setTarget).to.be.a("function");
    expect(lounge.setSceneTargetList).to.be.a("function");
    expect(lounge.checkSceneStatus).to.be.a("function");
  });

  it("should render wings and cross", () => {
    lounge.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should respawn cross", () => {
    const originalCrossNumber = lounge.crossList.length;
    lounge.frame = 299;
    lounge.update();

    expect(originalCrossNumber).to.not.equal(lounge.crossList.length);
  });

  it("should check if scene is done", () => {
    lounge.wings.isDestroyed = true;
    lounge.crossList.forEach((cross) => (cross.isDestroyed = true));

    expect(lounge.checkSceneStatus()).to.equal(true);
  });
});
