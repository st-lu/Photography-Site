var message = "Hello Hello there and welcome to my personal photography site!"
var message2 = "Enjoy your stay!"
message = message.split(" ");
message2 = message2.split(" ");
var i = 0;
var j = 0;
var msg = setInterval( function (){
    if(i < message.length){
        document.getElementById("hello").innerHTML += message[i] + " ";
        i++;
    }
    else if(j < message2.length){
        document.getElementById("enjoy").innerHTML += message2[j] + " ";
        j++;
    }
}, 333);