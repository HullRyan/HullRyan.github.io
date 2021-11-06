var user_id = "192658515@N08";
var api_key = "151dd3c0755a192df5e460420b7a8521";

var person;
var profilePictureSource;

//http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
//https://api.flickr.com/services/rest?api_key=151dd3c0755a192df5e460420b7a8521&method=flickr.people.getInfo&user_id=192658515@N08

//https://api.flickr.com/services/rest?api_key=151dd3c0755a192df5e460420b7a8521&method=flickr.profile.getProfile&user_id=192658515@N08

//https://api.flickr.com/services/rest?api_key=151dd3c0755a192df5e460420b7a8521&photo_id=51065322836&method=flickr.photos.getSizes

//https://api.flickr.com/services/rest?api_key=151dd3c0755a192df5e460420b7a8521&method=flickr.photos.search&user_id=192658515@N08&tags=profile

$(window).on("load", function () {
  w3.includeHTML(getProfile);
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
  }

function getProfile() {
    getName();
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    person = data.person;
    console.log(person);
    $("#about").text(person.description._content);
  });

  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.search&user_id=${user_id}&tags=profile&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    data = data.photos.photo[0];
    console.log(data)
    profilePictureSource = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
    //document.getElementById("profile").src = `<img class="mat" src="${profilePictureSource}"/>`;
    $(".profilePhoto").attr("src", profilePictureSource);
  });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
