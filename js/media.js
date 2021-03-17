$(document).ready(() => {
    let chosenLanguage = "fr"
    let chosenSupport = "article"

    const translation = {
        en: {
            open: "\"",
            close: "\"",
            on: "Online",
            consult: "page consulted on",
            anonyme: "[ANONYMOUS]",
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ]
        },
        fr: {
            open: "«",
            close: "»",
            on: "En Ligne",
            consult: "page consultée le",
            anonyme: "[ANONYME]",
            months: [
                "janvier",
                "février",
                "mars",
                "avril",
                "mai",
                "juin",
                "juillet",
                "août",
                "septembre",
                "octobre",
                "novembre",
                "décembre",
            ]
        }
    }

    function getStringBetween(input, start, end) {
        var index = input.indexOf(start);

        if (index != -1) {
            index += start.length;
            var endIndex = input.indexOf(end, index + 1);

            if (endIndex != -1)
                return input.substr(index, endIndex - index);
        }
        return false;
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    $('#sitetoggle').on('change', function() {
        chosenSupport = "site"
        $("#datepublication").prop("disabled", true)
    });

    $('#articletoggle').on('change', function() {
        chosenSupport = "article"
        $("#datepublication").prop("disabled", false)
    });

    $('#frtoggle').on('change', function() {
        chosenLanguage = "fr"
    });

    $('#entoggle').on('change', function() {
        chosenLanguage = "en"
    });

    $("#generatemedia").off().on('click', () => {
        const author = $("#auteur").val()
        const lien = $("#lien").val()
        const publishData = $("#date").val()

        const correctTranslation = translation[chosenLanguage]

        if (validURL(lien)) {
            const date = new Date();
            const timestamp = `${date.getDate()} ${correctTranslation.months[date.getUTCMonth()]} ${date.getUTCFullYear()}`

            switch (chosenSupport) {
                case "article":
                    let format = [
                        `${author || correctTranslation.anonyme}. `,
                        correctTranslation.open,
                        `-(-titre-)-`,
                        correctTranslation.close,
                        `, <i>${lien}</i>, ${publishData || "s.d"}, [`,
                        correctTranslation.on,
                        `], ${lien.split("/")[2]} (`,
                        `${correctTranslation.consult} `,
                        timestamp,
                        ")",
                    ].join("")
                    fetch('https://cors-anywhere.herokuapp.com/' + lien)
                        .then(response => response.text())
                        .then((res) => {
                            console.log(res)
                            format = format.replace(`-(-titre-)-`, getStringBetween(res, "<title>", "</title>"))
                            $("#output").html(format)
                        })
                    break
                case "site":
                    let format2 = [
                        `${author || correctTranslation.anonyme}. `,
                        "<i>-(-titre-)-</i>, [",
                        correctTranslation.on,
                        `], ${lien.split("/")[2]} (`,
                        `${correctTranslation.consult} `,
                        timestamp,
                        ")",
                    ].join("")

                    fetch('https://cors-anywhere.herokuapp.com/' + lien)
                        .then(response => response.text())
                        .then((res) => {
                            format2 = format2.replace(`-(-titre-)-`, getStringBetween(res, "<title>", "</title>"))
                            $("#output").html(format2)
                        })
                    break
            }
        } else {
            $("#output").html("site invalide")
        }
    })
})