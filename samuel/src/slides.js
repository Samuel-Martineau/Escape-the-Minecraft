import { areArraysEqual, distance } from "./utils.js";

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
    onClick(e, { slideElement, slidesManager }) {
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
          break;
        }
      }

      if (areArraysEqual(this.state.levers, [true, false, true, false]))
        slidesManager.next();
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
  {
    data: {},
    state: {},
    onInit() {},
    onShow({ slidesManager }) {
      this.state.timeout = setTimeout(
        slidesManager.next.bind(slidesManager),
        1000
      );
    },
    onHide() {
      clearTimeout(this.state.timeout);
    },
    onClick() {},
    onMove() {},
  },
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
    state: {},
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

      for (const dropzoneDiv of dropzoneDivs) {
        dropzoneDiv.addEventListener("drop", (e) => {
          e.preventDefault();

          const itemIndex = parseInt(e.dataTransfer.getData("text"));

          dropzoneDiv.style.backgroundImage = `url(${itemImages[itemIndex].src})`;
          console.log(`url(${itemImages[itemIndex].src})`);
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

        const inventory = document.querySelector(
          `#c4-inventory-${Math.floor(Math.random() * 4)}`
        );
        inventory.classList.remove("hidden");

        const itemImages = Array.from(document.querySelectorAll("img.c3-item"));
        for (const itemImage of itemImages)
          itemImage.setAttribute("draggable", "false");

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
    onMove() {},
  },
  // Animation de fin P1
  {
    data: {},
    state: {},
    onInit() {},
    onShow() {},
    onHide() {},
    onClick() {},
    onMove() {},
  },
  // Animation de fin P2
  {
    data: {},
    state: {},
    onInit() {},
    onShow() {},
    onHide() {},
    onClick() {},
    onMove() {},
  },
  // Animation de fin P3
  {
    data: {},
    state: {},
    onInit() {},
    onShow() {},
    onHide() {},
    onClick() {},
    onMove() {},
  },
  // Animation de fin P4
  {
    data: {},
    state: {},
    onInit() {},
    onShow() {},
    onHide() {},
    onClick() {},
    onMove() {},
  },
  // Animation de fin P5
  {
    data: {},
    state: {},
    onInit() {},
    onShow() {},
    onHide() {},
    onClick() {},
    onMove() {},
  },
  // Animation de fin P6
  {
    data: {},
    state: {},
    onInit({ slideElement }) {
      slideElement
        .querySelector("video")
        // @ts-ignore
        .addEventListener("ended", () => window.next());
    },
    onShow({ slideElement }) {
      slideElement.querySelector("video").play();
    },
    onHide({ slideElement }) {
      slideElement.querySelector("video").pause();
    },
    onClick() {},
    onMove() {},
  },
];
