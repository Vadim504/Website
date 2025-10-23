document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');

    let currentIndex = 0;

    // Функция обновления изображения
    function updateMainImage(index) {
        const thumbnail = thumbnails[index];
        const imageUrl = thumbnail.getAttribute('data-image');
        mainImage.src = imageUrl;
        currentImageSpan.textContent = index + 1;
        currentIndex = index;

        // Обновляем активную миниатюру
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Обработчик клика по миниатюре
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });

    // Клавиши ← → для навигации
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            updateMainImage(prevIndex);
        } else if (e.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % thumbnails.length;
            updateMainImage(nextIndex);
        }
    });

    // Листание колесиком мыши (опционально)
    document.querySelector('.gallery-wrapper').addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {
            const nextIndex = (currentIndex + 1) % thumbnails.length;
            updateMainImage(nextIndex);
        } else {
            const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            updateMainImage(prevIndex);
        }
    });

    console.log(`Найдено ${thumbnails.length} изображений техники.`);
});