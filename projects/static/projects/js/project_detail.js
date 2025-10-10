document.addEventListener('DOMContentLoaded', function() {
    console.log("Project detail JS загружен!");

    // Галерея изображений
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');

    // Модальное окно
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-main-image');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const thumbnailElems = document.querySelectorAll('.lightbox-thumbnail');

    let currentIndex = 0;
    let images = [];

    // Собираем все изображения
    if (thumbnails.length > 0) {
        images = Array.from(thumbnails).map(thumb => thumb.dataset.image);
    } else if (mainImage && mainImage.src) {
        images = [mainImage.src];
    }

    if (images.length === 0) {
        console.log("Нет изображений для отображения");
        return;
    }

    console.log(`Найдено ${images.length} изображений`);

    // Функция обновления основного изображения
    function updateMainImage(index) {
        console.log(`Обновляем изображение на индекс ${index}`);
        const imageUrl = images[index];

        console.log(`URL изображения: ${imageUrl}`);

        // Обновляем основное изображение с плавным переходом
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = imageUrl;
            mainImage.style.opacity = '1';
            console.log(`Изображение обновлено на: ${imageUrl}`);
        }, 150);

        // Обновляем активную миниатюру
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Обновляем счетчик
        if (currentImageSpan) {
            currentImageSpan.textContent = index + 1;
        }

        // Обновляем индекс для модального окна
        currentIndex = index;
    }

    // Обработчики кликов на миниатюры
    thumbnails.forEach((thumbnail, index) => {
        console.log(`Добавляем обработчик для миниатюры ${index}`);
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Клик по миниатюре ${index}`);
            currentIndex = index;
            updateMainImage(currentIndex);
        });
    });

    // Навигация клавиатурой
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateMainImage(currentIndex);
        } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
            currentIndex++;
            updateMainImage(currentIndex);
        }
    });

    // Инициализация
    updateMainImage(0);

    // --- Модальное окно ---

    // Функция открытия модального окна
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        lightbox.style.display = 'flex';

        // Обновляем активную миниатюру в модальном окне
        thumbnailElems.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    // Функция закрытия модального окна
    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    // Обработчики для модального окна
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            lightboxImg.src = images[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            thumbnailElems.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === currentIndex);
            });
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            lightboxImg.src = images[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            thumbnailElems.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === currentIndex);
            });
        }
    });

    // Обработчик Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Обработчики для клика на изображение (открытие модального окна)
    mainImage.addEventListener('click', function() {
        openLightbox(currentIndex);
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Обработчики для миниатюр в модальном окне
    thumbnailElems.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            thumbnailElems.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === currentIndex);
            });
        });
    });
});