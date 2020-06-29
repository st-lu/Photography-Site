

var date = new Date();

var urlcrt = window.location.href.split("/");
urlcrt = urlcrt[urlcrt.length - 1];
tag = "timespent" + urlcrt;
if (!window.localStorage.getItem(tag)) {
        window.localStorage.setItem(tag, 0);
}

var time = setInterval(function () {
    window.localStorage.setItem(tag, parseInt(window.localStorage.getItem(tag)) + 1000);
    var dif = parseInt(window.localStorage.getItem(tag));
    document.getElementById("timespent").innerHTML = Math.floor(dif / 1000) + " seconds spent on this page";

}, 1000);
