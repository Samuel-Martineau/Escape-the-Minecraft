import { ItemGrid } from './ItemGrid.js';
import { Item } from './Item.js';
import { Position } from '../utility/Position.js';

export class Inventory {
  constructor() {
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

    const guiGrid = new ItemGrid(
      9,
      1,
      new Position(undefined, undefined, '0.7%', '50%'),
    );
    guiGrid.html.style.transform = 'translateX(-50%)';
    guiGrid.html.style.zIndex = 11000;
    guiGrid.html.style.width = '37.5%';
    for (let i = 0; i < 9; i++) {
      new Item(guiGrid, 'stone.png');
    }

    window.HTMLFrame.appendChild(this.html);
  }
}
