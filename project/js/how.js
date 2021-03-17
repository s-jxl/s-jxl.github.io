$(document).ready(function() {
    const changeFunction = () => {
        $("#sanityinput").html(() => {
            return `Les seuls valeurs dans que le visiteur doit mettre sont <b>${$("#usernamebox").val()}</b> et <b>${$("#passbox").val()}</b>`
        })
        $("#codetranslation").html(() => {
            return `Sélecter dans un table de valeur, ou le nom est <b>${$("#usernamebox").val()}</b> et le mot de passe est <b>${$("#passbox").val()}`
        })
        $("#querythinglol").text(() => {
            return `SELECT * FROM table WHERE \`nom\` = "${$("#usernamebox").val()}" AND
            \`motdepasse\` = "${$("#passbox").val()}"`
        })
    }
    $("#usernamebox").on("change", changeFunction);
    $("#passbox").on("change", changeFunction)
});