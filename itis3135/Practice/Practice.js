var $ = function(id) {
	return document.getElementById(id);
};

let order = [];
let total = 0.0;

function addItem(i) {
	console.log(i);
	if (order.includes(i)){
		console.log("Already in order");
		updateOrderDisplay();
		$("order").innerHTML += "</br></br>Already in order";
	}
	else {
		switch (i) {
			case 1:
				order.push(1, "Cappuccino", 1.95, "Delicious Cappuccino!");
				break;
			case 2:
				order.push(2, "Espresso", 3.45, "Delicious espresso. Wanna try it?");
				break;
		}
		console.log("order length: " + order.length);
		updateOrderDisplay();
	}
}

function updateOrderDisplay() {
	var orderDisplay = $("order");
	orderDisplay.innerHTML = "";
	for (i = 0; i < order.length; i+=4) {
		orderDisplay.innerHTML += "</br>$" + order[i+2] + " - " + order[i+1] + " - " + order[i+3]; 
	}
	updateTotal();
}

function clearOrder() {
	order = [];
	updateOrderDisplay();
}

function updateTotal() {
	total = 0.0;
	for (i = 0; i < order.length; i+=4) {
		total += order[i+2];
	}
	$("total").innerHTML = "</br>Total: $" + total;
}

window.onload = function() {

	//add onclick event handler for each image
	$("cappuccino").onclick = function() {
		addItem(1);
	}
	$("espresso").onclick = function() {
		addItem(2);
	}		
	
	// for click event add item to order and update total
	$("clear_order").onclick = function() {
		clearOrder();
	}
	// display order and total

	
		
}; // end onload