function get_data(criteria) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {

			//soratare + filtrare + calculare
			let store_product = '<div class="row">';
			let products = JSON.parse(xhr.responseText);
			if (window.localStorage.getItem("products")) {
				products = JSON.parse(window.localStorage.getItem("products"));
			}
			// let ok = true;
			// setInterval(function(){
			// 	if(ok){
			// 		document.getElementsByTagName("body")[0].style.background = "red";
			// 		ok = false;
			// 	}
			// 	else{
			// 		document.getElementsByTagName("body")[0].style.background = "black";
			// 		ok = true;
			// 	}
			// }, 2000);


			if (criteria) {
				if (criteria == "asc") {
					products = products.sort(function (a, b) {
						return parseFloat(a.price) - parseFloat(b.price);
					})
					window.localStorage.setItem("products", JSON.stringify(products));
				} else if (criteria == "desc") {
					products = products.sort(function (a, b) {
						return parseFloat(b.price) - parseFloat(a.price);
					})
					window.localStorage.setItem("products", JSON.stringify(products));
				} else if (criteria == "sea") {
					products = products.sort(function (a, b) {
						let oka = (a.tag == "sea");
						let okb = (b.tag == "sea");
						return okb - oka;
					});
					setTimeout(function () {
						for (let i = 3; i < document.getElementsByClassName("column").length; i++) {
							document.getElementsByClassName("column")[i].classList.add("none");
						}
					}, 50)
				}
				else if (criteria == "mountain") {
					products = products.sort(function (a, b) {
						let oka = (a.tag == "mountain");
						let okb = (b.tag == "mountain");
						return okb - oka;
					});
					setTimeout(function () {
						for (let i = 3; i < document.getElementsByClassName("column").length; i++) {
							document.getElementsByClassName("column")[i].classList.add("none");
						}
					}, 50)
				}
				else if (criteria == "calcmin") {

					let minim = 999999;
					let poz = 0;
					for (let i = 0; i < products.length; i++) {
						if (products[i].price < minim) {
							minim = parseFloat(products[i].price);
							poz = i;
						}
					}
					document.getElementById("pretmin").innerHTML = "<p class='pmin'> = " + minim + "</p>";
					//se coloreaza min
					setTimeout(function () {
						document.getElementsByClassName("overlay")[poz].style.background = "red";
					}, 50);
					console.log("s-a calculat min");
				}
				else if (criteria == "calcmax") {
					let maxim = 0;
					let poz = 0;
					for (let i = 0; i < products.length; i++) {
						if (products[i].price > maxim) {
							maxim = parseFloat(products[i].price);
							poz = i;
						}
					}
					document.getElementById("pretmax").innerHTML = "<p class='pmax'> = " + maxim + "</p>";
					//se coloreaza max
					console.log(poz);
					setTimeout(function () {
						document.getElementsByClassName("overlay")[poz].style.background = "red";
					}, 50);
					console.log("s-a calculat max");

				} else if (criteria == "reset") {
					products = JSON.parse(xhr.responseText);
					localStorage.removeItem("products");
				}
			}



			//generare
			column_count = products.length / 4;
			for (let i = 0; i < products.length; i++) {
				const element = products[i];
				store_product += '<div class="container"><div class="column"><img class="image" alt="sale" src="'
					+ element.url + '"><div class="overlay"><div class="text"> <s>' + element.price + '$</s> ' + element.discounted_price + '$</div>'
					+ '</div></div></div>';
				if ((i + 1) % 4 == 0) store_product += '</div><div class="row">';
			}
			store_product += "</div>";
			document.getElementsByTagName('main')[0].innerHTML = store_product;
		}
	};
	xhr.open('GET', 'store_list.json');
	xhr.send();
}

get_data();

