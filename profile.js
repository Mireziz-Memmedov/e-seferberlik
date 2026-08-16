$(document).ready(function () {

    // ==========================================
    // BÖLMƏLƏR ARASINDA KEÇİD
    // ==========================================

    $(".profile-menu-item").on("click", function () {
        const section = $(this).data("section");
        openSection(section);
    });


    // ==========================================
    // KARTLARDAN BÖLMƏYƏ KEÇİD
    // ==========================================

    $(".dashboard-card").on("click", function () {
        const section = $(this).data("section");
        openSection(section);
    });


    // ==========================================
    // BÖLMƏNİ AÇ
    // ==========================================

    function openSection(section) {

        $(".profile-menu-item").removeClass("active");
        $('.profile-menu-item[data-section="' + section + '"]')
            .addClass("active");
        $(".profile-section").removeClass("active");
        $("#" + section).addClass("active");

        const titles = {
            overview: "Ümumi məlumat",
            personal: "Şəxsi məlumatlar",
            military: "Hərbi məlumatlar",
            documents: "Sənədlər",
            notifications: "Bildirişlər"
        };


        $("#page-title").text(titles[section]);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ==========================================
    // BİLDİRİŞ DÜYMƏSİ
    // ==========================================

    $("#notification-button").on("click", function () {
        openSection("notifications");
    });


    // ==========================================
    // ÇIXIŞ
    // ==========================================

    $("#logout-button").on("click", function () {
        // müvəqqəti olaraq
        window.location.href = "./index.html";
        /*
            Backend və myGov inteqrasiyası hazır deyil.
            Daha sonra burada:
            - myGov sessiyasının bağlanması
            - backend logout endpoint-i
            - istifadəçinin index.html-ə
              yönləndirilməsi əlavə olunacaq.
        */
        console.log("Logout: backend və myGov inteqrasiyası gözlənilir.");
    });


    // ==========================================
    // DİL SEÇİMİ
    // ==========================================

    $(".language span").on("click", function () {
        $(".language span").removeClass("active");
        $(this).addClass("active");
        const language = $(this).text();
        console.log("Seçilmiş dil:", language);
        // Tərcümə sistemi sonra əlavə olunacaq.
    });

    // ==========================================
    // FOOTER
    // ==========================================

    $(".footer-nav-item").on("click", function () {
        const section = $(this).data("section");
        $(".footer-nav-item").removeClass("active");
        $(this).addClass("active");
        openSection(section);
    });

    // ==========================================
    // API-DƏN PROFİL MƏLUMATLARINI AL MYGOV-a Inteqrsiya olandan sonra
    // ==========================================

    function loadProfile() {
        fetch("API_URL")
            .then(response => response.json())
            .then(data => {

                $("#personal .info-item:nth-child(1) strong")
                    .text(data.full_name);

                $("#personal .info-item:nth-child(2) strong")
                    .text(data.birth_date);

                $("#personal .info-item:nth-child(3) strong")
                    .text(data.fin);

                $("#personal .info-item:nth-child(4) strong")
                    .text(data.phone);
            })
            .catch(error => {
                console.error("Profil məlumatları alınarkən xəta:", error);
            });
    }

    // Profil məlumatlarını yüklə
    loadProfile();

});