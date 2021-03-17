$(document).ready(function() {
    $("*").fadeIn(1000, () => {
        const visitArray = [{
                end: "types",
                nom: "Les types de pirates"
            },
            {
                end: "pourquoi",
                nom: "Les raisons derrière les actions des pirates"
            },
            {
                end: "comment",
                nom: "Comment les pirates font pour pirater"
            },
            {
                end: "evenements",
                nom: "Des évènements récents"
            },
            {
                end: "seproteger",
                nom: "Comment se protéger"
            },
            {
                end: "logiciels",
                nom: "Des outils pour aider à préserver votre sécurité"
            },
            {
                end: "questionnaire",
                nom: "Un questionnaire et sondage"
            },
        ]

        const windowLocation = window.location.href

        const ending = visitArray.find(element => windowLocation.includes(element.end + ".html"))

        const previous = visitArray[visitArray.indexOf(ending) - 1]
        const next = visitArray[visitArray.indexOf(ending) + 1]

        if (previous) {
            $("#previouspage").text(() => {
                return `Page précédente: ${previous.nom}`
            })
            $("#previouspage").css("font-weight", "Bold");
        } else {
            $("#previouspage").remove()
        }

        if (next) {
            $("#nextpage").text(() => {
                return `Prochaine page: ${next.nom}`
            })
            $("#nextpage").css("font-weight", "Bold");
        } else {
            $("#nextpage").remove()
        }

        $("#nextpage").off().on('click', function() {
            $("*").fadeOut(500)
            setTimeout(() => window.location = `./${next.end}.html`, 500)
        });

        $("#previouspage").off().on('click', function() {
            $("*").fadeOut(500)
            setTimeout(() => window.location = `./${previous.end}.html`, 500)
        });
    })
})