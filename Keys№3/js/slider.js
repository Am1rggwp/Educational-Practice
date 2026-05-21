document.addEventListener("DOMContentLoaded", function () {

    const images = [
        "./style/img/67.jpg",
        "./style/img/bananas.png",
        "./style/img/brdsh.jpg",
        "./style/img/cheremsha.jpg",
        "./style/img/sahur.jpg"
    ];

    // Переменная для отслеживания текущего индекса картинки
    let currentIndex = 0;

    // Находим элементы интерфейса в DOM-дереве
    const imgElement = document.getElementById("slider-image");
    const counterElement = document.getElementById("slider-counter");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    // Функция обновления состояния слайдера
    function updateSlider() {
        imgElement.style.opacity = 0.3;

        setTimeout(() => {
            imgElement.src = images[currentIndex];
            counterElement.textContent = `Изображение ${currentIndex + 1} из ${images.length}`;

            imgElement.style.opacity = 1;
        }, 150);
    }

    // Обработчик события для кнопки "Вперед"
    btnNext.addEventListener("click", function () {
        if (currentIndex === images.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    });

    // Обработчик события для кнопки "Назад"
    btnPrev.addEventListener("click", function () {
        if (currentIndex === 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex--;
        }
        updateSlider();
    });

    // Первичный запуск слайдера при загрузке страницы
    if (images.length > 0) {
        updateSlider();
    } else {
        counterElement.textContent = "Нет изображений";
    }
});