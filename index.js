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

    // chatbot
    const chatbotButton = document.querySelector(".chatbot-button");

    if (chatbotButton) {

        let isDragging = false;
        let moved = false;

        let startX = 0;
        let startY = 0;

        let startLeft = 0;
        let startTop = 0;

        chatbotButton.addEventListener("pointerdown", function (e) {

            isDragging = true;
            moved = false;

            const rect = chatbotButton.getBoundingClientRect();

            startX = e.clientX;
            startY = e.clientY;

            startLeft = rect.left;
            startTop = rect.top;

            // right / bottom artıq istifadə olunmasın
            chatbotButton.style.right = "auto";
            chatbotButton.style.bottom = "auto";

            chatbotButton.style.left = startLeft + "px";
            chatbotButton.style.top = startTop + "px";

            chatbotButton.classList.add("dragging");

            
            chatbotButton.setPointerCapture(e.pointerId);

            e.preventDefault();
        });


        document.addEventListener("pointermove", function (e) {

            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
                moved = true;
            }

            const buttonWidth = chatbotButton.offsetWidth;
            const buttonHeight = chatbotButton.offsetHeight;

            const gap = 30;

            let newLeft = startLeft + deltaX;
            let newTop = startTop + deltaY;


            // SOL
            newLeft = Math.max(
                gap,
                newLeft
            );


            // SAĞ
            newLeft = Math.min(
                newLeft,
                window.innerWidth - buttonWidth - gap
            );


            // YUXARI
            newTop = Math.max(
                gap,
                newTop
            );


            // AŞAĞI
            newTop = Math.min(
                newTop,
                window.innerHeight - buttonHeight - gap
            );


            chatbotButton.style.left = newLeft + "px";
            chatbotButton.style.top = newTop + "px";

            e.preventDefault();

        }, { passive: false });


        document.addEventListener("pointerup", function (e) {

            if (!isDragging) return;

            isDragging = false;

            chatbotButton.classList.remove("dragging");

            if (chatbotButton.hasPointerCapture(e.pointerId)) {
                chatbotButton.releasePointerCapture(e.pointerId);
            }

        });


        document.addEventListener("pointercancel", function () {

            isDragging = false;

            chatbotButton.classList.remove("dragging");

        });


        // Sürüşdürmə yoxdursa chatbot.html-ə keç
        chatbotButton.addEventListener("click", function (e) {

            if (moved) {
                e.preventDefault();
                moved = false;
            }

        });
    }

});