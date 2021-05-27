export class Size {
  constructor(width, height, unit) {
    this.width = width;
    this.height = height;
    this.unit = unit ?? '%';
  }
}
