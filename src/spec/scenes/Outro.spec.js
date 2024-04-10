import Outro from "../../scenes/Outro";

describe("Outro", () => {
  let haltFrame = 1920;
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let outro;

  beforeEach(() => {
    outro = new Outro();
  });

  it("should have proper functions", () => {
    expect(outro.update).to.be.a("function");
    expect(outro.render).to.be.a("function");
    expect(outro.playOutroMusic).to.be.a("function");
    expect(outro.pauseOutroMusic).to.be.a("function");
  });

  it("should render", () => {
    outro.render();

    const ctx = mainCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  it("should update", () => {
    const originalY = outro.y;

    while (haltFrame >= 0) {
      outro.update();
      haltFrame -= 1;
    }

    expect(originalY).to.not.equal(outro.y);
  });
});
