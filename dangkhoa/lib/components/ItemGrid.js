export class ItemGrid {
  constructor(width, height, position) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.html = document.createElement('div');

    this.html.style.position = 'absolute';
    this.html.style.display = 'grid';
    this.html.style.zIndex = 100;
    this.html.style.gridTemplateColumns = ' 1fr'.repeat(this.width);
    this.html.style.gridTemplateRows = ' 1fr'.repeat(this.height);
    this.html.style.gridGap = '2px';
    this.html.style.width = this.width * 3.5 + '%';
    this.html.style.height = this.height * 6.3 + '%';

    if (this.position.top) this.html.style.top = this.position.top;
    if (this.position.right) this.html.style.right = this.position.right;
    if (this.position.bottom) this.html.style.bottom = this.position.bottom;
    if (this.position.left) this.html.style.left = this.position.left;

    window.HTMLFrame.appendChild(this.html);
  }

  destroy() {
    this.html.remove();
  }
}
