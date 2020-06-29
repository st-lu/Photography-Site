document.write('<p class="dadjoke"><i>')
var glume = ["Why don't eggs tell jokes? They'd crack each other up.", "I don't trust stairs. They're always up to something.", "What do you call someone with no body and no nose? Nobody knows.", "Did you hear the rumor about butter? Well, I'm not going to spread it!", "Why couldn't the bicycle stand up by itself? It was two tired."]
var randomElement = glume[Math.floor(Math.random() * (glume.length/2))];
document.write(randomElement + "</i></p>");
// document.getElementById("dadjoke").innerHTML = randomElement;