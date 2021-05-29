import { SHOW_CLICKABLE } from '../../../src/env.js';
import { Item } from './Item.js';
import { GameElement } from '../../GameElement.js';

export class ItemGrid extends GameElement {
  constructor(itemWidth, itemHeight, position) {
    super();
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.position = position;

    // Create Item Grid
    this.html = document.createElement('div');
    this.html.style.position = 'absolute';
    this.html.style.display = 'grid';
    this.html.style.zIndex = 100;
    this.html.style.gridTemplateColumns = ' 1fr'.repeat(this.itemWidth);
    this.html.style.gridTemplateRows = ' 1fr'.repeat(this.itemHeight);
    this.html.style.gridGap = '2px';
    this.html.style.width = this.itemWidth * 3.5 + '%';
    this.html.style.height = this.itemHeight * 6.3 + '%';
    if (this.position.top) this.html.style.top = this.position.top;
    if (this.position.right) this.html.style.right = this.position.right;
    if (this.position.bottom) this.html.style.bottom = this.position.bottom;
    if (this.position.left) this.html.style.left = this.position.left;

    // Create Item Containers
    for (let i = 0; i <= itemWidth * itemHeight - 1; i++) {
      const itemContainer = document.createElement('div');
      itemContainer.className = `item-container-${i}`;
      itemContainer.style.margin = '0 8% 2px 8%';
      itemContainer.style.borderRadius = '2px';
      itemContainer.style.position = 'relative';
      if (SHOW_CLICKABLE) itemContainer.style.backgroundColor = 'red';
      this.html.appendChild(itemContainer);

      itemContainer.ondragover = (e) => {
        e.preventDefault();
        itemContainer.style.outline = '2px white solid';
      };

      itemContainer.ondragleave = () => {
        itemContainer.style.outline = null;
      };

      itemContainer.ondrop = (e) => {
        e.preventDefault();
        const childItem = itemContainer.querySelector('.item');
        const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
        const draggedItemHTML = document.getElementById(draggedItem.id);

        itemContainer.style.outline = null;

        if (!childItem) {
          const oldItemMapping =
            draggedItemHTML.parentElement.parentElement.itemMapping;
          const newItemMapping = this.html.itemMapping;

          const oldX = draggedItemHTML.itemPositionX;
          const oldY = draggedItemHTML.itemPositionY;
          oldItemMapping[oldY][oldX] = undefined;

          itemContainer.appendChild(draggedItemHTML);

          const newX =
            parseInt(
              itemContainer.classList[0].replace('item-container-', ''),
            ) % this.itemWidth;
          const newY = Math.floor(
            parseInt(
              itemContainer.classList[0].replace('item-container-', ''),
            ) / this.itemWidth,
          );
          newItemMapping[newY][newX] = draggedItemHTML.imagePath;

          draggedItemHTML.itemPositionX = newX;
          draggedItemHTML.itemPositionY = newY;

          this.dispatchEvent(new Event('itemdrop'));
        }
      };
    }

    this.generateItemMapping();

    // Add to DOM
    window.HTMLFrame.appendChild(this.html);
  }

  addItem(newItem, x, y) {
    if (newItem instanceof Item) {
      this.html.itemMapping[y][x] = newItem.imagePath;
      this.html
        .querySelector(
          `.item-container-${this.itemWidth * (y + 1) - (this.itemWidth - x)}`,
        )
        .appendChild(newItem.html);
      newItem.html.itemPositionX = x;
      newItem.html.itemPositionY = y;
    } else {
      throw 'item added is not instance of class Item';
    }
  }

  removeItem(x, y) {
    this.html.itemMapping[y][x] = undefined;
    this.html
      .querySelector(
        `.item-container-${this.itemWidth * (y + 1) - (this.itemWidth - x)}`,
      )
      .firstElementChild.remove();
  }

  hasItem(itemImagePath) {
    const flatArray = [].concat.apply([], this.html.itemMapping);
    if (flatArray.indexOf(itemImagePath) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  isEmpty() {
    const flatArray = [].concat.apply([], this.html.itemMapping);
    console.log(flatArray);
    return flatArray.every((i) => i === undefined);
  }

  generateItemMapping() {
    this.html.itemMapping = Array.from(Array(this.itemHeight), () => {
      return new Array(this.itemWidth).fill(undefined);
    });
  }

  show() {
    this.html.style.display = 'grid';
  }
}
