export class Item {
  constructor(parent, imagePath, cursor) {
    this.parent = parent;
    this.imagePath = imagePath;
    this.cursor = cursor ?? 'grab';
    this.html = document.createElement('div');

    this.html.style.padding = '0 1% 10% 1%';
    this.html.style.cursor = this.cursor;
    this.html.draggable = true;
    this.html.ondragover = () => {
      this.html.style.outline = '2px white solid';
    };
    this.html.ondragleave = () => {
      this.html.style.outline = null;
    };

    const imageDiv = document.createElement('div');
    imageDiv.style.width = '100%';
    imageDiv.style.height = '100%';
    imageDiv.style.backgroundImage = `url(images/items/${this.imagePath})`;
    imageDiv.style.backgroundSize = 'contain';
    imageDiv.style.backgroundPosition = 'center';
    imageDiv.style.backgroundRepeat = 'no-repeat';
    imageDiv.style.imageRendering = 'pixelated';
    imageDiv.style.imageRendering = '-moz-crisp-edges';
    imageDiv.style.imageRendering = 'crisp-edges';

    this.html.appendChild(imageDiv);
    this.parent.html.appendChild(this.html);
  }

  destroy() {
    this.html.remove();
  }
}
