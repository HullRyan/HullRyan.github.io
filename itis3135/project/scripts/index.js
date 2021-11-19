$(window).on("load", function () {
  var background = document.getElementById("box-image");
  background.onload = function () {
    setColor();
  };
  checkBackground();
});

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

function setColor() {
  var img = document.querySelector("img");
  console.log("Test");

  var vibrant = new Vibrant(img);
  var swatches = vibrant.swatches();
  console.log(swatches["Vibrant"]);
  document.body.style.color = swatches["Vibrant"].getHex();
  document.getElementById("gallery-button").style.backgroundColor =
    swatches["Vibrant"].getHex();
  document.getElementById("mySidenav").style.color =
    swatches["Vibrant"].getHex();
  for (var swatch in swatches)
    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
      console.log(swatch, swatches[swatch].getHex());
}
