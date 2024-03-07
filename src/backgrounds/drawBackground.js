import BACKGROUND_SPEED from "../constants/speed";

function drawBackground({
  itemList,
  itemScale = 2,
  canvasId,
  splitCanvas = false,
}) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  canvas.style.zIndex = splitCanvas ? 1 : 3;

  const itemPositions = {
    left: [],
    right: [],
  };

  const totalItemsToLoad = itemList.reduce(
    (acc, group) => acc + group.ITEMS.length,
    0,
  );

  let totalItemsLoaded = 0;
  let totalSequenceHeight = 0;

  try {
    itemList.forEach((group) => {
      group.ITEMS.forEach((item) => {
        item.img.onload = () => {
          totalItemsLoaded += 1;

          if (totalItemsLoaded === totalItemsToLoad) {
            totalSequenceHeight = itemList[0].ITEMS.reduce(
              (acc, item) => acc + item.img.height * itemScale,
              0,
            );

            itemList.forEach((group) =>
              setItemPositions(
                group.ITEMS,
                itemPositions[group.GROUP],
                itemScale,
              ),
            );

            initializeDrop();
          }
        };

        item.img.src = item.src;
      });
    });
  } catch (error) {
    console.error("Failed to load images. Error:", error);
  }

  function setItemPositions(ITEMS, positions, scale) {
    let positionY = 0;

    while (positionY < canvas.height + totalSequenceHeight) {
      ITEMS.forEach((item) => {
        positions.push({
          item: item.img,
          y: positionY,
        });

        positionY += item.img.height * scale;
      });
    }
  }

  function initializeDrop() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    ["left", "right"].forEach((group) => {
      const positionX =
        group === "left"
          ? 0
          : splitCanvas
            ? canvas.width / 2
            : canvas.width - 90;
      dropItems(positionX, itemPositions[group], itemScale);
    });

    requestAnimationFrame(initializeDrop);
  }

  function dropItems(positionX, positions, scale) {
    positions.forEach((position) => {
      position.y += BACKGROUND_SPEED;

      if (position.y - position.item.height * scale > canvas.height) {
        position.y -= canvas.height + totalSequenceHeight;
      }

      ctx.drawImage(
        position.item,
        positionX,
        position.y,
        position.item.width * scale,
        position.item.height * scale,
      );
    });
  }
}

export default drawBackground;
