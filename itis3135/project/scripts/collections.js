var api_key = "151dd3c0755a192df5e460420b7a8521";
var user_id = "192658515@N08";
var dynamicArrays = [];

$(window).on("load", function () {
  // Animate loader off screen
  w3.includeHTML(getgalleries);
  $(".se-pre-con").fadeOut("slow");
});

function getName() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    person = data.person;
    console.log("getName " + data);
    $(".username").text(person.realname._content);
  });
}

function getgalleries() {
  getName();
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.galleries.getList&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    console.log(data);
    $.each(data.galleries.gallery, function (i, gallery) {
      $(
        ".gallery-items"
      ).append(`<div class="gallery"><div class="gallery-info"><h3><b>${gallery.title._content}</h3></b><p>${gallery.description._content}</p></div><img id="gallery${i}"
        src="https://live.staticflickr.com/${gallery.primary_photo_server}/${gallery.primary_photo_id}_${gallery.primary_photo_secret}.jpg"
      /></div>`);
      dynamicArrays.push([]);
      getPhotos(data.galleries.gallery[i].id, i);
    });
  });
}

function getPhotos(id, i) {
  let dynamicE = [];
  console.log("In getphotos");
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.galleries.getPhotos&gallery_id=${id}&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    console.log(data.photos.photo);
    var div = document.querySelector(".images");

    $.each(data.photos.photo, function (j, ps) {
      pushToArrays(ps, i);
    });
  });
  dynamic(i);
}

function pushToArrays(ps, i) {
  console.log(ps);
  let elements = [];
  var farmId = ps.farm;
  var serverId = ps.server;
  var id = ps.id;
  var secret = ps.secret;

  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getSizes&photo_id=${id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    console.log(data);
    let sizes = data.sizes;
    console.log(sizes.size);
    $.getJSON(
      `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getInfo&photo_id=${id}&format=json&jsoncallback=?`,
      {}
    ).done(function (data) {
      desc = data.photo;
      console.log(desc);
      dynamicArrays[i].push({
        src: `${sizes.size[sizes.size.length - 1].source}`,
        thumb: `${sizes.size[sizes.size.length - 4].source}`,
        subHtml: `<div class="lightGallery-captions about">
              <h4>Photo by <a href="https://flickr.com/people/${desc.owner.nsid}">${desc.owner.realname}</a></h4>
              <p>Published on ${desc.dates.taken}</p></br>
              <p>${desc.description._content}</p>
          </div>`,
      });
    });
  });
}
var dynamicGalleries = [];

function dynamic(i) {
  setTimeout(function () {
    console.log(dynamicArrays[i]);
    const $dynamicGallery = document.getElementById(`gallery${i}`);
    let dynamicGallery = window.lightGallery($dynamicGallery, {
      dynamic: true,
      plugins: [lgZoom, lgThumbnail],
      dynamicEl: dynamicArrays[i],
    });
    console.log("In Timeout");
    document.getElementById(`gallery${i}`).addEventListener("click", () => {
      dynamicGallery.openGallery();
      console.log(dynamic);
    });
  }, 8000);
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
