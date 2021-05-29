import { GuiElement } from '../../GuiElement.js';

export class Item extends GuiElement {
  constructor(imagePath, cursor) {
    super();
    this.imagePath = imagePath;
    this.cursor = cursor ?? 'grab';

    this.draggedItemId = 'item-dragged';

    // HTML Element
    this.html = document.createElement('div');
    this.html.className = 'item';
    this.html.imagePath = this.imagePath;
    this.html.style.height = '100%';
    this.html.style.width = '100%';
    this.html.style.position = 'relative';
    this.html.draggable = true;

    this.html.ondragstart = (e) => {
      setTimeout(() => {
        imageDiv.style.display = 'none';
      }, 0);
      e.dataTransfer.setData(
        'text',
        JSON.stringify({
          imagePath: this.html.imagePath,
          id: this.draggedItemId,
        }),
      );
      this.html.id = this.draggedItemId;
      this.html.style.cursor = 'grabbing';
    };

    this.html.ondragend = (e) => {
      this.html.removeAttribute('id');
      this.html.style.cursor = this.cursor;
      this.html.style.outline = null;
      imageDiv.style.display = null;
    };

    // ImageDiv
    const imageDiv = document.createElement('div');
    imageDiv.className = 'item-image';
    imageDiv.style.width = '100%';
    imageDiv.style.height = '100%';
    imageDiv.style.cursor = this.cursor;
    imageDiv.style.backgroundImage = `url(images/items/${this.imagePath})`;
    imageDiv.style.backgroundSize = 'contain';
    imageDiv.style.backgroundPosition = 'center';
    imageDiv.style.backgroundRepeat = 'no-repeat';
    imageDiv.style.imageRendering = 'pixelated';
    imageDiv.style.imageRendering = '-moz-crisp-edges';
    imageDiv.style.imageRendering = 'crisp-edges';

    this.html.addEventListener('click', () => {
      this.dispatchEvent(new Event('click'));
    });

    // Add to DOM
    this.html.appendChild(imageDiv);
  }
}
