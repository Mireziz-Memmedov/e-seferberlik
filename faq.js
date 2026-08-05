$(document).ready(function () {

    // FAQ cavabını açıb-bağlama
    $('.faq-question').click(function (e) {
        e.preventDefault();
        $(this).next('.faq-answer').slideToggle();
    });

    // FAQ-dan kənara kliklədikdə cavabı bağlama
    $(document).click(function (e) {
        if (!$(e.target).closest('.faq-question').length && !$(e.target).closest('.faq-answer').length) {
            $('.faq-answer').slideUp();
        }
    });

});