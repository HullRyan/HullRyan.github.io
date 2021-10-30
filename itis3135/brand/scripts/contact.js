function displayContent() {
    var form = document.getElementById("contact");
    var query = $('#contact').serializeArray();
    console.log(query);
    var display = document.getElementById("form-submission");
    display.innerHTML = "Results </br>";
    for (let i = 0; i < query.length; i++) {
        display.innerHTML += query[i].name + ": " + query[i].value + "</br>";
    } 
}