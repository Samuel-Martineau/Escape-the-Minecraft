export class SlidesManager {
  /**
   *
   * @param {SlideController[]} slideControllers
   */
  constructor(slideControllers) {
    /**
     * @type {HTMLDivElement[]}
     */
    const slideElements = Array.from(
      document.querySelectorAll("#slides .slide")
    );

    console.assert(
      slideControllers.length === slideElements.length,
      "Slide elements and slide controllers mismatch"
    );

    console.assert(
      slideControllers.length > 0,
      "A minimum of 1 slide is required"
    );

    /**
     * @type {Array<{controller: SlideController, element: HTMLDivElement}>}
     */
    this.slides = slideControllers.map((controller, i) => {
      const element = slideElements[i];

      element.removeAttribute("data-shown");

      controller.onInit({ slideElement: element, slidesManager: this });

      element.addEventListener(
        "click",
        (e) =>
          this.current.controller === controller &&
          controller.onClick(e, {
            slideElement: element,
            slidesManager: this,
          })
      );

      element.addEventListener(
        "mousemove",
        (e) =>
          this.current.controller === controller &&
          controller.onMove(e, { slideElement: element, slidesManager: this })
      );

      return {
        controller,
        element,
      };
    });

    /**
     * @type {number}
     */
    this.currentIndex = 0;

    this.__updateCurrentSlide();
  }

  __updateCurrentSlide() {
    const previous = this.current;

    this.current = this.slides[this.currentIndex];
    this.current.element.setAttribute("data-shown", "true");
    this.current.controller.onShow({
      slideElement: this.current.element,
      slidesManager: this,
    });

    previous?.element.removeAttribute("data-shown");
    previous?.controller.onHide({
      slideElement: previous.element,
      slidesManager: this,
    });
  }

  next() {
    if (++this.currentIndex < this.slides.length) this.__updateCurrentSlide();
  }
}
