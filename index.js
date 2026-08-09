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

    //chatbot
    const chatbotButton = $('.chatbot-button');

    if (chatbotButton.length) {

        let isDragging = false;
        let startX;
        let startY;
        let startLeft;
        let startTop;
        let moved = false;

        chatbotButton.on('pointerdown', function (e) {

            isDragging = true;
            moved = false;

            const rect = this.getBoundingClientRect();

            startX = e.clientX;
            startY = e.clientY;

            startLeft = rect.left;
            startTop = rect.top;

            $(this).css({
                right: 'auto',
                bottom: 'auto',
                left: startLeft + 'px',
                top: startTop + 'px',
                cursor: 'grabbing'
            });

            this.setPointerCapture(e.pointerId);

            e.preventDefault();
        });


        chatbotButton.on('pointermove', function (e) {

            if (!isDragging) return;

            const x = e.clientX - startX;
            const y = e.clientY - startY;

            if (Math.abs(x) > 5 || Math.abs(y) > 5) {
                moved = true;
            }

            const buttonWidth = chatbotButton.outerWidth();
            const buttonHeight = chatbotButton.outerHeight();

            const gap = 30;

            let newLeft = startLeft + x;
            let newTop = startTop + y;

            // Sol sərhəd
            if (newLeft < gap) {
                newLeft = gap;
            }

            // Sağ sərhəd
            if (newLeft + buttonWidth > $(window).width() - gap) {
                newLeft = $(window).width() - buttonWidth - gap;
            }

            // Yuxarı sərhəd
            if (newTop < gap) {
                newTop = gap;
            }

            // Aşağı sərhəd
            if (newTop + buttonHeight > $(window).height() - gap) {
                newTop = $(window).height() - buttonHeight - gap;
            }

            chatbotButton.css({
                left: newLeft + 'px',
                top: newTop + 'px'
            });

            e.preventDefault();
        });


        chatbotButton.on('pointerup pointercancel', function (e) {

            if (!isDragging) return;

            isDragging = false;

            $(this).css('cursor', 'grab');

            try {
                this.releasePointerCapture(e.pointerId);
            } catch (error) {
                // heç nə etmirik
            }
        });


        // Sürüşdürməyibsə chatbot.html-ə keç
        chatbotButton.on('click', function (e) {

            if (moved) {
                e.preventDefault();
                moved = false;
            }

        });

    }
});