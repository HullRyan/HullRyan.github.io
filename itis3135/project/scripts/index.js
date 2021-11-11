var user_id = "192658515@N08";
var api_key = "151dd3c0755a192df5e460420b7a8521";

$(window).on("load", function () {
  // Animate loader off screen

  var background = document.getElementById("box-image");
  background.onload = function () {
    setColor();
  };
  w3.includeHTML(getName);
  $(".se-pre-con").fadeOut("slow");
});

function getName() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    person = data.person;
    console.log(person);
    $(".username").text(person.realname._content);
  });
  getBackground();
}

function getBackground() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.search&user_id=${user_id}&tags=background&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    var photo =
      data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)];
    $.getJSON(
      `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getSizes&photo_id=${photo.id}&format=json&jsoncallback=?`,
      {}
    ).then(function (data) {
      let sizes = data.sizes;
      console.log(sizes);
      backgroundSource = sizes.size[sizes.size.length - 2].source;
      var background = document.getElementById("box-image");
      background.src = backgroundSource;
    });
  });
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

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
