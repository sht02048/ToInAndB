import { PLATES } from "./path";
import { CANVAS_WIDTH } from "./canvasScale";

const PLATE_LIST = [
  {
    GROUP: "left",
    ITEMS: [
      { img: new Image(), src: PLATES.FIRST_LEFT },
      { img: new Image(), src: PLATES.SECOND_LEFT },
    ],
  },
  {
    GROUP: "right",
    ITEMS: [
      { img: new Image(), src: PLATES.FIRST_RIGHT },
      { img: new Image(), src: PLATES.SECOND_RIGHT },
    ],
  },
];

const PLATE_WIDTH = 176;
const PLATE_SCALE = CANVAS_WIDTH / PLATE_WIDTH / 2;
const PLATE_ID = "plate-canvas";

export { PLATE_LIST, PLATE_SCALE, PLATE_ID };
