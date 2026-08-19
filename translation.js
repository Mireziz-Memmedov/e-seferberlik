$(document).ready(function () {

    const defaultLanguage = "az";
    const storageKey = "selectedLanguage";

    // Yadda saxlanmış dili götür
    let currentLanguage =
        localStorage.getItem(storageKey) || defaultLanguage;


    // JSON-dan tərcümələri yüklə
    function loadLanguage(language) {

        $.getJSON(`locales/${language}.json`)

            .done(function (translations) {

                // ==============================
                // DATA-I18N
                // ==============================

                $("[data-i18n]").each(function () {

                    const key = $(this).attr("data-i18n");

                    const text = getTranslation(
                        translations,
                        key
                    );

                    if (text !== undefined) {
                        $(this).text(text);
                    }

                });


                // ==============================
                // PLACEHOLDER
                // ==============================

                $("[data-i18n-placeholder]").each(function () {

                    const key = $(this).attr(
                        "data-i18n-placeholder"
                    );

                    const text = getTranslation(
                        translations,
                        key
                    );

                    if (text !== undefined) {
                        $(this).attr(
                            "placeholder",
                            text
                        );
                    }

                });


                // ==============================
                // ARIA-LABEL
                // ==============================

                $("[data-i18n-aria-label]").each(function () {

                    const key = $(this).attr(
                        "data-i18n-aria-label"
                    );

                    const text = getTranslation(
                        translations,
                        key
                    );

                    if (text !== undefined) {
                        $(this).attr(
                            "aria-label",
                            text
                        );
                    }

                });


                // ==============================
                // HTML TITLE
                // ==============================

                const titleElement =
                    document.querySelector("title[data-i18n]");

                if (titleElement) {

                    const titleKey =
                        titleElement.getAttribute("data-i18n");

                    const title =
                        getTranslation(
                            translations,
                            titleKey
                        );

                    if (title !== undefined) {
                        document.title = title;
                    }

                }


                // ==============================
                // META DESCRIPTION
                // ==============================

                const descriptionElement =
                    document.querySelector(
                        'meta[name="description"][data-i18n]'
                    );

                if (descriptionElement) {

                    const descriptionKey =
                        descriptionElement.getAttribute(
                            "data-i18n"
                        );

                    const description =
                        getTranslation(
                            translations,
                            descriptionKey
                        );

                    if (description !== undefined) {

                        $(descriptionElement).attr(
                            "content",
                            description
                        );

                    }

                }


                // ==============================
                // AKTİV DİL
                // ==============================

                $(".language span")
                    .removeClass("active");

                $(
                    `.language span[data-lang="${language}"]`
                ).addClass("active");


                currentLanguage = language;

            })

            .fail(function () {

                console.error(
                    `Dil faylı yüklənmədi: locales/${language}.json`
                );

            });

    }


    // ==============================
    // JSON-DAN AÇARI TAP
    // ==============================

    function getTranslation(object, key) {

        return key.split(".").reduce(
            function (result, part) {

                if (
                    result &&
                    result[part] !== undefined
                ) {
                    return result[part];
                }

                return undefined;

            },
            object
        );

    }


    // ==============================
    // DİL DÜYMƏLƏRİNƏ DATA-LANG
    // ==============================

    $(".language span").each(function () {

        const language =
            $(this).text().trim().toLowerCase();

        $(this).attr(
            "data-lang",
            language
        );

    });


    // ==============================
    // DİL SEÇİMİ
    // ==============================

    $(".language span").click(function () {

        const language =
            $(this).attr("data-lang");

        if (
            !language ||
            language === currentLanguage
        ) {
            return;
        }

        // Dili yadda saxla
        localStorage.setItem(
            storageKey,
            language
        );

        // Yeni dili yüklə
        loadLanguage(language);

    });


    // ==============================
    // SƏHİFƏ AÇILANDA DİLİ YÜKLƏ
    // ==============================

    loadLanguage(currentLanguage);

});