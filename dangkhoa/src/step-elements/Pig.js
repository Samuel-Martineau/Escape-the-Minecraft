import { Area } from '../../lib/components/Area.js';
import { Position } from '../../lib/utility/Position.js';
import { Size } from '../../lib/utility/Size.js';
import { GameElement } from '../../lib/GameElement.js';

export class Pig extends GameElement {
  constructor(inventory, pigSatisfiedCallback) {
    super();

    // Create Pig Speech Bubble
    const speech = document.createElement('img');
    speech.src = './images/speech-bubble.svg';
    speech.style.position = 'absolute';
    speech.style.top = '50%';
    speech.style.left = '14%';
    speech.style.transform = 'translateY(-50%)';
    speech.style.height = '25%';
    window.HTMLFrame.appendChild(speech);

    const angryPig = new Audio('sounds/angryPig.mp3');
    angryPig.volume = 0.2;
    angryPig.play();

    // Create Chest Area
    const pig = new Area(
      new Size(8, 26),
      new Position('42%', undefined, undefined, '46%'),
      '',
    );
    pig.html.style.borderRadius = '10px';

    // Add Event Listeners
    pig.html.ondragover = (e) => {
      e.preventDefault();

      pig.html.style.outline = '2px white solid';
      pig.html.style.backgroundColor = 'rgba(255,255,255,0.3)';
    };

    pig.html.ondragleave = () => {
      pig.html.style.outline = null;
      pig.html.style.backgroundColor = null;
    };

    pig.html.ondrop = (e) => {
      e.preventDefault;
      const draggedItem = JSON.parse(e.dataTransfer.getData('text'));
      const draggedItemHTML = document.getElementById(draggedItem.id);

      pig.html.style.outline = null;
      pig.html.style.backgroundColor = null;

      if (draggedItemHTML.imagePath === 'gold.png') {
        const pig = new Audio('sounds/pig.mp3');
        pig.play();

        const draggedItemX =
          parseInt(
            draggedItemHTML.parentElement.classList[0].replace(
              'item-container-',
              '',
            ),
          ) % inventory.grid.itemWidth;
        const draggedItemY = Math.floor(
          parseInt(
            draggedItemHTML.parentElement.classList[0].replace(
              'item-container-',
              '',
            ),
          ) / inventory.grid.itemWidth,
        );

        inventory.grid.removeItem(draggedItemX, draggedItemY);

        console.log(inventory.grid.isEmpty());

        if (inventory.grid.isEmpty()) {
          speech.remove();
          pigSatisfiedCallback();
        }
      }
    };
  }
}
