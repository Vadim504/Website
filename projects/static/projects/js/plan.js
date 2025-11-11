// static/projects/js/plan.js
document.addEventListener('DOMContentLoaded', () => {
    // Галерея планов
    const mainPlanImage = document.getElementById('main-plan-image');
    const planThumbnails = document.querySelectorAll('.plan-thumbnails-container .thumbnail');
    const currentPlanEl = document.getElementById('current-plan');
    const totalPlansEl = document.getElementById('total-plans');

    if (!mainPlanImage || !planThumbnails.length) return;

    planThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Убираем активный класс со всех миниатюр
            planThumbnails.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс к текущей
            thumb.classList.add('active');
            // Меняем основное изображение
            mainPlanImage.src = thumb.dataset.image;
            // Обновляем счётчик
            currentPlanEl.textContent = index + 1;
        });
    });
});