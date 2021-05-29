/**
 * @typedef {Object} SlideControllerEventContext
 * @property {HTMLDivElement} slideElement
 * @property {import('./slides_manager').SlidesManager} slidesManager
 */

/**
 * @typedef {Object} SlideController
 * @property {string} [clue]
 * @property {Object} data Static data for the slide
 * @property {Object} state Current state of the slide
 * @property {(context: SlideControllerEventContext) => void} onInit Called when the slide is initialized (only called once)
 * @property {(context: SlideControllerEventContext) => void} onShow Called when the slide is shown
 * @property {(context: SlideControllerEventContext) => void} onHide Called when the slide is hidden
 * @property {(event: MouseEvent, context: SlideControllerEventContext) => void} onClick Listener for when an element of the slide is clicked
 * @property {(event: MouseEvent, context: SlideControllerEventContext) => void} onMove Listener for when the mouse is moved inside the slide
 */
