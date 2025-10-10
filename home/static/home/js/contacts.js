// home/static/home/js/contacts.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    
    // Маска для телефона
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '+7 ' + value.substring(1);
                if (value.length > 7) value = value.substring(0, 7) + '-' + value.substring(7);
                if (value.length > 11) value = value.substring(0, 11) + '-' + value.substring(11);
                if (value.length > 14) value = value.substring(0, 14);
            }
            e.target.value = value;
        });
    }
    
    // Валидация перед отправкой (опционально)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }
    
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        return isValid;
    }
});