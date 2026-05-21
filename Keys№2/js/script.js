// Матрицы цифр 5x3 (1 - горит, 0 - выключен)
const DIGITS = {
    '0': [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    '1': [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    '2': [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    '3': [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    '4': [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    '5': [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    '6': [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    '7': [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    '8': [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    '9': [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    '.': [0, 0, 0, 0, 1] // Матрица 5x1 для точки
};

const WEEKDAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function processData() {
    const d = parseInt(document.getElementById('day').value);
    const m = parseInt(document.getElementById('month').value) - 1;
    const y = parseInt(document.getElementById('year').value);

    const errorDiv = document.getElementById('error');

    // Валидация даты
    const dateObj = new Date(y, m, d);
    if (isNaN(dateObj.getTime()) || dateObj.getDate() !== d || dateObj.getMonth() !== m || y < 1000) {
        errorDiv.style.display = 'block';
        return;
    }
    errorDiv.style.display = 'none';

    // 1. День недели
    document.getElementById('res-weekday').innerText = WEEKDAYS[dateObj.getDay()];

    // 2. Високосный год
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    document.getElementById('res-leap').innerText = isLeap ? "Да" : "Нет";

    // 3. Расчет возраста
    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDiff = today.getMonth() - dateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObj.getDate())) {
        age--;
    }
    document.getElementById('res-age').innerText = age;

    // 4. Отрисовка электронного табло
    renderBoard(d, m + 1, y);
}

function renderBoard(day, month, year) {
    const board = document.getElementById('led-board');
    board.innerHTML = '';

    // Форматирование строк: "ДД.ММ.ГГГГ"
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(month).padStart(2, '0');
    const yearStr = String(year);
    const dateStr = `${dayStr}.${monthStr}.${yearStr}`;

    // Шаг по каждому символу строки даты
    for (let char of dateStr) {
        const digitContainer = document.createElement('div');
        digitContainer.classList.add('digit');
        if (char === '.') digitContainer.classList.add('dot');

        const matrix = DIGITS[char];

        // Генерирация пикселей для текущего символа
        matrix.forEach(bit => {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            if (bit === 1) pixel.classList.add('on'); // Включения икселя
            digitContainer.appendChild(pixel);
        });

        board.appendChild(digitContainer);
    }
}