import Hallway from "../../scenes/Hallway";

describe("Hallway", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let hallway;

  beforeEach(() => {
    hallway = new Hallway();
  });

  it("should have proper functions", () => {
    expect(hallway.update).to.be.a("function");
    expect(hallway.render).to.be.a("function");
    expect(hallway.setTarget).to.be.a("function");
    expect(hallway.setSceneTargetList).to.be.a("function");
    expect(hallway.checkSceneStatus).to.be.a("function");
  });

  it("should render mini, cannon and danger", () => {
    hallway.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should update mini, cannon and danger", () => {
    hallway.update();
    hallway.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should check if scene is done", () => {
    hallway.mini.isDestroyed = true;
    hallway.cannonList.forEach((cannon) => (cannon.isDestroyed = true));
    hallway.dangerList.forEach((danger) => (danger.isDestroyed = true));

    expect(hallway.checkSceneStatus()).to.equal(true);
  });
});
