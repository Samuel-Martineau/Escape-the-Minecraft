import { SlidesManager } from "../lib/slides_manager.js";
import { slideControllers } from "./slides.js";

const slidesManager = new SlidesManager(slideControllers);

// @ts-ignore
window.nextSlide = slidesManager.next.bind(slidesManager);

// @ts-ignore
window.next = window.location.replace.bind(window.location, "/next.html");

document
  .querySelectorAll('img:not([draggable="true"])')
  .forEach((img) => img.setAttribute("draggable", "false"));
