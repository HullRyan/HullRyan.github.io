var api_key = "151dd3c0755a192df5e460420b7a8521";
var user_id = "192658515@N08";
var dynamicArrays = [];

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
  if(localStorage.getItem("collections") === null) {
    getCollections();
  }
  let collections = JSON.parse(localStorage.getItem("collections"));
  console.log(collections);
  $.each(collections, function(i, collection) {
    $(
      ".gallery-items"
    ).append(`${collection[0]}`);
    createLightGallery(collection[1], i);
  })
  
}

function createLightGallery(photos, i) {
  console.log(photos);
  console.log(i);
  console.log("in dynamic");
  const $dynamicGallery = document.getElementById(`collection${i}`);
  const dynamicGallery = window.lightGallery($dynamicGallery, {
    dynamic: true,
    plugins: [lgZoom, lgThumbnail],
    dynamicEl: photos,
  });
  document.getElementById(`collection${i}`).addEventListener("click", () => {
    dynamicGallery.openGallery(i);
  });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
