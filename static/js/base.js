document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(function(dropdown) {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');

        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            dropdowns.forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                }
            });
            dropdown.classList.toggle('show');
        });
    });

    document.addEventListener('click', function(e) {
        dropdowns.forEach(function(dropdown) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
});