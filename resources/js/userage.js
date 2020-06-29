function calculateage() {
    var age = setInterval(function(){
    var one_day=1000*60*60*24;
    var varsta = document.getElementById("age").value.split('#');
    var newVarsta = new Date(varsta[2], varsta[1] - 1, varsta[0]).getTime();
    var crtDate = new Date().getTime();
    var dif = crtDate - newVarsta;

    var years =  Math.floor(dif/one_day/365)%365;
    var months = Math.floor(( Math.floor(dif/one_day)%365)/30);
    var days = ( Math.floor(dif/one_day)%365)%30;
    var ore = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minute = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    var secunde = Math.floor((dif % (1000 * 60)) / 1000);

    document.getElementById('showage').innerHTML = (years + " years " + months + " months " + days + " days " + ore + " hours " + minute + " minutes " + secunde + " seconds");
    }, 1000)
}