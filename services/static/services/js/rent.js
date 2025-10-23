document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.getElementById('cards-container');
    const noResultsMessage = document.getElementById('no-results-message');
    
    // Элементы фильтров
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const capacityFilter = document.getElementById('capacity-filter');
    const capacityValue = document.getElementById('capacity-value');
    
    // Кнопки
    const applyBtn = document.getElementById('apply-filters');
    const resetBtn = document.getElementById('reset-filters');

    // Обновляем отображение значений слайдеров (но не фильтруем!)
    priceFilter.addEventListener('input', () => {
        priceValue.textContent = `${priceFilter.value} ₽`;
    });

    capacityFilter.addEventListener('input', () => {
        capacityValue.textContent = capacityFilter.value;
    });

    // Функция фильтрации
    function applyFilters() {
        const selectedType = typeFilter.value;  // может быть '', '1', '2' и т.д.
        const maxPrice = parseFloat(priceFilter.value);
        const minCapacity = parseFloat(capacityFilter.value);

        let visibleCount = 0;
        const cards = cardsContainer.querySelectorAll('.equipment-card');

        cards.forEach(card => {
            const type = card.dataset.type;
            const price = parseFloat(card.dataset.price);
            const capacity = parseFloat(card.dataset.capacity);

            // Фильтр по типу: если selectedType пустой — показываем всё
            const matchesType = selectedType === '' || type === selectedType;

            // Фильтр по цене
            const matchesPrice = price <= maxPrice;

            // Фильтр по мощности
            const matchesCapacity = capacity >= minCapacity;

            if (matchesType && matchesPrice && matchesCapacity) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Показываем/скрываем "Нет результатов"
        if (visibleCount === 0) {
            noResultsMessage.style.display = 'block';
            cardsContainer.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'none';
            cardsContainer.style.display = 'grid';
        }
    }
    // Обработчики кнопок
    applyBtn.addEventListener('click', applyFilters);

    resetBtn.addEventListener('click', () => {
        typeFilter.value = '';
        priceFilter.value = '5000';
        capacityFilter.value = '200';
        priceValue.textContent = '5000 ₽';
        capacityValue.textContent = '200';
        applyFilters(); // Сразу применяем сброс
    });

    // Первичная загрузка — показываем все карточки
    applyFilters();
});