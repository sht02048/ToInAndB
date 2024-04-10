import Intro from "../../scenes/Intro";

describe("Intro", () => {
  const mainCanvas = document.createElement("canvas");
  const introCanvas = document.createElement("canvas");
  mainCanvas.id = "main-canvas";
  introCanvas.id = "intro-canvas";

  document.body.appendChild(mainCanvas);
  document.body.appendChild(introCanvas);

  let intro;

  beforeEach(() => {
    intro = new Intro();
  });

  it("should have proper functions", () => {
    expect(intro.float).to.be.a("function");
    expect(intro.out).to.be.a("function");
    expect(intro.render).to.be.a("function");
    expect(intro.playIntroMusic).to.be.a("function");
    expect(intro.playBattleMusic).to.be.a("function");
  });

  it("should out", () => {
    const originalTitleY = intro.titleY;
    const originalInstructionY = intro.instructionY;
    const inAndOutSpeed = 4;

    intro.out();

    expect(originalTitleY).to.equal(intro.titleY - inAndOutSpeed);
    expect(originalInstructionY).to.equal(intro.instructionY - inAndOutSpeed);
  });

  it("should render title and instruction", () => {
    intro.render();

    const ctx = introCanvas.getContext("2d");
    const events = ctx.__getEvents();

    expect(events).toMatchSnapshot();
  });

  describe("should float", () => {
    const flowSpeed = 0.1;
    let originalInstructionY;
    let originalIsUp;

    beforeEach(() => {
      originalInstructionY = intro.instructionY;
      originalIsUp = intro.originalIsUp;
    });

    it("go up when isUp is true", () => {
      intro.float();

      expect(originalInstructionY).to.equal(intro.instructionY - flowSpeed);
    });

    it("go down when isUp is false", () => {
      intro.isUp = false;
      intro.float();

      expect(originalInstructionY).to.equal(intro.instructionY + flowSpeed);
    });

    it("change the direction when amplitude is 100", () => {
      intro.amplitude = 99;

      intro.float();

      expect(originalIsUp).to.not.equal(intro.isUp);
    });
  });
});
