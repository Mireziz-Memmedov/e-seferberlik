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

        chatbotButton.on('mousedown', function (e) {

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

            e.preventDefault();
        });


        $(document).on('mousemove', function (e) {

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

            // Sol
            if (newLeft < gap) {
                newLeft = gap;
            }

            // Sağ
            if (newLeft + buttonWidth > $(window).width() - gap) {
                newLeft = $(window).width() - buttonWidth - gap;
            }

            // Yuxarı
            if (newTop < gap) {
                newTop = gap;
            }

            // Aşağı
            if (newTop + buttonHeight > $(window).height() - gap) {
                newTop = $(window).height() - buttonHeight - gap;
            }

            chatbotButton.css({
                left: newLeft + 'px',
                top: newTop + 'px'
            });
        });

        $(document).on('mouseup', function () {

            if (!isDragging) return;

            isDragging = false;

            chatbotButton.css('cursor', 'grab');
        });


        // Sürüşdürməyibsə chatbot səhifəsinə keç
        chatbotButton.on('click', function (e) {

            if (moved) {
                e.preventDefault();
                moved = false;
            }

        });

    }
});