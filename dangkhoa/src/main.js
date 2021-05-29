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
import { End } from './step-elements/End.js';

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
    solution([
      "Prendre les items du coffre à droite et les mettre dans l'inventaire en dessous",
      "Prendre ces items dans l'inventaire et les mettre dans la table de craft au milieu de l'écran",
      "Une pioche apparaitra dans la table de craft et la metrre dans l'inventaire",
    ]);
  },
  // Step 2
  () => {
    nextFrame(1);
    const gold = new Gold(inventory, () => {
      nextStep();
    });
    if (!inventory.grid.hasItem('stone_pickaxe.png'))
      inventory.grid.addItem(giveStonePickaxe(inventory), 0, 0);
    solution([
      "Clicker sur la pioche et passer le curseur sur les minerais d'or pour miner",
      "De l'or apparaitra dans l'inventaire",
    ]);
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
    solution(["Dragger toute l'or dans l'inventaire sur le cochon"]);
  },
  // Step 4
  () => {
    nextFrame(3);
    solution(['Vous avez fini!']);
    inventory.destroy();
    inventory.grid.destroy();
    const end = new End(() => {
      window.parent.nextPerson();
    });
  },
];

// Start game
nextStep(2);

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

function solution(solutionSteps) {
  let text = `%cSOLUTION:\n`;
  solutionSteps.forEach((step, i) => {
    text += `${i + 1}. ${step}\n`;
  });
  console.log(text, 'font-weight:bold;');
}
