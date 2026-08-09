$(document).ready(function () {

    $('#mygov-login').click(function (e) {
        e.preventDefault();
        window.location.href = "https://mygovid.gov.az/auth";
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