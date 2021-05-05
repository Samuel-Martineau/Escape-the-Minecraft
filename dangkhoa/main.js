import { Frame } from './modules/Frame.js';

const HTMLFrame = document.querySelector('.frame');
const framesList = {
  0: new Frame('0.png'),
  1: new Frame('1.png'),
  2: new Frame('2.png'),
  3: new Frame('3.png'),
};

let currentFrameIndex = 0;

nextFrame(framesList[0].location);

// Object.entries(framesList).forEach((e, i) => {
//   console.log(e[1].location);
// });

function nextFrame(frameUrl) {
  HTMLFrame.style.backgroundImage = `url(frames/${frameUrl})`;
}
