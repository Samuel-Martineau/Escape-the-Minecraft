import { SlidesManager } from "../lib/slides_manager.js";
import { slideControllers } from "./slides.js";

const slidesManager = new SlidesManager(slideControllers);

document
  .querySelectorAll('img:not([draggable="true"])')
  .forEach((img) => img.setAttribute("draggable", "false"));

// @ts-ignore
window.parent.samuelNextSlide = slidesManager.next.bind(slidesManager);
