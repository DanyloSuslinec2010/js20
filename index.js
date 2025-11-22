(function () {
  const gallery = document.getElementById("gallery");
  const images = Array.from(gallery ? gallery.querySelectorAll(".image") : []);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const status = document.getElementById("galleryStatus");


  const modal = document.getElementById("modal");
  const fullImage = document.getElementById("fullImage");
  const modalClose = document.getElementById("modalClose");

  let currentIndex = images.length ? 0 : -1;

  function updateStatus() {
    if (!images.length) {
      status.textContent = "Галерея порожня.";
      return;
    }
    status.textContent = `Зображення ${currentIndex + 1} з ${images.length}`;
  }

 
  function setIndex(idx) {
    if (!images.length) return;
    currentIndex = ((idx % images.length) + images.length) % images.length;
   
    images[currentIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    
    images[currentIndex].focus({ preventScroll: true });
    updateStatus();
  }


  function openModalAt(index) {
    if (!images.length) return;
    setIndex(index);
    const img = images[currentIndex];
    fullImage.src = img.src;
    fullImage.alt = img.alt || `Зображення ${currentIndex + 1}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    fullImage.src = "";
   
    if (currentIndex >= 0 && images[currentIndex]) {
      images[currentIndex].focus();
    } else if (gallery) {
      gallery.focus();
    }
  }


  images.forEach((img, idx) => {
    img.addEventListener("click", () => openModalAt(idx));
    img.addEventListener("keydown", (e) => {
      
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModalAt(idx);
      }
    });
  });


  prevBtn &&
    prevBtn.addEventListener("click", () => setIndex(currentIndex - 1));
  nextBtn &&
    nextBtn.addEventListener("click", () => setIndex(currentIndex + 1));

 
  document.addEventListener("keydown", (e) => {
   
    if (modal.classList.contains("open")) return;
    if (!images.length) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setIndex(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setIndex(currentIndex + 1);
    }
  });

  
  modalClose && modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
  
    if (e.target === modal) closeModal();
  });

  modal.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setIndex(currentIndex - 1);
      fullImage.src = images[currentIndex].src;
      fullImage.alt =
        images[currentIndex].alt || `Зображення ${currentIndex + 1}`;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setIndex(currentIndex + 1);
      fullImage.src = images[currentIndex].src;
      fullImage.alt =
        images[currentIndex].alt || `Зображення ${currentIndex + 1}`;
    }
  });

  
  fullImage.addEventListener("click", (e) => {
  
    const rect = fullImage.getBoundingClientRect();
    const middleX = rect.left + rect.width / 2;
    if (e.clientX < middleX) {
      setIndex(currentIndex - 1);
    } else {
      setIndex(currentIndex + 1);
    }
    fullImage.src = images[currentIndex].src;
    fullImage.alt =
      images[currentIndex].alt || `Зображення ${currentIndex + 1}`;
  });

 
  if (images.length === 0) {
    status.textContent = "Галерея порожня.";
   
    prevBtn && (prevBtn.disabled = true);
    nextBtn && (nextBtn.disabled = true);
  } else {
    setIndex(0);
  }
})();


(function () {
  const input = document.getElementById("amountInput");
  const renderBtn = document.getElementById("renderBtn");
  const destroyBtn = document.getElementById("destroyBtn");
  const boxesContainer = document.getElementById("boxes");
  const message = document.getElementById("boxesMessage");

 
  function randomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }


  function createBoxes(amount) {
    
    message.textContent = "";


    if (typeof amount !== "number" || isNaN(amount)) {
      message.textContent = "Введіть число.";
      return;
    }
    if (amount <= 0) {
      message.textContent = "Кількість має бути більше 0.";
      return;
    }
    if (amount > 100) {
      message.textContent = "Максимум 100 елементів. Буде створено 100.";
      amount = 100;
    }

   
    destroyBoxes();

    let size = 30; 

  
    const frag = document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {
      const div = document.createElement("div");
      div.className = "box-item";

      div.style.width = size + "px";
      div.style.height = size + "px";
      div.style.background = randomRgb();
    
      div.title = `Box ${i + 1} — ${size}x${size}`;
    
      frag.appendChild(div);

      size += 10; 
    }

    boxesContainer.appendChild(frag);
    message.textContent = `Створено ${amount} елемент(ів).`;
  }


  function destroyBoxes() {
    if (boxesContainer) {
      boxesContainer.innerHTML = "";
      message.textContent = "Колекція очищена.";
    }
  }


  renderBtn &&
    renderBtn.addEventListener("click", () => {

      const val = parseInt(input.value, 10);
      createBoxes(val);
    });

  destroyBtn &&
    destroyBtn.addEventListener("click", () => {
      destroyBoxes();
    });

  input &&
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        renderBtn.click();
      }
    });


  boxesContainer && (boxesContainer.innerHTML = "");
})();
