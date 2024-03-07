import { BASES } from "./path";
import { CANVAS_WIDTH } from "./canvasScale";

const BASE_LIST = [
  {
    GROUP: "left",
    ITEMS: [
      { img: new Image(), src: BASES.FIRST },
      { img: new Image(), src: BASES.SECOND },
      { img: new Image(), src: BASES.THIRD },
    ],
  },
  {
    GROUP: "right",
    ITEMS: [
      { img: new Image(), src: BASES.THIRD },
      { img: new Image(), src: BASES.SECOND },
      { img: new Image(), src: BASES.FIRST },
    ],
  },
];

const BASE_WIDTH = 1000;
const BASE_SCALE = CANVAS_WIDTH / BASE_WIDTH / 2;
const BASE_ID = "base-canvas";

export { BASE_LIST, BASE_SCALE, BASE_ID };
