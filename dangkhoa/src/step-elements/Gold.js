import { Gui } from '../../lib/components/Gui.js';
import { Area } from '../../lib/components/Area.js';
import { ItemGrid } from '../../lib/components/Items/ItemGrid.js';
import { Item } from '../../lib/components/Items/Item.js';
import { Position } from '../../lib/utility/Position.js';
import { Size } from '../../lib/utility/Size.js';
import { GameElement } from '../../lib/GameElement.js';

import { chestItemsList } from '../../lib/constants.js';

const pickaxeImage = document.createElement('img');
const pickaxeItem = new Item('stone_pickaxe.png');
let holdingPickaxe = false;

function grabPickaxe(e) {
  pickaxeImage.style.top = e.clientY - 40 + 'px';
  pickaxeImage.style.left = e.clientX - 40 + 'px';
}

export class Gold extends GameElement {
  constructor(goldMinedCallback) {
    super();

    // Create Gold Area
    const gold = new Area(
      new Size(17, 20),
      new Position('45%', undefined, undefined, '5%'),
      '',
    );

    // Add Event Listeners
    let hoverTime;

    gold.addEventListener('mouseover', () => {
      if (holdingPickaxe) {
        hoverTime = setTimeout(() => {
          window.HTMLFrame.removeEventListener('mousemove', grabPickaxe);
          document.body.style.cursor = null;
          goldMinedCallback();
          pickaxeImage.remove();
          pickaxeItem.destroy();
          gold.destroy();
        }, 3000);
        pickaxeImage.style.animation = 'usePickaxe 1s infinite';
      }
    });

    gold.addEventListener('mouseout', () => {
      if (holdingPickaxe) {
        clearTimeout(hoverTime);
        pickaxeImage.style.animation = null;
      }
    });
  }
}

export function giveStonePickaxe(inventory) {
  pickaxeImage.src = 'images/items/stone_pickaxe.png';
  pickaxeImage.style.width = '80px';
  pickaxeImage.style.height = '80px';
  pickaxeImage.style.position = 'fixed';
  pickaxeImage.style.imageRendering = 'pixelated';
  pickaxeImage.style.imageRendering = '-moz-crisp-edges';
  pickaxeImage.style.imageRendering = 'crisp-edges';
  pickaxeImage.style.pointerEvents = 'none';
  pickaxeImage.style.display = 'none';
  window.HTMLFrame.appendChild(pickaxeImage);
  pickaxeItem.addEventListener('click', (e) => {
    if (inventory.grid.hasItem('stone_pickaxe.png')) {
      pickaxeItem.hide();
      document.body.style.cursor = 'grabbing';
      holdingPickaxe = true;
      window.HTMLFrame.addEventListener('mousemove', grabPickaxe);
      pickaxeImage.style.display = null;
    }
  });
  return pickaxeItem;
}
