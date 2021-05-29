import { ItemGrid } from '../../lib/components/Items/ItemGrid.js';
import { Item } from '../../lib/components/Items/Item.js';
import { Position } from '../../lib/utility/Position.js';
import { GameElement } from '../../lib/GameElement.js';

export class Inventory extends GameElement {
  constructor() {
    super();

    // Create Inventory
    this.html = document.createElement('div');
    this.html.style.position = 'absolute';
    this.html.style.bottom = '0';
    this.html.style.left = '50%';
    this.html.style.transform = 'translateX(-50%)';
    this.html.style.zIndex = 10000;
    this.html.style.width = '38%';
    this.html.style.height = '50px';
    this.html.style.backgroundImage = 'url(images/inventory.png)';
    this.html.style.backgroundSize = 'contain';
    this.html.style.backgroundPosition = 'bottom';
    this.html.style.backgroundRepeat = 'no-repeat';
    this.html.style.imageRendering = 'pixelated';
    this.html.style.imageRendering = '-moz-crisp-edges';
    this.html.style.imageRendering = 'crisp-edges';

    // Create Inventory Grid
    this.grid = new ItemGrid(
      9,
      1,
      new Position(undefined, undefined, '0.7%', '50%'),
    );
    this.grid.html.style.transform = 'translateX(-50%)';
    this.grid.html.style.zIndex = 11000;
    this.grid.html.style.width = '37.5%';

    // Add to DOM
    window.HTMLFrame.appendChild(this.html);
  }
}
