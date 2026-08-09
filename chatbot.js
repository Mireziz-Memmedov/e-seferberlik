$(document).ready(function () {

    // Back düyməsi
    $('#back-button').click(function (e) {
        e.preventDefault();
        window.history.back();
    });

    const $chatInput = $('#chat-input');
    const $sendButton = $('#send-message');
    const $chatMessages = $('#chat-messages');

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

        // Input-u təmizlə
        $chatInput.val('');

        // Textarea hündürlüyünü sıfırla
        $chatInput.css('height', '');

        // Hələlik test cavabı
        setTimeout(function () {

            addBotMessage(
                'Sualınızı qəbul etdim. Hazırda cavab sistemi üzərində işləyirik. 🤖'
            );

        }, 500);
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