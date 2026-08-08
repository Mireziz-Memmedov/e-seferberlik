$(document).ready(function () {

    $('#faq').click(function (e) {
        e.preventDefault();
        window.location.href = "./faq.html";
    });

    $('#guest-login').click(function (e) {
        e.preventDefault();
        window.location.href = "./guest.html";
    });
});