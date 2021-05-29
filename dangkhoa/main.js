import { FrameComponent } from './lib/components/FrameComponent.js';
import { Area } from './lib/components/Area.js';
import { ItemGrid } from './lib/components/Items/ItemGrid.js';
import { Item } from './lib/components/Items/Item.js';
import { Position } from './lib/utility/Position.js';
import { Size } from './lib/utility/Size.js';
import { Inventory } from './lib/components/Inventory.js';

import { framesList, chestItemsList } from './lib/constants.js';

window.HTMLFrame = document.querySelector('.frame');
let currentFrameIndex = -1;
let currentStepIndex = -1;

const inventory = new Inventory();

const steps = [
  () => {
    nextFrame();
    initChest();
    initCrafter();
  },
  () => {
    // if (!inventory.grid.hasItem('stone_pickaxe.png'))
    //   inventory.grid.addItem(giveStonePickaxe(), 0, 0);
  },
];

nextStep();

function nextStep(index) {
  currentStepIndex++;
  const initStep = steps[currentStepIndex];
  initStep();
}

function nextFrame() {
  const nextFrame = framesList[++currentFrameIndex];
  nextFrame.show();
}

function giveStonePickaxe() {
  const pickaxeItem = new Item('stone_pickaxe.png');
  pickaxeItem.addEventListener('click', () => {
    if (inventory.grid.hasItem('stone_pickaxe.png')) {
      const pickaxeImage = document.createElement('img');
      pickaxeImage.src = 'images/items/stone_pickaxe.png';
      pickaxeImage.style.width = '80px';
      pickaxeImage.style.height = '80px';
      pickaxeImage.style.position = 'fixed';
      pickaxeImage.style.imageRendering = 'pixelated';
      pickaxeImage.style.imageRendering = '-moz-crisp-edges';
      pickaxeImage.style.imageRendering = 'crisp-edges';
      window.HTMLFrame.appendChild(pickaxeImage);
      window.HTMLFrame.addEventListener('mousemove', (e) => {
        pickaxeImage.style.top = e.clientY - 40 + 'px';
        pickaxeImage.style.left = e.clientX - 40 + 'px';
        document.body.style.cursor = 'grabbing';
      });
    }
  });
  return pickaxeItem;
}

function initCrafter() {
  const crafter = new Area(
    new Size(17, 31),
    new Position(undefined, undefined, '7%', '41.5%'),
  );
  const crafterGui = new FrameComponent('crafter-gui.png');
  const itemsGrid = new ItemGrid(
    3,
    3,
    new Position('27%', undefined, undefined, '38.5%'),
  );
  const pickaxeGrid = new ItemGrid(
    1,
    1,
    new Position('33%', '39.7%', undefined, undefined),
  );

  crafterGui.hide();
  itemsGrid.hide();
  pickaxeGrid.hide();

  const pickaxeItem = giveStonePickaxe();

  pickaxeGrid.addItem(pickaxeItem, 0, 0);

  crafter.addEventListener('click', () => {
    crafterGui.show();
    itemsGrid.show();
    pickaxeItem.show();

    window.addEventListener(
      'keydown',
      (e) => {
        e.preventDefault();
        if (e.keyCode === 27) {
          crafterGui.hide();
          itemsGrid.hide();
          pickaxeItem.hide();
          // Go to nextFrame if pickaxe has been crafted and taken
          if (!pickaxeGrid.hasItem('stone_pickaxe.png')) {
            crafter.destroy();
            pickaxeItem.show();
            nextFrame();
          }
        }
      },
      { once: true },
    );
  });

  itemsGrid.addEventListener('itemdrop', () => {
    const pickaxeCraft = [
      ['stone.png', 'stone.png', 'stone.png'],
      [undefined, 'stick.png', undefined],
      [undefined, 'stick.png', undefined],
    ];
    if (itemsGrid.html.itemMapping.toString() === pickaxeCraft.toString()) {
      itemsGrid.destroy();
      pickaxeGrid.show();
    }
  });

  // Add instructions
  const closeInstruction = document.createElement('h3');
  closeInstruction.innerText =
    'Appuyez sur «Échap» pour fermer cette table de craft.';
  closeInstruction.style.zIndex = 11000;
  closeInstruction.style.color = 'white';
  closeInstruction.style.position = 'absolute';
  closeInstruction.style.top = '10%';
  closeInstruction.style.left = '50%';
  closeInstruction.style.fontSize = '3vh';
  closeInstruction.style.transform = 'translateX(-50%)';
  closeInstruction.style.textAlign = 'center';
  crafterGui.html.appendChild(closeInstruction);
}

function initChest() {
  const chest = new Area(
    new Size(7, 12),
    new Position(undefined, '15%', '34%', undefined),
  );
  const chestGui = new FrameComponent('chest-gui.png');
  const itemsGrid = new ItemGrid(
    chestItemsList.length,
    1,
    new Position('27%', undefined, undefined, '34.2%'),
  );
  chestItemsList.forEach((itemImagePath, i) => {
    itemsGrid.addItem(new Item(itemImagePath), i, 0);
  });
  chestGui.hide();
  itemsGrid.hide();

  chest.addEventListener('click', () => {
    chestGui.show();
    itemsGrid.show();

    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.keyCode === 27) {
        chestGui.hide();
        itemsGrid.hide();
      }
    });
  });

  // Add instructions
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
}
