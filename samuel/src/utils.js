/**
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
export function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {boolean}
 */
export function areArraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/**
 *
 * @param {Array<T>} arr
 * @returns T
 * @template T
 */
export function arrayLast(arr) {
  return arr[arr.length - 1];
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * @param {number} delay
 */
export function wait(delay) {
  return new Promise((r) => setTimeout(r, delay));
}

/**
 * @param {string} soundName
 */
function playSoundFactory(soundName) {
  /**
   * @type {HTMLAudioElement}
   */
  const sound = document.querySelector(`#${soundName}-sound`);
  return () => {
    sound.currentTime = 0;
    sound.play();
  };
}

export const playBadSound = playSoundFactory("bad");
export const playSuccessSound = playSoundFactory("success");
export const playActionSound = playSoundFactory("action");
export const playNote1Sound = playSoundFactory("note-1");
export const playNote2Sound = playSoundFactory("note-2");
export const playNote3Sound = playSoundFactory("note-3");
export const playNote4Sound = playSoundFactory("note-4");
