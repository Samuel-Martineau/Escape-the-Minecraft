import {
  areArraysEqual,
  distance,
  randomRange,
  wait,
  playBadSound,
  playSuccessSound,
  playActionSound,
  playNote1Sound,
  playNote2Sound,
  playNote3Sound,
  playNote4Sound,
  arrayLast,
} from "./utils.js";

/**
 * @param {number} delay
 * @returns {SlideController}
 */
const automaticSlideController = (delay) => ({
  data: {},
  state: {},
  onInit() {},
  onShow({ slidesManager }) {
    this.state.timeout = setTimeout(
      slidesManager.next.bind(slidesManager),
      delay
    );
  },
  onHide() {
    clearTimeout(this.state.timeout);
  },
  onClick() {},
  onMove() {},
});

/**
 * @returns {SlideController}
 */
const videoSlideController = () => ({
  data: {},
  state: {},
  onInit({ slideElement, slidesManager }) {
    slideElement
      .querySelector("video")
      // @ts-ignore
      .addEventListener("ended", slidesManager.next.bind(slidesManager));
  },
  onShow({ slideElement }) {
    const video = slideElement.querySelector("video");
    video.currentTime = 0;
    video.play();
  },
  onHide({ slideElement }) {
    slideElement.querySelector("video").pause();
  },
  onClick() {},
  onMove() {},
});

/**
 * @type {SlideController[]}
 */
