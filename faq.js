$(document).ready(function () {

    $('.faq-question').click(function (e) {
        e.preventDefault();
        $(this).next('.faq-answer').slideToggle();
    });

});