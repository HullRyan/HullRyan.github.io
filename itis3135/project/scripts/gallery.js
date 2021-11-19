var photoSets;
var api_key = "151dd3c0755a192df5e460420b7a8521";
var user_id = "192658515@N08";
var galleries = [];

$(window).on("load", function () {
  // Animate loader off screen
  w3.includeHTML(checkPhotoSets);
  $(".se-pre-con").fadeOut("slow");
});

function checkName() {
  if(localStorage.getItem("name") === null) {
    $.getJSON(
      `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
      {}
    ).done(function (data) {
      let name = data.person.realname._content;
      localStorage.setItem("name", name);
      $(".username").text(name);
  })} else {
    let name = localStorage.getItem("name");
    $(".username").text(name);
  }
}

function checkPhotoSets() {
  checkName();
  if(localStorage.getItem("galleries") === null) {
    getPhotoSets();
  }
  let galleries = JSON.parse(localStorage.getItem("galleries"));
  console.log(galleries);
  $.each(galleries, function(i, gallery) {
    console.log(gallery[0]);
    $(
      ".gallery-items"
    ).append(`${gallery[0]}`);
    createLightGallery(gallery[1], i);
  })
  
}

function createLightGallery(photos, i) {
  console.log(photos);
  console.log(i);
  console.log("in dynamic");
  const $dynamicGallery = document.getElementById(`gallery${i}`);
  const dynamicGallery = window.lightGallery($dynamicGallery, {
    dynamic: true,
    plugins: [lgZoom, lgThumbnail],
    dynamicEl: photos,
  });
  document.getElementById(`gallery${i}`).addEventListener("click", () => {
    dynamicGallery.openGallery(i);
  });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
