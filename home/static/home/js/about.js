// Инициализация Fancybox для галереи на странице "О нас"
document.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind("[data-fancybox]", {
        infinite: true,
        arrows: true,
        closeBtn: true,
        keyboard: true,
        clickOutside: "close",
        animationEffect: "zoom-in-out",
        preventCaptionOverlap: true,
        caption: function (fancybox, carousel, slide) {
            return slide.caption || "";
        }
    });
});