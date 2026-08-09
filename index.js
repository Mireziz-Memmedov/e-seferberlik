$(document).ready(function () {

    $('#mygov-login').click(function (e) {
        e.preventDefault();
        window.location.href = "./mygov.html";
    });

    $('#guest-login').click(function (e) {
        e.preventDefault();
        window.location.href = "./guest.html";
    });

    $('#faq').click(function (e) {
        e.preventDefault();
        window.location.href = "./faq.html";
    });
});