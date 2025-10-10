// JavaScript для страницы списка проектов
document.addEventListener('DOMContentLoaded', function() {
    console.log("Project list JS загружен!");

    // Обработка переключателей этажей
    const floorButtons = document.querySelectorAll('.floor-btn');
    const floorsInput = document.getElementById('floors-input');

    floorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            floorButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');
            // Обновляем скрытое поле
            floorsInput.value = this.dataset.floor;
        });
    });

    // Обработка переключателей комнат
    const roomButtons = document.querySelectorAll('.room-btn');
    const bedroomsInput = document.getElementById('bedrooms-input');

    roomButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            roomButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');
            // Обновляем скрытое поле
            bedroomsInput.value = this.dataset.rooms;
        });
    });

    // Обработка переключателей санузлов
    const bathroomButtons = document.querySelectorAll('.bathroom-btn');
    const bathroomsInput = document.getElementById('bathrooms-input');

    bathroomButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            bathroomButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');
            // Обновляем скрытое поле
            bathroomsInput.value = this.dataset.bathrooms;
        });
    });

    // Обработка слайдеров цены
    const minPriceSlider = document.getElementById('min-price-slider');
    const maxPriceSlider = document.getElementById('max-price-slider');
    const minPriceValue = document.getElementById('min-price-value');
    const maxPriceValue = document.getElementById('max-price-value');
    const priceRangeFill = document.querySelector('.price-range .range-fill');

    function updatePriceValues() {
        const min = parseInt(minPriceSlider.value);
        const max = parseInt(maxPriceSlider.value);
        
        // Форматируем числа с пробелами
        minPriceValue.textContent = min.toLocaleString('ru-RU');
        maxPriceValue.textContent = max.toLocaleString('ru-RU');
        
        // Убеждаемся, что минимальное значение не больше максимального
        if (min >= max) {
            minPriceSlider.value = max - 100000;
            minPriceValue.textContent = (max - 100000).toLocaleString('ru-RU');
        }
        
        // Обновляем заливку между тумблерами
        updatePriceRangeFill();
    }

    function updatePriceRangeFill() {
        if (priceRangeFill) {
            const min = parseInt(minPriceSlider.value);
            const max = parseInt(maxPriceSlider.value);
            const minMax = parseInt(minPriceSlider.max);
            
            const leftPercent = (min / minMax) * 100;
            const rightPercent = (max / minMax) * 100;
            
            priceRangeFill.style.left = leftPercent + '%';
            priceRangeFill.style.width = (rightPercent - leftPercent) + '%';
        }
    }

    if (minPriceSlider && maxPriceSlider) {
        minPriceSlider.addEventListener('input', updatePriceValues);
        maxPriceSlider.addEventListener('input', updatePriceValues);
        updatePriceValues(); // Инициализация
    }

    // Обработка слайдеров площади
    const minAreaSlider = document.getElementById('min-area-slider');
    const maxAreaSlider = document.getElementById('max-area-slider');
    const minAreaValue = document.getElementById('min-area-value');
    const maxAreaValue = document.getElementById('max-area-value');
    const areaRangeFill = document.querySelector('.area-range .range-fill');

    function updateAreaValues() {
        const min = parseInt(minAreaSlider.value);
        const max = parseInt(maxAreaSlider.value);
        
        minAreaValue.textContent = min;
        maxAreaValue.textContent = max;
        
        // Убеждаемся, что минимальное значение не больше максимального
        if (min >= max) {
            minAreaSlider.value = max - 1;
            minAreaValue.textContent = max - 1;
        }
        
        // Обновляем заливку между тумблерами
        updateAreaRangeFill();
    }

    function updateAreaRangeFill() {
        if (areaRangeFill) {
            const min = parseInt(minAreaSlider.value);
            const max = parseInt(maxAreaSlider.value);
            const minMax = parseInt(minAreaSlider.max);
            
            const leftPercent = (min / minMax) * 100;
            const rightPercent = (max / minMax) * 100;
            
            areaRangeFill.style.left = leftPercent + '%';
            areaRangeFill.style.width = (rightPercent - leftPercent) + '%';
        }
    }

    if (minAreaSlider && maxAreaSlider) {
        minAreaSlider.addEventListener('input', updateAreaValues);
        maxAreaSlider.addEventListener('input', updateAreaValues);
        updateAreaValues(); // Инициализация
    }
});

// Функция сброса всех фильтров
function resetFilters() {
    // Сбрасываем все кнопки
    document.querySelectorAll('.floor-btn, .room-btn, .bathroom-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Сбрасываем скрытые поля
    document.getElementById('floors-input').value = '';
    document.getElementById('bedrooms-input').value = '';
    document.getElementById('bathrooms-input').value = '';
    
    // Сбрасываем слайдеры цены
    const minPriceSlider = document.getElementById('min-price-slider');
    const maxPriceSlider = document.getElementById('max-price-slider');
    if (minPriceSlider && maxPriceSlider) {
        minPriceSlider.value = 0;
        maxPriceSlider.value = 100000000;
        document.getElementById('min-price-value').textContent = '0';
        document.getElementById('max-price-value').textContent = '100,000,000';
    }
    
    // Сбрасываем слайдеры площади
    const minAreaSlider = document.getElementById('min-area-slider');
    const maxAreaSlider = document.getElementById('max-area-slider');
    if (minAreaSlider && maxAreaSlider) {
        minAreaSlider.value = 1;
        maxAreaSlider.value = 500;
        document.getElementById('min-area-value').textContent = '1';
        document.getElementById('max-area-value').textContent = '500';
    }
    
    // Перенаправляем на страницу без параметров
    window.location.href = window.location.pathname;
}
