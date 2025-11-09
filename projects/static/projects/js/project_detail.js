<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    console.log("Project detail JS загружен!");

    // === ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ ===
=======
// document.addEventListener("DOMContentLoaded", function() { // Старый способ
document.addEventListener("DOMContentLoaded", () => { // Современный способ
    console.log("✅ Project detail JS загружен");

    // Находим элемент
    const card = document.querySelector('.project-detail-page');
    if (!card) {
        console.error("❌ Элемент .project-detail-page НЕ НАЙДЕН!");
        return;
    }

    // === ХРАНИЛИЩЕ ДАННЫХ (локальные переменные) ===
    let BASE_PRICE_FRAME = 0; // <--- Базовая цена для технологии "каркас" (включает обязательные этапы)
    let AREA = 0;       // <--- Локальная переменная

    // Читаем цену (это базовая цена для технологии "каркас", которая уже включает обязательные этапы)
    const parsedPrice = parseFloat(card.dataset.basePrice);
    if (!isNaN(parsedPrice)) {
        BASE_PRICE_FRAME = parsedPrice;
        console.log("✅ BASE_PRICE_FRAME успешно установлен:", BASE_PRICE_FRAME);
    } else {
        console.error("❌ Ошибка: Не удалось преобразовать card.dataset.basePrice в число.");
        console.error("   Значение data-base-price:", card.dataset.basePrice);
        BASE_PRICE_FRAME = 0;
    }

    // Читаем площадь
    const area = parseFloat(card.dataset.area);
    if (!isNaN(area)) {
        AREA = area;
        console.log("✅ AREA успешно установлена:", AREA);
    } else {
        console.error("❌ Ошибка: Не удалось прочитать площадь (data-area)");
        console.error("   Значение data-area:", card.dataset.area);
        AREA = 0;
    }

    // ==================================================
    // === 1. ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ (ФОТО ПРОЕКТА) ===
    // ==================================================
>>>>>>> eb5d939 (make_changes_2)
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
<<<<<<< HEAD

=======
            
            const currentPlanSpan = document.getElementById('current-plan');
>>>>>>> eb5d939 (make_changes_2)
            if (currentPlanSpan) {
                currentPlanSpan.textContent = index + 1;
            }
            planIndex = index;
        }

<<<<<<< HEAD
        planThumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function(e) {
=======
        planThumbnails.forEach((thumb, index) => {
            if (!thumb) return;
            console.log('DEBUG → plan thumbnail', thumb, index);
            thumb.addEventListener('click', e => {
>>>>>>> eb5d939 (make_changes_2)
                e.preventDefault();
                planIndex = index;
                updateMainPlanImage(planIndex);
            });
        });

<<<<<<< HEAD
        // Навигация клавиатурой
        document.addEventListener('keydown', function(e) {
=======
        // Клавиатурная навигация
        document.addEventListener('keydown', e => {
>>>>>>> eb5d939 (make_changes_2)
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
<<<<<<< HEAD

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
=======
    }

    // ==================================================
    // === 3. КАЛЬКУЛЯТОР СТОИМОСТИ ===
    // ==================================================

    const TECH_COEFFICIENTS = {
        frame: 1.0,
        gasconcrete: 1.3,
        brick: 1.7
    };
>>>>>>> eb5d939 (make_changes_2)

    let currentTech = 'frame';
    const stageChecks = document.querySelectorAll('input.stage-check');
    const totalAmount = document.getElementById('total-amount');

    console.log("🔍 DEBUG: Найдено чекбоксов:", stageChecks.length);
    stageChecks.forEach((check, index) => {
        console.log(`🔍 DEBUG: Чекбокс ${index}:`, {
            id: check.id,
            checked: check.checked,
            costPerM2: check.dataset.costPerM2,
            element: check
        });
    });

<<<<<<< HEAD
    techButtons.forEach(button => {
=======
    // Переключение технологии
    document.querySelectorAll('.tech-btn').forEach(button => {
>>>>>>> eb5d939 (make_changes_2)
        button.addEventListener('click', function () {
            document.querySelectorAll('.tech-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentTech = this.dataset.tech;
<<<<<<< HEAD

            techColumns.forEach(col => {
                col.classList.toggle('active-tech', col.classList.contains(currentTech));
            });

=======
            console.log("🔍 DEBUG: Технология изменена на:", currentTech);
>>>>>>> eb5d939 (make_changes_2)
            updateTotal();
        });
    });

<<<<<<< HEAD
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
=======
    // Расчёт итоговой суммы
    function updateTotal() {
        const techCoeff = TECH_COEFFICIENTS[currentTech] || 1.0;

        // Базовая цена для выбранной технологии (базовая цена для "каркас" умножается на коэффициент технологии)
        // BASE_PRICE_FRAME уже включает обязательные этапы для технологии "каркас"
        const basePriceForTech = BASE_PRICE_FRAME * techCoeff;

        // Опциональные этапы: цена_за_м2 * площадь * коэффициент технологии
        let optionalTotal = 0;
        let checkedCount = 0;
        
        stageChecks.forEach((check, index) => {
            // Проверяем оба варианта чтения data-атрибута (на случай проблем с camelCase)
            const costPerM2Attr = check.getAttribute('data-cost-per-m2');
            const costPerM2Dataset = check.dataset.costPerM2;
            const costPerM2 = parseFloat(costPerM2Attr || costPerM2Dataset || '0');
            
            if (check.checked) {
                if (costPerM2 > 0 && AREA > 0) {
                    const stageCost = costPerM2 * AREA * techCoeff;
                    optionalTotal += stageCost;
                    checkedCount++;
                    console.log(`🔍 DEBUG: Чекбокс ${index} (${check.id}) отмечен:`, {
                        costPerM2Attr: costPerM2Attr,
                        costPerM2Dataset: costPerM2Dataset,
                        costPerM2: costPerM2,
                        area: AREA,
                        techCoeff: techCoeff,
                        stageCost: stageCost,
                        cumulativeTotal: optionalTotal
                    });
                } else {
                    console.warn(`⚠️ WARNING: Чекбокс ${index} (${check.id}) отмечен, но costPerM2=${costPerM2} или AREA=${AREA}`);
                }
            }
        });

        // Итог = базовая цена для выбранной технологии + опциональные этапы
        const total = basePriceForTech + optionalTotal;

        console.log("🔍 DEBUG: Расчет итоговой суммы:", {
            basePriceForTech: basePriceForTech,
            optionalTotal: optionalTotal,
            total: total,
            checkedCount: checkedCount
        });

        if (totalAmount) {
            totalAmount.textContent = new Intl.NumberFormat('ru-RU').format(Math.round(total)) + ' ₽';
        } else {
            console.error("❌ Ошибка: Элемент #total-amount не найден!");
        }
    }

    // Инициализация - устанавливаем стартовую цену с обязательными этапами и технологией "каркас"
    // BASE_PRICE_FRAME уже содержит обязательные этапы с технологией "каркас"
    
    // Обновляем отображение базовой цены ПЕРЕД вызовом updateTotal (для технологии "каркас" коэффициент = 1.0)
    const basePriceElement = document.getElementById('base-price');
    if (basePriceElement && BASE_PRICE_FRAME > 0) {
        basePriceElement.textContent = new Intl.NumberFormat('ru-RU').format(Math.round(BASE_PRICE_FRAME)) + ' ₽';
    }
    
    // Вызываем updateTotal после установки базовой цены
    updateTotal();
    
    console.log("🔍 DEBUG: BASE_PRICE_FRAME =", BASE_PRICE_FRAME);
    console.log("🔍 DEBUG: AREA =", AREA);
    console.log("🔍 DEBUG: currentTech =", currentTech);

    // Пересчёт при изменении чекбоксов
    // Используем делегирование событий для надежности (работает даже если чекбоксы добавлены динамически)
    const costTable = document.querySelector('.cost-table');
    if (costTable) {
        costTable.addEventListener('change', function(e) {
            if (e.target && e.target.classList.contains('stage-check')) {
                const check = e.target;
                const costPerM2Attr = check.getAttribute('data-cost-per-m2');
                const costPerM2 = parseFloat(costPerM2Attr || check.dataset.costPerM2 || '0');
                console.log(`✅ CHANGE: Чекбокс (${check.id}) изменен:`, {
                    checked: check.checked,
                    costPerM2: costPerM2,
                    costPerM2Attr: costPerM2Attr
                });
                updateTotal();
            }
        });
        console.log("✅ Обработчик событий (делегирование) добавлен к контейнеру .cost-table");
    } else {
        console.error("❌ Ошибка: Контейнер .cost-table не найден!");
    }
    
    // Также добавляем прямые обработчики на каждый чекбокс (для дополнительной надежности)
    stageChecks.forEach((check, index) => {
        check.addEventListener('change', function(e) {
            const costPerM2Attr = this.getAttribute('data-cost-per-m2');
            const costPerM2 = parseFloat(costPerM2Attr || this.dataset.costPerM2 || '0');
            console.log(`✅ CHANGE (прямой): Чекбокс ${index} (${this.id}):`, {
                checked: this.checked,
                costPerM2: costPerM2
            });
            // updateTotal() уже вызовется через делегирование, но вызовем еще раз для надежности
            updateTotal();
        });
    });
    
    console.log("✅ Обработчики событий добавлены к", stageChecks.length, "чекбоксам");

    // ==================================================
    // === 4. (Опционально) Доступ к базовой цене извне ===
    // ==================================================
    // Если вам *всё-таки* нужно получить BASE_PRICE извне (например, из другого скрипта),
    // вы можете добавить его как свойство на window, но лучше этого избегать.
    // window.getBasePrice = function() { return BASE_PRICE; }; // <-- Не рекомендуется
    // window.BASE_PRICE = BASE_PRICE; // <-- Не рекомендуется

    // Лучше создать функцию, которая возвращает объект с данными, если это нужно в другом месте.
    // Но в рамках одного файла это не нужно.
});
// Замыкание (function() { ... })(); больше не используется.
>>>>>>> eb5d939 (make_changes_2)
