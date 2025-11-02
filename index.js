




const images = document.querySelectorAll(".image");
const fullContainer = document.getElementById("fullImageContainer");
const fullImage = document.getElementById("fullImage");
let currentIndex = 0;


images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    fullImage.src = img.src;
    fullContainer.style.display = "block";
  });
});

fullContainer.addEventListener("click", () => {
  fullContainer.style.display = "none";
});

document.addEventListener("keydown", (e) => {
  if (fullContainer.style.display === "block") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      fullImage.src = images[currentIndex].src;
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      fullImage.src = images[currentIndex].src;
    } else if (e.key === "Escape") {
      fullContainer.style.display = "none";
    }
  }
});

















const input = document.querySelector("#controls input");
const createBtn = document.querySelector('[data-action="render"]');
const destroyBtn = document.querySelector('[data-action="destroy"]');
const boxesContainer = document.getElementById("boxes");

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, 
              ${Math.floor(Math.random() * 256)}, 
              ${Math.floor(Math.random() * 256)})`;
}

function createBoxes(amount) {
  destroyBoxes();
  const boxes = [];
  let size = 30;

  for (let i = 0; i < amount; i++) {
    const box = document.createElement("div");
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.backgroundColor = getRandomColor();
    box.style.margin = "5px";
    box.style.display = "inline-block";
    boxes.push(box);
    size += 10;
  }

  boxesContainer.append(...boxes);
}

function destroyBoxes() {
  boxesContainer.innerHTML = "";
}

createBtn.addEventListener("click", () => {
  const amount = Number(input.value);
  if (amount > 0 && amount <= 100) {
    createBoxes(amount);
  }
});

destroyBtn.addEventListener("click", destroyBoxes); 
