import { GameElement } from '../GameElement.js';

export class Gui extends GameElement {
  constructor(path, instructions, zIndex) {
    super();
    this.path = path;
    this.instructions = instructions;
    this.zIndex = zIndex ?? 2000;

    // Create Gui
    this.html = document.createElement('div');
    this.html.style.position = 'absolute';
    this.html.style.zIndex = 10;
    this.html.style.width = '100vw';
    this.html.style.height = '100vh';
    this.html.style.backgroundImage = `url(gui/${this.path})`;
    this.html.style.backgroundSize = 'cover';

    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.keyCode === 27) {
        this.dispatchEvent(new Event('close'));
      }
    });

    if (this.instructions) {
      // Create instructions
      const closeInstruction = document.createElement('h3');
      closeInstruction.innerText = this.instructions;
      closeInstruction.style.zIndex = 11000;
      closeInstruction.style.color = 'white';
      closeInstruction.style.position = 'absolute';
      closeInstruction.style.top = '10%';
      closeInstruction.style.left = '50%';
      closeInstruction.style.fontSize = '3vh';
      closeInstruction.style.transform = 'translateX(-50%)';
      closeInstruction.style.textAlign = 'center';
      this.html.appendChild(closeInstruction);
    }

    // Add to DOM
    window.HTMLFrame.appendChild(this.html);
  }
}
