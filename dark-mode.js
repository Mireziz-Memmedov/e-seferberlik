$(document).ready(function () {

    // ==========================================
    // DARK MODE
    // ==========================================

    // Səhifə açılan kimi yadda saxlanılan rejimi yoxla
    if (localStorage.getItem("darkMode") === "enabled") {

        $("body").addClass("dark-mode");

        $("#dark-mode-button i")
            .removeClass("fa-moon")
            .addClass("fa-sun");
    }


    // Dark mode düyməsi
    $("#dark-mode-button").on("click", function () {

        $("body").toggleClass("dark-mode");

        if ($("body").hasClass("dark-mode")) {

            localStorage.setItem("darkMode", "enabled");

            $(this).find("i")
                .removeClass("fa-moon")
                .addClass("fa-sun");

        } else {

            localStorage.setItem("darkMode", "disabled");

            $(this).find("i")
                .removeClass("fa-sun")
                .addClass("fa-moon");
        }

    });

});

