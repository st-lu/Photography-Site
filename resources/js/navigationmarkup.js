window.onload = function () {
    //markup
    var urlcrt = window.location.href.split("/");
    urlcrt = urlcrt[urlcrt.length - 1];
    var navv = document.getElementsByTagName("nav")[0];
    var aa = navv.getElementsByTagName("a");

    for (let i = 0; i < aa.length; i++) {
        urlsrc = aa[i].href.split("/");
        urlsrc = urlsrc[urlsrc.length - 1];
        if (urlsrc == urlcrt) {
            aa[i].classList.add("curent");
        }
    }

    //words in page
    var wordsInPage = document.getElementsByClassName('contents');
    var total_words = 0;
    for (i = 0; i < wordsInPage.length; i++) {
        total_words += wordsInPage[i].innerText.trim().split(' ').length;
    }

    document.getElementById("wordcount").innerHTML += total_words;
}