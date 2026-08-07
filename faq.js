$(document).ready(function () {
    // FAQ cavabını açıb-bağlama
    $('.faq-question').click(function (e) {
        e.preventDefault();

        // Cari button-un arrow-unu tap
        const arrow = $(this).find('.arrow i');

        // Cavabı açıb-bağla
        $(this).next('.faq-answer').slideToggle();

        // Oxu döndər (aşağıya və yuxarıya)
        arrow.toggleClass('fa-chevron-down fa-chevron-up');
    });
});

// FAQ-dan kənara kliklədikdə cavabı bağlama
$(document).click(function (e) {
    if (!$(e.target).closest('.faq-question').length && !$(e.target).closest('.faq-answer').length) {
        $('.faq-answer').slideUp();
        // Bütün oxları normal halına qaytarmaq
        $('.arrow i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
});
