document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail-item');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const src = this.dataset.src; // путь к изображению, к которому кликнули
            const sectionId = this.dataset.sectionId;

            // Находим главное изображение для этой секции
            const sectionMainImage = document.getElementById(`section-main-image-${sectionId}`);
            if (sectionMainImage) {
                sectionMainImage.style.opacity = '0';
                setTimeout(() => {
                    sectionMainImage.src = src; // Меняем изображение!
                    sectionMainImage.style.opacity = '1';
                }, 150);

                // Подсвечиваем выбранную миниатюру
                const sectionThumbnails = document.querySelectorAll(`.thumbnail-item[data-section-id="${sectionId}"]`);
                sectionThumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Делаем первую миниатюру активной по умолчанию
    const sections = document.querySelectorAll('.section-gallery');
    sections.forEach(section => {
        const firstThumbnail = section.querySelector('.thumbnail-item');
        if (firstThumbnail) {
            firstThumbnail.classList.add('active');
        }
    });
});
