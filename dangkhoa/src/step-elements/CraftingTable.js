import { Gui } from '../../lib/components/Gui.js';
import { Area } from '../../lib/components/Area.js';
import { ItemGrid } from '../../lib/components/Items/ItemGrid.js';
import { Item } from '../../lib/components/Items/Item.js';
import { Position } from '../../lib/utility/Position.js';
import { Size } from '../../lib/utility/Size.js';
import { GameElement } from '../../lib/GameElement.js';

export class CraftingTable extends GameElement {
  constructor(pickaxeItem, pickaxeHasBeenTakenCallback) {
    super();

    // Create Crafting Table Area
    const craftingTable = new Area(
      new Size(17, 31),
      new Position(undefined, undefined, '7%', '41.5%'),
    );

    // Create CCrafting Table Gui
    const craftingTableGui = new Gui(
      'crafting-table-gui.png',
      'Appuyez sur «Échap» pour fermer cette table de craft.',
    );
    craftingTableGui.hide();

    // Create Crafting Table Grid
    const craftingTableGrid = new ItemGrid(
      3,
      3,
      new Position('27%', undefined, undefined, '38.5%'),
    );
    craftingTableGrid.hide();

    // Create Pickaxe Grid and add Pickaxe
    const pickaxeGrid = new ItemGrid(
      1,
      1,
      new Position('33%', '39.7%', undefined, undefined),
    );
    pickaxeGrid.hide();
    pickaxeGrid.addItem(pickaxeItem, 0, 0);

    // Add Event Listeners
    craftingTable.addEventListener('click', () => {
      craftingTableGui.show();
      craftingTableGrid.show();
      pickaxeItem.show();

      craftingTableGui.addEventListener(
        'close',
        function close() {
          craftingTableGui.hide();
          craftingTableGrid.hide();
          // Go to nextFrame if pickaxe has been crafted and taken
          if (pickaxeGrid.isEmpty()) {
            craftingTable.destroy();
            pickaxeHasBeenTakenCallback();
          } else {
            pickaxeItem.hide();
          }
          craftingTableGui.removeEventListener('close', close);
        },
        { once: true },
      );
    });

    craftingTableGrid.addEventListener('itemdrop', () => {
      const pickaxeCraft = [
        ['stone.png', 'stone.png', 'stone.png'],
        [undefined, 'stick.png', undefined],
        [undefined, 'stick.png', undefined],
      ];
      if (
        craftingTableGrid.html.itemMapping.toString() ===
        pickaxeCraft.toString()
      ) {
        // Pickaxe has been crafted
        craftingTableGrid.destroy();
        pickaxeGrid.show();
      }
    });
  }
}
