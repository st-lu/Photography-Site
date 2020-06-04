var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4){
		//document.getElementById('result').innerHTML = xhr.responseText;
		let store_product='<div class="row">';
		let products = JSON.parse(xhr.responseText);
		column_count = products.length/4;
		for (let i = 0; i < products.length; i++) {
			const element = products[i];
			store_product+='<div class="container"><div class="column"><img class="image" alt="sale" src="'
						+ element.url + '"><div class="overlay"><div class="text"> <s>'+element.price+'$</s> '+element.discounted_price+'$</div>'
						+ '</div></div></div>'; 
			if((i+1)%4==0) store_product += '</div><div class="row">';
		}
		store_product+="</div>";
		document.getElementsByTagName('main')[0].innerHTML = store_product;
    }
};
xhr.open('GET', 'store_list.json');
xhr.send();