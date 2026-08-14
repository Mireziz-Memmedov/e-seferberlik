$(document).ready(function () {

    // Back düyməsi
    $('#back-button').click(function (e) {
        e.preventDefault();
        window.history.back();
    });

    const $chatInput = $('#chat-input');
    const $sendButton = $('#send-message');
    const $chatMessages = $('#chat-messages');

    let typingInterval;

    // Mesajı chat-a əlavə edir
    function addUserMessage(message) {

        const html = `
            <div class="message user-message">

                <div class="message-content">
                    <p>${message}</p>
                </div>

            </div>
        `;

        $chatMessages.append(html);

        scrollToBottom();
    }

    // Bot mesajını əlavə edir
    function addBotMessage(message) {

        const html = `
            <div class="message bot-message">

                <div class="message-avatar">
                    <img src="Assets/chatbot.png" alt="">
                </div>

                <div class="message-content">
                    <p>${message}</p>
                </div>

            </div>
        `;

        $chatMessages.append(html);

        scrollToBottom();
    }

    // Bot yazır indikatoru
    function addTypingMessage() {

        const html = `
            <div class="message bot-message typing-message">

                <div class="message-avatar">
                    <img src="Assets/chatbot.png" alt="">
                </div>

                <div class="message-content">
                    <p>Yazır<span class="typing-dots">.</span></p>
                </div>

            </div>
        `;

        $chatMessages.append(html);

        scrollToBottom();

        let dots = 1;

        typingInterval = setInterval(function () {

            dots++;

            if (dots > 3) {
                dots = 1;
            }

            $('.typing-dots').text('.'.repeat(dots));

        }, 500);
    }

    // Chat-ı aşağı sürüşdürür
    function scrollToBottom() {

        $chatMessages.scrollTop(
            $chatMessages[0].scrollHeight
        );

    }

    // Mesaj göndərilir
    function sendMessage() {

        const message = $chatInput.val().trim();

        // Boş mesaj göndərilməsin
        if (!message) {
            return;
        }

        // User mesajını göstər
        addUserMessage(message);

        // Bot yazır göstəricisini göstər
        addTypingMessage();

        // Input-u təmizlə
        $chatInput.val('');

        // Textarea hündürlüyünü sıfırla
        $chatInput.css('height', '');

        // Django backend-ə göndər
        $.ajax({

            url: 'https://e-seferberlik-be.onrender.com/api/chatbot/',
            type: 'POST',

            contentType: 'application/json',

            data: JSON.stringify({
                question: message
            }),

            success: function (response) {

                // Animasiya dayandırılır
                clearInterval(typingInterval);

                // "Yazır..." mesajını sil
                $('.typing-message').remove();

                // Bot cavabını göstər
                addBotMessage(response.answer);

            },

            error: function (xhr) {

                // Animasiya dayandırılır
                clearInterval(typingInterval);

                // "Yazır..." mesajını sil
                $('.typing-message').remove();

                console.log(xhr);

                addBotMessage(
                    'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.'
                );

            }

        });
    }

    // Göndər düyməsi
    $sendButton.on('click', function () {

        sendMessage();

    });

    // Enter ilə göndər
    $chatInput.on('keydown', function (e) {

        if (e.key === 'Enter' && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

        }

    });

});