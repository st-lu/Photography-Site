
var person = prompt("Please enter your name", "");
var oldtitle = document.title;
if (person != null) {
    document.title = "Salut, " + person + "!";
}
var timeout = setTimeout(function () {
    document.title = oldtitle;
}, 2000);
