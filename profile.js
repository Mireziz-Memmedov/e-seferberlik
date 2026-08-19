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

        localStorage.setItem("profileSection", section);

        $(".profile-menu-item").removeClass("active");
        $('.profile-menu-item[data-section="' + section + '"]')
            .addClass("active");

        $(".footer-nav-item").removeClass("active");
        $('.footer-nav-item[data-section="' + section + '"]')
            .addClass("active");

        $(".profile-section").removeClass("active");
        $("#" + section).addClass("active");

        const titles = {
            overview: "profile.topbar.title",
            personal: "profile.personal.title",
            military: "profile.military.title",
            documents: "profile.documents.title",
            notifications: "profile.notifications.title"
        };

        $("#page-title").attr("data-i18n", titles[section]);

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

        // Tərcümə sistemi translation.js tərəfindən idarə olunur.
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
    // API-DƏN PROFİL MƏLUMATLARINI AL
    // MYGOV-a inteqrasiya olandan sonra
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

                console.error(
                    "Profil məlumatları alınarkən xəta:",
                    error
                );

            });
    }


    // Profil məlumatlarını yüklə
    loadProfile();


    // ==========================================
    // YADDA SAXLANMIŞ BÖLMƏNİ AÇ
    // ==========================================

    const savedSection =
        localStorage.getItem("profileSection") || "overview";

    openSection(savedSection);


    // ==========================================
    // CHATBOT
    // ==========================================

    const chatbotButton =
        document.querySelector(".chatbot-button");

    if (chatbotButton) {

        let isDragging = false;
        let moved = false;

        let startX = 0;
        let startY = 0;

        let startLeft = 0;
        let startTop = 0;


        chatbotButton.addEventListener(
            "pointerdown",
            function (e) {

                isDragging = true;
                moved = false;

                const rect =
                    chatbotButton.getBoundingClientRect();

                startX = e.clientX;
                startY = e.clientY;

                startLeft = rect.left;
                startTop = rect.top;

                chatbotButton.style.right = "auto";
                chatbotButton.style.bottom = "auto";

                chatbotButton.style.left =
                    startLeft + "px";

                chatbotButton.style.top =
                    startTop + "px";

                chatbotButton.classList.add("dragging");

                chatbotButton.setPointerCapture(
                    e.pointerId
                );

                e.preventDefault();
            }
        );


        document.addEventListener(
            "pointermove",
            function (e) {

                if (!isDragging) return;

                const deltaX =
                    e.clientX - startX;

                const deltaY =
                    e.clientY - startY;

                if (
                    Math.abs(deltaX) > 3 ||
                    Math.abs(deltaY) > 3
                ) {
                    moved = true;
                }

                const buttonWidth =
                    chatbotButton.offsetWidth;

                const buttonHeight =
                    chatbotButton.offsetHeight;

                const gap = 30;

                let newLeft =
                    startLeft + deltaX;

                let newTop =
                    startTop + deltaY;


                // SOL

                newLeft = Math.max(
                    gap,
                    newLeft
                );


                // SAĞ

                newLeft = Math.min(
                    newLeft,
                    window.innerWidth -
                    buttonWidth -
                    gap
                );


                // YUXARI

                newTop = Math.max(
                    gap,
                    newTop
                );


                // AŞAĞI

                newTop = Math.min(
                    newTop,
                    window.innerHeight -
                    buttonHeight -
                    gap
                );


                chatbotButton.style.left =
                    newLeft + "px";

                chatbotButton.style.top =
                    newTop + "px";

                e.preventDefault();

            },
            {
                passive: false
            }
        );


        document.addEventListener(
            "pointerup",
            function (e) {

                if (!isDragging) return;

                isDragging = false;

                chatbotButton.classList.remove(
                    "dragging"
                );

                if (
                    chatbotButton.hasPointerCapture(
                        e.pointerId
                    )
                ) {

                    chatbotButton.releasePointerCapture(
                        e.pointerId
                    );

                }

            }
        );


        document.addEventListener(
            "pointercancel",
            function () {

                isDragging = false;

                chatbotButton.classList.remove(
                    "dragging"
                );

            }
        );


        // Sürüşdürmə yoxdursa chatbot.html-ə keç

        chatbotButton.addEventListener(
            "click",
            function (e) {

                if (moved) {

                    e.preventDefault();

                    moved = false;
                }

            }
        );

    }

});