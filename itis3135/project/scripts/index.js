$(window).on("load", function () {
  getName();
  var background = document.getElementById("box-image");
  background.onload = function () {
    setColor();
  };
  checkBackground();
});

//Gets random background image from local storage and displays it
function checkBackground() {
  if (localStorage.getItem("backgrounds") === null) {
    getBackground();
  } else {
    let backgrounds = JSON.parse(localStorage.getItem("backgrounds"));
    console.log(backgrounds);
    var photo = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.getElementById("box-image").src = photo;
  }
}

//Uses vibrant.js to get color from image and changes styles dynamically
function setColor() {
  var img = document.querySelector("img");
  var vibrant = new Vibrant(img);
  var swatches = vibrant.swatches();
  console.log(swatches["Vibrant"]);
  document.documentElement.style.setProperty('--dynamic-color', swatches["Vibrant"].getHex());
  for (var swatch in swatches)
    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
      console.log(swatch, swatches[swatch].getHex());
}
