// static/js/base.js

document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(function(dropdown) {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');

        // Обработчик клика по кнопке "Услуги"
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем переход по ссылке

            // Закрываем все другие открытые меню
            dropdowns.forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                }
            });

            // Переключаем текущее меню
            dropdown.classList.toggle('show');
        });
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        dropdowns.forEach(function(dropdown) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
});