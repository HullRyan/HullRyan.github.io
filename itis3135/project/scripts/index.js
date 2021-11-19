var user_id = "192658515@N08";
var api_key = "151dd3c0755a192df5e460420b7a8521";

$(window).on("load", function () {
  // Animate loader off screen

  var background = document.getElementById("box-image");
  background.onload = function () {
    setColor();
  };
  w3.includeHTML(checkName);
  $(".se-pre-con").fadeOut("slow");
});

function checkName() {
  if (localStorage.getItem("name") === null) {
    $.getJSON(
      `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
      {}
    ).done(function (data) {
      let name = data.person.realname._content;
      localStorage.setItem("name", name);
      $(".username").text(name);
    });
  } else {
    let name = localStorage.getItem("name");
    $(".username").text(name);
  }
  checkBackground();
}

function checkBackground() {
  if (localStorage.getItem("backgrounds") === null) {
    getBackground();
  }
  let backgrounds = JSON.parse(localStorage.getItem("backgrounds"));
  console.log(backgrounds);
  var photo = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  document.getElementById("box-image").src = photo;
}

$("img").bind("load", function () {
  console.log("image load");
  setColor();
});

async function setColor() {
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
  return;
}
