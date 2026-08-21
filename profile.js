$(document).ready(function () {

    // ==========================================
    // BÖLMƏLƏR
    // ==========================================

    $("#brand-home").on("click", function (e) {
        e.preventDefault();

        openSection("overview");
    });

    $(".profile-menu-item").on("click", function () {

        const section = $(this).data("section");

        openSection(section);
    });


    // ==========================================
    // DASHBOARD KARTLARI
    // ==========================================

    $(".dashboard-card").on("click", function () {

        const section = $(this).data("section");

        openSection(section);
    });


    // ==========================================
    // BÖLMƏNİ AÇ
    // ==========================================

    function openSection(section) {

        // ==========================================
        // YADDA SAXLA
        // ==========================================

        localStorage.setItem(
            "profileSection",
            section
        );


        // ==========================================
        // MENU ACTIVE
        // ==========================================

        $(".profile-menu-item")
            .removeClass("active");

        $('.profile-menu-item[data-section="' + section + '"]')
            .addClass("active");


        // ==========================================
        // FOOTER ACTIVE
        // ==========================================

        $(".footer-nav-item")
            .removeClass("active");

        $('.footer-nav-item[data-section="' + section + '"]')
            .addClass("active");


        // ==========================================
        // BÜTÜN PROFILE SECTION-LARI BAĞLA
        // ==========================================

        $(".profile-section")
            .removeClass("active");


        // ==========================================
        // SEÇİLƏN SECTION-U AÇ
        // ==========================================

        $("#" + section)
            .addClass("active");


        // ==========================================
        // OVERVIEW
        // ==========================================

        if (section === "overview") {

            // Normal kabineti göstər
            $(".profile-sidebar").show();

            $(".profile-topbar").show();

            // Dashboard-u göstər
            $(".profile-dashboard").removeClass(
                "single-section-mode"
            );


            // Yalnız overview
            $("#overview")
                .addClass("active");


            // Başlıq
            $("#page-title")
                .attr(
                    "data-i18n",
                    "profile.topbar.title"
                );
        }


        // ==========================================
        // DİGƏR BÖLMƏLƏR
        // ==========================================

        else {

            // Sidebar gizlənsin
            $(".profile-sidebar").hide();


            // Topbar gizlənsin
            $(".profile-topbar").hide();


            // Dashboard xüsusi rejimə keçsin
            $(".profile-dashboard").addClass(
                "single-section-mode"
            );


            // Seçilən bölməni göstər
            $("#" + section)
                .addClass("active");


            // Başlıqlar
            const titles = {

                personal:
                    "profile.personal.title",

                military:
                    "profile.military.title",

                payment:
                    "profile.payment.title",

                documents:
                    "profile.documents.title",

                notifications:
                    "profile.notifications.title"
            };


            $("#page-title")
                .attr(
                    "data-i18n",
                    titles[section]
                );
        }


        // ==========================================
        // TRANSLATION
        // ==========================================

        if (
            typeof applyTranslations ===
            "function"
        ) {

            applyTranslations();
        }


        // ==========================================
        // SƏHİFƏNİN YUXARISINA
        // ==========================================

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ==========================================
    // GERİ BUTTON
    // ==========================================

    $(".back-button").on("click", function () {

        openSection("overview");

    });


    // ==========================================
    // BİLDİRİŞ BUTTON
    // ==========================================

    $("#notification-button").on(
        "click",
        function () {

            openSection("notifications");
        }
    );


    // ==========================================
    // LOGOUT
    // ==========================================

    $("#logout-button").on(
        "click",
        function () {

            window.location.href =
                "./index.html";

            console.log(
                "Logout: backend və myGov inteqrasiyası gözlənilir."
            );
        }
    );


    // ==========================================
    // DİL SEÇİMİ
    // ==========================================

    $(".language span").on(
        "click",
        function () {

            $(".language span")
                .removeClass("active");

            $(this)
                .addClass("active");

            const language =
                $(this).data("lang");

            console.log(
                "Seçilmiş dil:",
                language
            );
        }
    );


    // ==========================================
    // FOOTER
    // ==========================================

    $(".footer-nav-item").on(
        "click",
        function () {

            const section =
                $(this).data("section");

            openSection(section);
        }
    );


    // ==========================================
    // PROFİL MƏLUMATLARI
    // ==========================================

    function loadProfile() {

        /*
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
        */
    }


    loadProfile();


    // ==========================================
    // YADDA SAXLANMIŞ BÖLMƏ
    // ==========================================

    const savedSection =
        localStorage.getItem(
            "profileSection"
        ) || "overview";


    openSection(savedSection);


    // ==========================================
    // CHATBOT
    // ==========================================

    const chatbotButton =
        document.querySelector(
            ".chatbot-button"
        );


    if (chatbotButton) {

        let isDragging = false;
        let moved = false;

        let startX = 0;
        let startY = 0;

        let startLeft = 0;
        let startTop = 0;


        // ==========================================
        // POINTER DOWN
        // ==========================================

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


                chatbotButton.style.right =
                    "auto";

                chatbotButton.style.bottom =
                    "auto";


                chatbotButton.style.left =
                    startLeft + "px";

                chatbotButton.style.top =
                    startTop + "px";


                chatbotButton.classList.add(
                    "dragging"
                );


                chatbotButton.setPointerCapture(
                    e.pointerId
                );


                e.preventDefault();
            }
        );


        // ==========================================
        // POINTER MOVE
        // ==========================================

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


        // ==========================================
        // POINTER UP
        // ==========================================

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


        // ==========================================
        // POINTER CANCEL
        // ==========================================

        document.addEventListener(
            "pointercancel",
            function () {

                isDragging = false;

                chatbotButton.classList.remove(
                    "dragging"
                );
            }
        );


        // ==========================================
        // CHATBOT CLICK
        // ==========================================

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