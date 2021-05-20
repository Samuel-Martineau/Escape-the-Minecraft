import { Frame } from './lib/components/Frame.js';
import { FrameComponent } from './lib/components/FrameComponent.js';
import { ClickableArea } from './lib/components/ClickableArea.js';
import { ItemGrid } from './lib/components/ItemGrid.js';
import { Item } from './lib/components/Item.js';
import { Position } from './lib/utility/Position.js';
import { Size } from './lib/utility/Size.js';
import { Inventory } from './lib/components/Inventory.js';

window.HTMLFrame = document.querySelector('.frame');
const framesList = {
  0: new Frame('0.png'),
  1: new Frame('1.png'),
  2: new Frame('2.png'),
  3: new Frame('3.png'),
};
let currentFrameIndex = -1;

nextFrame();

new Inventory();

const chest = new ClickableArea(
  new Size(7, 12),
  new Position(undefined, '15%', '34%', undefined),
);
chest.addEventListener('click', () => {
  const itemsList = [
    'stick.png',
    'stone.png',
    'stone.png',
    'stick.png',
    'stone.png',
  ];
  const chestGui = new FrameComponent('chest-gui.png');
  const itemsGrid = new ItemGrid(
    itemsList.length,
    1,
    new Position('27%', undefined, '2%', '34.2%'),
  );
  itemsList.forEach((item) => {
    new Item(itemsGrid, item);
  });

  const closeInstruction = document.createElement('h3');
  closeInstruction.innerText = 'Appuyez sur «Échap» pour fermer ce coffre.';
  closeInstruction.style.zIndex = 11000;
  closeInstruction.style.color = 'white';
  closeInstruction.style.position = 'absolute';
  closeInstruction.style.top = '10%';
  closeInstruction.style.left = '50%';
  closeInstruction.style.fontSize = '3vh';
  closeInstruction.style.transform = 'translateX(-50%)';
  closeInstruction.style.textAlign = 'center';

  chestGui.html.appendChild(closeInstruction);

  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.keyCode === 27) {
      chestGui.destroy();
      itemsGrid.destroy();
    }
  });

  // nextFrame();
});

function nextFrame() {
  const nextFrame = framesList[++currentFrameIndex];
  nextFrame.show();
}
