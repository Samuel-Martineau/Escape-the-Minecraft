import { Gui } from '../../lib/components/Gui.js';
import { Area } from '../../lib/components/Area.js';
import { ItemGrid } from '../../lib/components/Items/ItemGrid.js';
import { Item } from '../../lib/components/Items/Item.js';
import { Position } from '../../lib/utility/Position.js';
import { Size } from '../../lib/utility/Size.js';
import { GameElement } from '../../lib/GameElement.js';

import { chestItemsList } from '../../lib/constants.js';

export class Chest extends GameElement {
  constructor() {
    super();

    // Create Chest Area
    const chest = new Area(
      new Size(7, 12),
      new Position(undefined, '15%', '34%', undefined),
    );

    // Create Chest Gui
    const chestGui = new Gui(
      'chest-gui.png',
      'Appuyez sur «Échap» pour fermer ce coffre.',
    );
    chestGui.hide();

    // Create Chest Items Grid and its Items
    const chestItemsGrid = new ItemGrid(
      9,
      3,
      new Position('42.9%', undefined, undefined, '34.2%'),
    );
    chestItemsGrid.hide();
    chestItemsList.forEach((itemImagePath, i) => {
      chestItemsGrid.addItem(
        new Item(itemImagePath),
        i,
        Math.round(Math.random() * 2),
      );
    });

    // Add Event Listeners
    chest.addEventListener('click', () => {
      chestGui.show();
      chestItemsGrid.show();
      const chestOpenSound = new Audio('sounds/chestopen.mp3');
      chestOpenSound.volume = 0.2;
      chestOpenSound.play();
      chestGui.addEventListener(
        'close',
        function close() {
          chestGui.hide();
          chestItemsGrid.hide();
          const chestClosedSound = new Audio('sounds/chestclosed.mp3');
          chestClosedSound.volume = 0.2;
          chestClosedSound.play();
          if (chestItemsGrid.isEmpty()) {
            chest.destroy();
            chestGui.destroy();
            chestItemsGrid.destroy();
          }
          chestGui.removeEventListener('close', close);
        },
        { once: true },
      );
    });
  }
}
