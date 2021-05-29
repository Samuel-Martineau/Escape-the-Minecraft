import { GameElement } from '../../lib/GameElement.js';

export class End extends GameElement {
  constructor(endCallback) {
    super();

    // Create End video
    this.html = document.createElement('video');
    this.html.style.position = 'absolute';
    this.html.style.top = '0';
    this.html.style.bottom = '0';
    this.html.style.width = '100%';
    this.html.style.height = '100%';
    this.html.autoplay = 'true';
    this.html.muted = 'true';

    this.html.onended = endCallback;

    // Create End video source
    const videoSource = document.createElement('source');
    videoSource.src = './images/end.mp4';
    videoSource.type = 'video/mp4';
    this.html.appendChild(videoSource);

    // Add to DOM
    window.HTMLFrame.appendChild(this.html);
  }
}
