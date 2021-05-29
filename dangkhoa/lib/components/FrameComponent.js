import { GuiElement } from '../GuiElement.js';

export class FrameComponent extends GuiElement {
  constructor(path, zIndex) {
    super();
    this.path = path;
    this.zIndex = zIndex ?? 2000;
    this.html = document.createElement('div');

    this.html.style.position = 'absolute';
    this.html.style.zIndex = 10;
    this.html.style.width = '100vw';
    this.html.style.height = '100vh';
    this.html.style.backgroundImage = `url(frame-components/${this.path})`;
    this.html.style.backgroundSize = 'cover';

    window.HTMLFrame.appendChild(this.html);
  }
}
