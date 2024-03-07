import { BLOCKS } from "./path";

const LEFT_BLOCKS = [BLOCKS.FIRST_LEFT, BLOCKS.SECOND_LEFT, BLOCKS.THIRD_LEFT];

const RIGHT_BLOCKS = [
  BLOCKS.FIRST_RIGHT,
  BLOCKS.SECOND_RIGHT,
  BLOCKS.THIRD_RIGHT,
];

const BLOCK_LIST = [
  {
    GROUP: "left",
    ITEMS: [
      { img: new Image(), src: BLOCKS.FIRST_LEFT },
      { img: new Image(), src: BLOCKS.SECOND_LEFT },
      { img: new Image(), src: BLOCKS.THIRD_LEFT },
    ],
  },
  {
    GROUP: "right",
    ITEMS: [
      { img: new Image(), src: BLOCKS.FIRST_RIGHT },
      { img: new Image(), src: BLOCKS.SECOND_RIGHT },
      { img: new Image(), src: BLOCKS.THIRD_RIGHT },
    ],
  },
];

const BLOCK_SCALE = 2;
const BLOCK_ID = "block-canvas";

export { BLOCK_LIST, BLOCK_SCALE, BLOCK_ID, LEFT_BLOCKS, RIGHT_BLOCKS };
