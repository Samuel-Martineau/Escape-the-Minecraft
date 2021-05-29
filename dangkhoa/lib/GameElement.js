export class GameElement extends EventTarget {
  constructor() {
    super();
  }

  hide() {
    if (this.html) {
      this.html.style.display = 'none';
    }
  }

  show() {
    if (this.html) {
      this.html.style.display = null;
    }
  }

  destroy() {
    if (this.html) {
      this.html.remove();
    }
  }
}
