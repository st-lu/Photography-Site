var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var app = express();
var formidable = require('formidable');
var session = require('express-session');

var fs = require('fs');//file system
var crypto = require('crypto')

// pentru folosirea ejs-ului 
app.set('view engine', 'ejs');

console.log(__dirname);//calea (radacina) aplicatiei Node
app.use(express.static(path.join(__dirname, "resources")));
/* caile vor fi realtive la folderul static proiect/resurse/css/stil.css in href o sa scrieti /css/stil.css*/

app.use(session(
    {
        secret: "cheie_sesiune",
        resave: true,
        saveUninitialized: false
    }
)); // crreaza campul session in request: req.session (req.session e acelasi obiect pentru toate cererile)


// -------------------- cereri de tip post----------------
//<form method="post" action="/inreg"
app.post('/inreg', function (req, res) {
    var dateForm = new formidable.IncomingForm()
    dateForm.parse(req, function (err, fields, files) {
        //<input type="file" name="fis1" /> ----> files.fis1
        //fields e pentru restul de inputuri <input name="ceva" ---> fields.ceva
        var textJson = fs.readFileSync("useri.json", "utf8"); //cale relativa la fisierul index.js
        var obJson = JSON.parse(textJson);
        var parolaCriptata;
        var algoritmCriptare = crypto.createCipher("aes-128-cbc", "cheie_criptare")
        parolaCriptata = algoritmCriptare.update(fields.parola, "utf-8", "hex");
        parolaCriptata += algoritmCriptare.final("hex");

        var userNou = {
            id: obJson.lastId,
            username: fields.username,
            nume: fields.nume,
            email: fields.email,
            parola: parolaCriptata,
            dataInreg: new Date(),
            rol: "user",
        }
        obJson.useri.push(userNou);
        obJson.lastId += 1;
        //JSON.stringify opusul lui JSON.parse --->  din obiect imi face string
        var jsonNou = JSON.stringify(obJson);
        fs.writeFileSync("useri.json", jsonNou);
        res.redirect("/store");
    })
})



app.post('/login', function (req, res) {
    var dateForm = new formidable.IncomingForm()
    dateForm.parse(req, function (err, fields, files) {
        //<input type="file" name="fis1" /> ----> files.fis1
        //fields e pentru restul de inputuri <input name="ceva" ---> fields.ceva
        var textJson = fs.readFileSync("useri.json", "utf8"); //cale relativa la fisierul index.js
        var obJson = JSON.parse(textJson);
        var parolaCriptata;
        var algoritmCriptare = crypto.createCipher("aes-128-cbc", "cheie_criptare")
        parolaCriptata = algoritmCriptare.update(fields.parola, "utf-8", "hex");
        parolaCriptata += algoritmCriptare.final("hex");
        var user = obJson.useri.find(function (elem) {
            return elem.username == fields.username && elem.parola == parolaCriptata
        })
        if (user) {
            console.log("Exista utilizatorul")
            req.session.utilizator = user;
            req.session.rol = user.rol;
            res.render("html/store", { username: user.username, rol: user.rol })
        }

    })
})

app.post("/change")

// pentru adaugarea in arrayul cu informatii de catre admin
app.post('/adaugareProdus', function (req, res) {
    var dateForm = new formidable.IncomingForm()
    dateForm.parse(req, function (err, fields, files) {
        var textJson = fs.readFileSync("resources/store_list.json", "utf8"); //cale relativa la fisierul index.js
        var obJson = JSON.parse(textJson); // transforma un string in json

        // structura obiect 
        var produs = {
            url: fields.url,
            price: fields.price,
            discounted_price: fields.discounted_price,
            tag: fields.tag
        }

        // adaugare in json datele noului user
        obJson.push(produs);

        // incrementare lastID

        //JSON.stringify opusul lui JSON.parse --->  din obiect imi face string
        var jsonNou = JSON.stringify(obJson);

        fs.writeFileSync("resources/store_list.json", jsonNou);
        res.redirect("/administrator");
    })
})


// -------------------- cereri de tip get----------------
// cand se face o cerere get catre pagina de index 
app.get('/', function (req, res) {
    /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */

    // cond? val_if : val_else
    var usrn = req.session ? (req.session.utilizator ? req.session.utilizator.username : null) : null;
    res.render('html/index', { username: usrn });
});
//

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/store")
});

app.get('/bla', function (req, res) {
    /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    console.log("ceva!");
    res.setHeader("Content-Type", "text/html");
    res.write("<html><body><h1>Cucubau!</h1><p>Bine, multumesc.</p></body></html>");
    res.end();
});

app.get('/*', function (req, res) {
    var usrn = req.session ? (req.session.utilizator ? req.session.utilizator.username : null) : null;

    if (req.url == "/register" && (usrn != null)) {
        res.redirect("/store");
        return 0;
    }

    if (req.url == "/administrator" && (req.session.rol != "admin" || usrn == null)) {
        res.redirect("/store");
        return 0;
    }

    res.render('html/' + req.url, {
        username: usrn,
        rol: req.session.rol
    }, function (err, rezultatRender) {
        if (err) {
            if (err.message.includes("Failed to lookup view"))
                res.status(404).render("html/error", { username: usrn });
            else {
                throw err;
            }

        }
        else res.send(rezultatRender)

    });
});


// tratarea erorii 404 se pune la final (aici o sa fie un caz general, pe care intra orice cerere). Daca s-a gasit mai sus, se opreste acolo; nu mai ajunge aici.*/
/*
app.use(function(req,res){
	res.status(404).render("html/404");//din views/html/404.ejs
}); 
*/

app.listen(8081);
console.log('Aplicatia se va deschide pe portul 8081.');



