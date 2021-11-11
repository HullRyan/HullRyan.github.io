var photoSets;
var api_key = "151dd3c0755a192df5e460420b7a8521";
var user_id = "192658515@N08";

$(window).on("load", function () {
  // Animate loader off screen
  w3.includeHTML(getPhotoSets);
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

function getPhotoSets() {
  getName();
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photosets.getList&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    console.log(data.photosets.photoset);
    $.each(data.photosets.photoset, function (i, photoset) {
      $(
        ".gallery-items"
      ).append(`<div class="gallery"><div class="gallery-info"><h3><b>${photoset.title._content}</h3></b><p>${photoset.description._content}</p></div><img id="photoset${i}"
        src="https://live.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}.jpg"
      /></div>`);
      getPhotos(data.photosets.photoset[i].id, i);
    });
  });
}

function getPhotos(id, i) {
  let dynamicE = [];
  console.log("In getphotos");
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photosets.getPhotos&photoset_id=${id}&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    console.log(data);
    var div = document.querySelector(".images");

    $.each(data.photoset.photo, function (i, ps) {
      var farmId = ps.farm;
      var serverId = ps.server;
      var id = ps.id;
      var secret = ps.secret;

      console.log(ps);

      $.getJSON(
        `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getSizes&photo_id=${id}&format=json&jsoncallback=?`,
        {}
      ).then(function (data) {
        let sizes = data.sizes;
        console.log(sizes.size);
        $.getJSON(
          `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getInfo&photo_id=${id}&format=json&jsoncallback=?`,
          {}
        ).then(function (data) {
          desc = data.photo;
          console.log(desc);
          dynamicE.push({
            src: `${sizes.size[12].source}`,
            thumb: `${sizes.size[12].source}`,
            subHtml: `<div class="lightGallery-captions about">
                  <h4>Photo by <a href="https://flickr.com/people/${desc.owner.nsid}">${desc.owner.realname}</a></h4>
                  <p>Published on ${desc.dates.taken}</p></br>
                  <p>${desc.description._content}</p>
              </div>`,
          });
        });
      });
    });
    return(dynamicE);
  });
  dynamic(dynamicE, i);
}

function dynamic(dynamicE, i) {
  setTimeout(function () {
  console.log("in dynamic");
  const $dynamicGallery = document.getElementById(`photoset${i}`);
  const dynamicGallery = window.lightGallery($dynamicGallery, {
    dynamic: true,
    plugins: [lgZoom, lgThumbnail],
    dynamicEl: dynamicE,
  });
    console.log("In Timeout");
    document.getElementById(`photoset${i}`).addEventListener("click", () => {
      dynamicGallery.openGallery(i);
    });
  }, 8000);
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