export const slideControllers = [
  // Défi 1 -> Éteindre le feu avec le seau
  {
    data: {
      bucket: {
        x: 0.483,
        y: 0.617,
        width: 0.034,
      },
      fireDropzone: {
        x: 0.46,
        y: 0.29,
        width: 0.08,
        height: 0.15,
      },
    },
    state: {},
    onInit({ slideElement, slidesManager }) {
      /**
       * @type {HTMLImageElement}
       */
      const bucketImage = document.querySelector("#c1-bucket");
      /**
       * @type {HTMLDivElement}
       */
      const fireDropzone = document.querySelector("#c1-fire-dropzone");

      this.state.resizeElements = () => {
        const { clientWidth: width, clientHeight: height } = slideElement;

        bucketImage.style.left = this.data.bucket.x * width + "px";
        bucketImage.style.top = this.data.bucket.y * height + "px";
        bucketImage.style.width = this.data.bucket.width * width + "px";

        fireDropzone.style.left = this.data.fireDropzone.x * width + "px";
        fireDropzone.style.top = this.data.fireDropzone.y * height + "px";
        fireDropzone.style.width = this.data.fireDropzone.width * width + "px";
        fireDropzone.style.height =
          this.data.fireDropzone.height * height + "px";
      };

      window.addEventListener("resize", this.state.resizeElements);

      bucketImage.addEventListener("dragstart", () => {
        setTimeout(() => (bucketImage.style.visibility = "hidden"), 0);
        bucketImage.style.cursor = "grabbing";
      });
      bucketImage.addEventListener("dragend", () => {
        bucketImage.style.visibility = "visible";
        bucketImage.style.cursor = "grab";
      });

      fireDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        fireDropzone.style.backgroundColor = "";
        playSuccessSound();
        slidesManager.next();
      });
      fireDropzone.addEventListener(
        "dragleave",
        () => (fireDropzone.style.backgroundColor = "")
      );
      fireDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        fireDropzone.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
      });
    },
    onShow() {
      this.state.resizeElements();
    },
    onHide() {},
    onClick() {},
    onMove() {},
  },
  // Défi 2 -> Trouver la bonne combinaison de leviers en utilisant les lumières
  {
    data: {
      clickRadius: 0.035,
      levers: [
        {
          x: 0.28,
          y: 0.52,
        },
        {
          x: 0.42,
          y: 0.52,
        },
        {
          x: 0.57,
          y: 0.52,
        },
        {
          x: 0.72,
          y: 0.52,
        },
      ],
    },
    state: {
      levers: [false, false, false, false],
    },
    onInit() {},
    onShow() {},
    onHide() {},
    async onClick(e, { slideElement, slidesManager }) {
      // Checking if any lever

      const { offsetX: mouseX, offsetY: mouseY } = e;
      const { clientWidth: width, clientHeight: height } = slideElement;
      const { levers, clickRadius } = this.data;

      for (const [index, lever] of levers.entries()) {
        const x = lever.x * width;
        const y = lever.y * height;

        if (distance(x, y, mouseX, mouseY) <= clickRadius * width) {
          /**
           * @type HTMLImageElement
           */
          const leverImage = document.querySelector(`#c2-lever-${index}`);
          leverImage.classList.toggle("hidden");
          this.state.levers[index] = !this.state.levers[index];
          playActionSound();

          break;
        }
      }

      if (areArraysEqual(this.state.levers, [true, false, true, false])) {
        await wait(500);
        playSuccessSound();
        slidesManager.next();
      }
    },
    onMove(e, { slideElement }) {
      const { offsetX: mouseX, offsetY: mouseY } = e;
      const { clientWidth: width, clientHeight: height } = slideElement;

      slideElement.style.cursor = "auto";
      for (const [i, l] of this.data.levers.entries()) {
        const x = l.x * width;
        const y = l.y * height;

        if (distance(x, y, mouseX, mouseY) <= this.data.clickRadius * width)
          slideElement.style.cursor = "pointer";
      }
    },
  },
  // Transition
  automaticSlideController(500),
  // Défi 3 -> Se souvenir de la combinaison affichée
  {
    data: {
      clickRadius: 0.035,
      time: 1000,
      chest: {
        x: 0.5,
        y: 0.4,
      },
      items: [
        {
          x: 0.25,
          y: 0.7,
          width: 0.035,
        },
        {
          x: 0.37,
          y: 0.7,
          width: 0.035,
        },
        {
          x: 0.48,
          y: 0.7,
          width: 0.035,
        },
        {
          x: 0.6,
          y: 0.7,
          width: 0.035,
        },
        {
          x: 0.71,
          y: 0.7,
          width: 0.035,
        },
      ],
      dropzones: [
        {
          x: 0.25,
          y: 0.34,
          width: 0.049,
          height: 0.049,
        },
        {
          x: 0.4,
          y: 0.34,
          width: 0.049,
          height: 0.049,
        },
        {
          x: 0.547,
          y: 0.34,
          width: 0.049,
          height: 0.049,
        },
        {
          x: 0.695,
          y: 0.34,
          width: 0.049,
          height: 0.049,
        },
      ],
    },
    state: {
      guess: [],
      /**
       * @param {HTMLDivElement} slideElement
       * @param {number} mouseX
       * @param {number} mouseY
       */
      updateCursor(slideElement, mouseX, mouseY) {
        const { clientWidth: width, clientHeight: height } = slideElement;
        slideElement.style.cursor = "auto";

        if (
          distance(
            mouseX,
            mouseY,
            this.data.chest.x * width,
            this.data.chest.y * height
          ) <=
          this.data.clickRadius * width
        )
          slideElement.style.cursor = "pointer";
        else slideElement.style.cursor = "";
      },
    },
    onInit({ slideElement, slidesManager }) {
      /**
       * @type {HTMLImageElement[]}
       */
      const itemImages = Array.from(document.querySelectorAll("img.c3-item"));
      /**
       * @type {HTMLDivElement[]}
       */
      const dropzoneDivs = Array.from(
        document.querySelectorAll("div.c3-dropzone")
      );

      this.state.resizeElements = () => {
        const { clientWidth: width, clientHeight: height } = slideElement;

        for (const [index, itemImage] of itemImages.entries()) {
          const item = this.data.items[index];

          itemImage.style.left = item.x * width + "px";
          itemImage.style.top = item.y * height + "px";
          itemImage.style.width = item.width * width + "px";
        }

        for (const [index, dropzoneDiv] of dropzoneDivs.entries()) {
          const dropzone = this.data.dropzones[index];

          dropzoneDiv.style.left = dropzone.x * width + "px";
          dropzoneDiv.style.top = dropzone.y * height + "px";
          dropzoneDiv.style.width = dropzone.width * width + "px";
          dropzoneDiv.style.height = dropzone.height * width + "px";
        }
      };

      window.addEventListener("resize", this.state.resizeElements);

      for (const [index, itemImage] of itemImages.entries()) {
        itemImage.addEventListener("dragstart", (e) => {
          itemImage.classList.remove("transparent");
          setTimeout(() => itemImage.classList.add("transparent"), 0);
          itemImage.style.cursor = "grabbing";
          e.dataTransfer.setData("text/plain", index.toString());
        });

        itemImage.addEventListener(
          "mouseover",
          () => (itemImage.style.cursor = "grab")
        );
      }

      for (const [index, dropzoneDiv] of dropzoneDivs.entries()) {
        dropzoneDiv.addEventListener("drop", async (e) => {
          e.preventDefault();

          const itemIndex = parseInt(e.dataTransfer.getData("text"));

          dropzoneDiv.style.backgroundImage = `url(${itemImages[itemIndex].src})`;

          playActionSound();

          this.state.guess[index] = itemIndex;
          if (this.state.guess.join("") === this.state.answer) {
            await wait(500);
            playSuccessSound();
            slidesManager.next();
          }
        });

        dropzoneDiv.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
      }
    },
    onShow() {
      this.state.resizeElements();
    },
    onHide() {},
    onClick(e, { slideElement }) {
      const { offsetX: mouseX, offsetY: mouseY } = e;
      const { clientWidth: width, clientHeight: height } = slideElement;
      const { clickRadius, chest, items } = this.data;

      if (
        distance(chest.x * width, chest.y * height, mouseX, mouseY) <=
        clickRadius * width
      ) {
        if (this.state.isInventoryOpen) return;
        playActionSound();
        slideElement.style.cursor = "";

        const inventory = document.querySelector(
          `#c4-inventory-${Math.floor(Math.random() * 4)}`
        );
        inventory.classList.remove("hidden");

        /**
         * @type {HTMLImageElement[]}
         */
        const itemImages = Array.from(document.querySelectorAll("img.c3-item"));
        /**
         * @type {HTMLDivElement[]}
         */
        const dropzoneDivs = Array.from(
          document.querySelectorAll("div.c3-dropzone")
        );

        for (const itemImage of itemImages)
          itemImage.setAttribute("draggable", "false");

        for (const dropzoneDiv of dropzoneDivs)
          dropzoneDiv.style.backgroundImage = "";

        this.state.guess = [];

        this.state.isInventoryOpen = true;
        this.state.answer = inventory.getAttribute("data-answer");

        this.state.timeout = setTimeout(() => {
          inventory.classList.add("hidden");
          for (const itemImage of itemImages)
            itemImage.setAttribute("draggable", "true");
          this.state.isInventoryOpen = false;
        }, this.data.time);
      }
    },
    onMove(e, { slideElement }) {
      const { offsetX: mouseX, offsetY: mouseY } = e;
      this.state.lastMousePos = { mouseX, mouseY };
      if (this.state.isInventoryOpen) return;
      this.state.updateCursor.call(this, slideElement, mouseX, mouseY);
    },
  },
  // Défi 4 -> Simon
  {
    data: {
      clickRadius: 0.05,
      maps: [
        {
          x: 0.28,
          y: 0.52,
          sound: playNote1Sound,
        },
        {
          x: 0.43,
          y: 0.52,
          sound: playNote2Sound,
        },
        {
          x: 0.57,
          y: 0.52,
          sound: playNote3Sound,
        },
        {
          x: 0.73,
          y: 0.52,
          sound: playNote4Sound,
        },
      ],
    },
    state: {
      sequence: [],
      guess: [],
      /**
       * @param {HTMLDivElement} slideElement
       * @param {number} mouseX
       * @param {number} mouseY
       */
      updateCursor() {
        if (!this.state.lastMousePos) return;
        const slideElement = this.state.slideElement;
        const { mouseX, mouseY } = this.state.lastMousePos;
        const { clientWidth: width, clientHeight: height } = slideElement;
        slideElement.style.cursor = "auto";
        if (this.state.phase !== "watch")
          for (const [i, m] of this.data.maps.entries()) {
            const x = m.x * width;
            const y = m.y * height;

            if (
              distance(x, y, mouseX, mouseY) <=
              this.data.clickRadius * width
            ) {
              const map = document.querySelector(`#c4-map-${i}`);
              if (map.classList.contains("hidden"))
                slideElement.style.cursor = "pointer";
            }
          }
      },
      async watchPhase() {
        this.state.phase = "watch";
        await wait(250);
        this.state.sequence.push(randomRange(0, 3));
        this.state.guess = [];
        for (const mapIndex of this.state.sequence) {
          const map = document.querySelector(`#c4-map-${mapIndex}`);
          map.classList.remove("hidden");
          this.data.maps[mapIndex].sound();
          await wait(500);
          map.classList.add("hidden");
          await wait(250);
        }
        this.state.guess = [];
        this.state.phase = "play";
      },
    },
    onInit({ slideElement }) {
      this.state.slideElement = slideElement;
    },
    async onShow({ slideElement }) {
      this.state.updateCursorInterval = setInterval(
        this.state.updateCursor.bind(this),
        10
      );
      await wait(500);
      this.state.watchPhase.call(this);
    },
    onHide() {
      clearInterval(this.state.updateCursorInterval);
    },
    onClick(e, { slideElement, slidesManager }) {
      if (this.state.phase !== "play") return;

      const { offsetX: mouseX, offsetY: mouseY } = e;
      const { clientWidth: width, clientHeight: height } = slideElement;

      slideElement.style.cursor = "auto";
      for (const [i, m] of this.data.maps.entries()) {
        const x = m.x * width;
        const y = m.y * height;

        if (distance(x, y, mouseX, mouseY) <= this.data.clickRadius * width) {
          const map = document.querySelector(`#c4-map-${i}`);
          if (map.classList.contains("hidden")) {
            map.classList.remove("hidden");
            this.state.guess.push(i);

            const isGameDone = this.state.sequence.length >= 5;
            const isGuessDone =
              this.state.sequence.length === this.state.guess.length;
            const isCorrectGuess =
              this.state.sequence[this.state.guess.length - 1] ===
              arrayLast(this.state.guess);

            if (isGuessDone) this.state.phase = "watch";

            if (isCorrectGuess) m.sound();
            else playBadSound();

            setTimeout(async () => {
              map.classList.add("hidden");

              await wait(750);

              if (!isCorrectGuess) {
                this.state.sequence = [];
                this.state.watchPhase.call(this);
              } else if (isGuessDone) {
                if (isGameDone) {
                  playSuccessSound();
                  slidesManager.next();
                } else this.state.watchPhase.call(this);
              }
            }, 500);
          }
        }
      }
    },
    onMove(e, { slideElement }) {
      const { offsetX: mouseX, offsetY: mouseY } = e;
      this.state.lastMousePos = { mouseX, mouseY };
    },
  },
  // Animation de fin P1
  automaticSlideController(500),
  // Animation de fin P2
  automaticSlideController(500),
  // Animation de fin P3
  automaticSlideController(500),
  // Animation de fin P4
  automaticSlideController(500),
  // Animation de fin P5
  automaticSlideController(500),
  // Animation de fin P6
  videoSlideController(),
  // Passage à la prochaine personne
  {
    data: {},
    state: {},
    onInit() {},
    onShow() {
      // @ts-ignore
      window.parent.nextPerson();
    },
    onHide() {},
    onClick() {},
    onMove() {},
  },
];
