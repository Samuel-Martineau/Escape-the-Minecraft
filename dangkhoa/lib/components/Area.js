import { SHOW_CLICKABLE } from '../../env.js';
import { GuiElement } from '../GuiElement.js';

export class Area extends GuiElement {
  constructor(size, position, zIndex) {
    super();
    this.size = size;
    this.position = position;
    this.zIndex = zIndex ?? 1000;

    // Create Clickable Area
    this.html = document.createElement('div');
    if (SHOW_CLICKABLE) {
      this.html.style.backgroundColor = 'red';
      this.html.style.opacity = '30%';
    }
    this.html.style.position = 'absolute';
    this.html.style.zIndex = zIndex;
    this.html.style.cursor = 'pointer';
    this.html.style.width = this.size.width + this.size.unit;
    this.html.style.height = this.size.height + this.size.unit;
    if (this.position.top) this.html.style.top = this.position.top;
    if (this.position.right) this.html.style.right = this.position.right;
    if (this.position.bottom) this.html.style.bottom = this.position.bottom;
    if (this.position.left) this.html.style.left = this.position.left;
    this.html.addEventListener('click', () => {
      this.dispatchEvent(new Event('click'));
    });
    this.html.addEventListener('mouseover', () => {
      this.dispatchEvent(new Event('mouseover'));
    });

    // Add to DOM
    window.HTMLFrame.appendChild(this.html);
  }
}
