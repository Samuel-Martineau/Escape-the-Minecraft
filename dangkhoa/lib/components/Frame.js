export class Frame {
  constructor(path) {
    this.path = path;
  }

  show() {
    window.HTMLFrame.style.backgroundImage = `url(frames/${this.path})`;
  }
}
