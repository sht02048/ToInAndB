import Entrance from "../../scenes/Entrance";

describe("Entrance", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let entrance;

  beforeEach(() => {
    entrance = new Entrance();
  });

  it("should have proper functions", () => {
    expect(entrance.update).to.be.a("function");
    expect(entrance.render).to.be.a("function");
    expect(entrance.setTarget).to.be.a("function");
    expect(entrance.setSceneTargetList).to.be.a("function");
    expect(entrance.checkSceneStatus).to.be.a("function");
  });

  it("should render bug and heavy", () => {
    entrance.frame = 301;
    entrance.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should update bug and heavy", () => {
    entrance.frame = 301;
    entrance.update();
    entrance.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should check if scene is done", () => {
    entrance.bugList.forEach((bug) => (bug.isDestroyed = true));
    entrance.heavy.isDestroyed = true;

    entrance.checkSceneStatus();

    expect(entrance.checkSceneStatus()).to.equal(true);
  });
});
