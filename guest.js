$(document).ready(function () {

    $('.minimenu .btn').click(function (e) {
        e.preventDefault();
        $(this).next('.dropdown').slideToggle();
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.minimenu .btn').length && !$(e.target).closest('.dropdown').length) {
            $('.dropdown').slideUp();
        }
    });

    $('.minimenu .dropdown .option a').click(function (e) {
        e.preventDefault();

        var target = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(target).offset().top - $('header').outerHeight()
        }, 500, function () {
            $('.dropdown').slideUp();
        });
    });

    $('.menu .box').click(function (e) {
        e.preventDefault();
        window.location.href = "./guest.html";
    });

});
