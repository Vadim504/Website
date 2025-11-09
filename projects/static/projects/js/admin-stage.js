document.addEventListener('DOMContentLoaded', function() {
    const isRequiredCheckbox = document.getElementById('id_is_required');
    const costPerM2Field = document.getElementById('id_cost_per_m2');

    if (!isRequiredCheckbox || !costPerM2Field) return;

    // Функция для управления видимостью поля
    function toggleCostPerM2Field() {
        if (isRequiredCheckbox.checked) {
            // Если обязательный — скрываем поле
            costPerM2Field.closest('.form-row').style.display = 'none';
        } else {
            // Если необязательный — показываем
            costPerM2Field.closest('.form-row').style.display = 'block';
        }
    }

    // Инициализация при загрузке страницы
    toggleCostPerM2Field();

    // Слушаем изменения чекбокса
    isRequiredCheckbox.addEventListener('change', toggleCostPerM2Field);
});