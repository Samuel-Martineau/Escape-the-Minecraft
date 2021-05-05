/**
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
export function distance(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
}

// /**
//  * @param {HTMLDivElement} slideElement
//  */
// export function getSlideDimensions(slideElement) {
//   const children = Array.from(slideElement.children);
//   return {
//     width: Math.max(...children.map((c) => c.clientWidth)),
//     height: Math.max(...children.map((c) => c.clientHeight)),
//   };
// }

/**
 * @param {Array} a
 * @param {Array} b
 */
export function areArraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}
