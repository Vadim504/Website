document.addEventListener('DOMContentLoaded', function() {
    console.log("Project detail JS загружен!");

    // === ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ ===
    const mainImage = document.getElementById('main-image');
    const galleryThumbnails = document.querySelectorAll('.thumbnail'); // только для галереи
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');

    // Модальное окно
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-main-image');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');

    let currentIndex = 0;
    let images = [];

    if (galleryThumbnails.length > 0) {
        images = Array.from(galleryThumbnails).map(thumb => thumb.dataset.image);
    } else if (mainImage && mainImage.src) {
        images = [mainImage.src];
    }

    if (images.length === 0) {
        console.log("Нет изображений для отображения");
        return;
    }

    function updateMainImage(index) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = images[index];
            mainImage.style.opacity = '1';
        }, 150);

        galleryThumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        if (currentImageSpan) {
            currentImageSpan.textContent = index + 1;
        }
        currentIndex = index;
    }

    galleryThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            updateMainImage(currentIndex);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateMainImage(currentIndex);
        } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
            currentIndex++;
            updateMainImage(currentIndex);
        }
    });

    updateMainImage(0);

    // --- Модальное окно ---
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        lightbox.style.display = 'flex';

        lightboxThumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            lightboxImg.src = images[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            lightboxThumbnails.forEach((thumb, i) => thumb.classList.toggle('active', i === currentIndex));
        }
    });
    nextBtn.addEventListener('click', function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            lightboxImg.src = images[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            lightboxThumbnails.forEach((thumb, i) => thumb.classList.toggle('active', i === currentIndex));
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

    mainImage.addEventListener('click', function() {
        openLightbox(currentIndex);
    });

    galleryThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    lightboxThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            lightboxThumbnails.forEach((thumb, i) => thumb.classList.toggle('active', i === currentIndex));
        });
    });

    // === ПЕРЕКЛЮЧЕНИЕ ПЛАНОВ ===
    const planThumbnails = document.querySelectorAll('.plan-thumbnail'); // если вы используете отдельный класс
    const mainPlanImage = document.getElementById('main-plan-image');

    planThumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            mainPlanImage.src = this.dataset.image;

            planThumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    // === ГАЛЕРЕЯ ПЛАНОВ/ФАСАДОВ ===
    const currentPlanSpan = document.getElementById('current-plan');
    const totalPlansSpan = document.getElementById('total-plans');

    let planIndex = 0;
    let planImages = [];

    if (planThumbnails.length > 0) {
        planImages = Array.from(planThumbnails).map(thumb => thumb.dataset.image);
    } else if (mainPlanImage && mainPlanImage.src) {
        planImages = [mainPlanImage.src];
    }

    if (planImages.length === 0) {
        console.log("Нет изображений планов для отображения");
    } else {
        console.log(`Найдено ${planImages.length} изображений планов`);

        function updateMainPlanImage(index) {
            mainPlanImage.style.opacity = '0';
            setTimeout(() => {
                mainPlanImage.src = planImages[index];
                mainPlanImage.style.opacity = '1';
            }, 150);

            planThumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });

            if (currentPlanSpan) {
                currentPlanSpan.textContent = index + 1;
            }
            planIndex = index;
        }

        planThumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function(e) {
                e.preventDefault();
                planIndex = index;
                updateMainPlanImage(planIndex);
            });
        });

        // Навигация клавиатурой
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && planIndex > 0) {
                planIndex--;
                updateMainPlanImage(planIndex);
            } else if (e.key === 'ArrowRight' && planIndex < planImages.length - 1) {
                planIndex++;
                updateMainPlanImage(planIndex);
            }
        });

        // Инициализация
        updateMainPlanImage(0);

        // --- Модальное окно для планов ---
        const lightboxPlan = document.getElementById('lightbox'); // используем тот же lightbox
        const lightboxImgPlan = document.getElementById('lightbox-main-image');
        const lightboxCounterPlan = document.querySelector('.lightbox-counter');
        const closeBtnPlan = document.querySelector('.lightbox-close');
        const prevBtnPlan = document.querySelector('.lightbox-prev');
        const nextBtnPlan = document.querySelector('.lightbox-next');
        const lightboxThumbnailsPlan = document.querySelectorAll('.lightbox-thumbnail');

        function openLightboxPlan(index) {
            planIndex = index;
            lightboxImgPlan.src = planImages[planIndex];
            lightboxCounterPlan.textContent = `${planIndex + 1} / ${planImages.length}`;
            lightboxPlan.style.display = 'flex';

            lightboxThumbnailsPlan.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === planIndex);
            });
        }

        function closeLightboxPlan() {
            lightboxPlan.style.display = 'none';
        }

        lightboxPlan.addEventListener('click', function(e) {
            if (e.target === lightboxPlan) closeLightboxPlan();
        });

        closeBtnPlan.addEventListener('click', closeLightboxPlan);

        prevBtnPlan.addEventListener('click', function() {
            if (planIndex > 0) {
                planIndex--;
                lightboxImgPlan.src = planImages[planIndex];
                lightboxCounterPlan.textContent = `${planIndex + 1} / ${planImages.length}`;
                lightboxThumbnailsPlan.forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === planIndex);
                });
            }
        });

        nextBtnPlan.addEventListener('click', function() {
            if (planIndex < planImages.length - 1) {
                planIndex++;
                lightboxImgPlan.src = planImages[planIndex];
                lightboxCounterPlan.textContent = `${planIndex + 1} / ${planImages.length}`;
                lightboxThumbnailsPlan.forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === planIndex);
                });
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightboxPlan();
        });

        mainPlanImage.addEventListener('click', function() {
            openLightboxPlan(planIndex);
        });

        planThumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                openLightboxPlan(index);
            });
        });

        lightboxThumbnailsPlan.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                planIndex = index;
                lightboxImgPlan.src = planImages[planIndex];
                lightboxCounterPlan.textContent = `${planIndex + 1} / ${planImages.length}`;
                lightboxThumbnailsPlan.forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === planIndex);
                });
            });
        });
    }
    // === КАЛЬКУЛЯТОР СТОИМОСТИ ===
    const techButtons = document.querySelectorAll('.tech-btn');
    const techColumns = document.querySelectorAll('.tech-column');
    const stageChecks = document.querySelectorAll('.stage-check');
    const totalAmount = document.getElementById('total-amount');

    let currentTech = 'frame';

    techButtons.forEach(button => {
        button.addEventListener('click', function () {
            techButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentTech = this.dataset.tech;

            techColumns.forEach(col => {
                col.classList.toggle('active-tech', col.classList.contains(currentTech));
            });

            updateTotal();
        });
    });

    function updateTotal() {
        let total = 0;

        document.querySelectorAll('.stage-row.required').forEach(row => {
            const priceCell = row.querySelector(`.tech-column.${currentTech}`);
            const priceText = priceCell.textContent.trim().replace(/\s/g, '').replace('₽', '');
            const price = parseFloat(priceText) || 0;
            total += price;
        });

        stageChecks.forEach(check => {
            if (check.checked) {
                const price = parseFloat(check.dataset[`price${currentTech.charAt(0).toUpperCase() + currentTech.slice(1)}`]);
                total += price || 0;
            }
        });

        totalAmount.textContent = new Intl.NumberFormat('ru-RU').format(total) + ' ₽';
    }

    stageChecks.forEach(check => {
        check.addEventListener('change', updateTotal);
    });

    techColumns.forEach(col => {
        col.classList.toggle('active-tech', col.classList.contains(currentTech));
    });
    updateTotal();
});