import { Gui } from '../lib/components/Gui.js';
import { Area } from '../lib/components/Area.js';
import { ItemGrid } from '../lib/components/Items/ItemGrid.js';
import { Item } from '../lib/components/Items/Item.js';
import { Position } from '../lib/utility/Position.js';
import { Size } from '../lib/utility/Size.js';

import { Inventory } from './step-elements/Inventory.js';
import { Chest } from './step-elements/Chest.js';
import { CraftingTable } from './step-elements/CraftingTable.js';
import { Gold, giveStonePickaxe } from './step-elements/Gold.js';
import { Pig } from './step-elements/Pig.js';

import { framesList } from '../lib/constants.js';

window.HTMLFrame = document.querySelector('.frame');
let currentFrameIndex = -1;
let currentStepIndex = -1;

const inventory = new Inventory();

const steps = [
  // Step 1
  () => {
    nextFrame();
    const chest = new Chest();
    const craftingTable = new CraftingTable(giveStonePickaxe(inventory), () => {
      nextStep();
    });
  },
  // Step 2
  () => {
    nextFrame(1);
    const gold = new Gold(() => {
      nextStep();
    });
    if (!inventory.grid.hasItem('stone_pickaxe.png'))
      inventory.grid.addItem(giveStonePickaxe(inventory), 0, 0);
  },
  // Step 3
  () => {
    nextFrame(2);
    const pig = new Pig(inventory, () => {
      nextStep();
    });
    for (let i = 0; i < 3; i++) {
      inventory.grid.addItem(new Item('gold.png'), i, 0);
    }
  },
  // Step 4
  () => {
    nextFrame(3);
    console.log('Done');
  },
];

// Start game
nextStep();

function nextStep(stepNumber) {
  const index = stepNumber - 1;
  if (index) {
    currentStepIndex = index;
  } else {
    currentStepIndex++;
  }
  const initStep = steps[currentStepIndex];
  initStep();
}

function nextFrame(minFrame) {
  if (currentFrameIndex < minFrame) {
    currentFrameIndex = minFrame;
  } else {
    currentFrameIndex++;
  }
  const nextFrame = framesList[currentFrameIndex];
  nextFrame.show();
}
