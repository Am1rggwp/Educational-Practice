document.addEventListener("DOMContentLoaded", () => {

    const images = [
        "./style/img/67.jpg",
        "./style/img/bananas.png",
        "./style/img/brdsh.jpg",
        "./style/img/cheremsha.jpg",
        "./style/img/sahur.jpg"
    ];

    let currentIndex = 0;
    let autoSlide;

    const img = document.getElementById("slider-image");
    const counter = document.getElementById("slider-counter");
    const dotsContainer = document.getElementById("slider-dots");

    const prevBtn = document.getElementById("btn-prev");
    const nextBtn = document.getElementById("btn-next");

    // Создание индикаторов
    images.forEach((_, index) => {
        const dot = document.createElement("span");

        dot.classList.add("dot");

        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateSlider() {

        img.style.opacity = 0;

        setTimeout(() => {

            img.src = images[currentIndex];

            counter.textContent =
                `Изображение ${currentIndex + 1} из ${images.length}`;

            dots.forEach(dot => dot.classList.remove("active"));
            dots[currentIndex].classList.add("active");

            img.style.opacity = 1;

        }, 200);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex =
            (currentIndex - 1 + images.length) % images.length;

        updateSlider();
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    document
        .querySelector(".slider-card")
        .addEventListener("mouseenter", stopAutoSlide);

    document
        .querySelector(".slider-card")
        .addEventListener("mouseleave", startAutoSlide);

    updateSlider();
    startAutoSlide();

});