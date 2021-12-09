//User ID to dsplay from Flickr

//var user_id = "192658515@N08";
var user_id = "194563521@N02";

//API key
var api_key = "151dd3c0755a192df5e460420b7a8521";

var galleries = [];
var collections = [];
var loaded = false;

$(window).on("load", function () {
  //W3 includes header into document, with a call back to display user's name
  w3.includeHTML(getName);
  //Checks if all information from user is in localstorage
  checkLoaded();
  //Below functions verify that information stored about user is still correct,
  //before all underlying API are called to update
  getSocials();
  getProfile();
  getPhotoSets();
  getCollections();
  getBackground();
});

//Function that checks that all information retrieved from user is in localstorage
function checkLoaded() {
  if (localStorage.length == 7) {
    //Removes loading gif that covers screen
    $(".loading").fadeOut("slow");
    //Sets page to fully loaded
    var loaded = true;
  } else {
    //Sets page loaded to false
    loaded = false;
  }
}

//Checks if page should reload
function checkReload() {
  //If page was fully loaded already, do nothing
  if (loaded == false) {
    //If all information is now in localstorage, reload
    if (localStorage.length == 7) {
      loaded = true;
      location.reload();
    }
  }
}

//Function that gets name from localstorage or API,
//then displays in header and saves to storage
function getName() {
  try {
    $(".username").text(localStorage.getItem("name"));
  } finally {
    $.getJSON(
      `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
      {}
    ).done(function (data) {
      let name = data.person.realname._content;
      $(".username").text(name);
      if (
        localStorage.getItem("name") != null &&
        name != localStorage.getItem("name")
      ) {
        localStorage.clear();
        location.reload();
      } else {
        localStorage.setItem("name", name);
      }
    });
  }
}

//Function that gets profile image source and descriptions from localstorage or API,
//then saves to localstorage
function getProfile() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    let desc = data.person.description._content;
    if (
      localStorage.getItem("profileDesc") === null ||
      desc != localStorage.getItem("profileDesc")
    ) {
      localStorage.setItem("profileDesc", data.person.description._content);
      checkReload();
    }
  });

  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.search&user_id=${user_id}&tags=profile&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    profilePhoto = data.photos.photo[0];
    profilePhotoSource = `https://live.staticflickr.com/${profilePhoto.server}/${profilePhoto.id}_${profilePhoto.secret}_b.jpg`;
    if (
      localStorage.getItem("profilePicture") === null ||
      profilePhotoSource != localStorage.getItem("profilePicture")
    ) {
      localStorage.setItem("profilePicture", profilePhotoSource);
      checkReload();
    }
  });
}

//Function that gets social media usernames from localstorage or API,
//then saves to localstorage
function getSocials() {
  let socials = [];
  if (JSON.parse(localStorage.getItem("socials")) === null) {
    $.getJSON(
      `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.profile.getProfile&user_id=${user_id}&format=json&jsoncallback=?`,
      {}
    ).done(function (data) {
      localStorage.setItem("socials", JSON.stringify(data.profile));
      checkReload();
    });
  }
}

//Function that gets user galleries from localstorage or API if needed
function getPhotoSets() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photosets.getList&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    console.log(data.photosets.photoset.length);
    if (
      localStorage.getItem("galleries") === null ||
      JSON.parse(localStorage.getItem("galleries")).length !=
        data.photosets.photoset.length
    ) {
      $.each(data.photosets.photoset, function (i, photoset) {
        let galleryCard = `<div id="gallery${i}"class="gallery"><div class="gallery-info"><h3><b>${photoset.title._content}</h3></b><p>${photoset.description._content}</p></div><img
            class="cardImage" src="https://live.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}.jpg"
            /></div>`;
        getPhotos(
          data.photosets.photoset[i].id,
          data.photosets.photoset.length,
          galleryCard,
          i
        );
      });
    }
  });
}

//Function that gets image sources for each gallery image from localstorage or API,
//then saves to localstorage
function getPhotos(id, photosets, galleryCard, galleryNumber) {
  console.log("In getphotos");
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photosets.getPhotos&photoset_id=${id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    let length = data.photoset.photo.length;
    let dynamicE = [];

    $.each(data.photoset.photo, function (i, photo) {
      let farmId = photo.farm;
      let serverId = photo.server;
      let id = photo.id;
      let secret = photo.secret;

      $.getJSON(
        `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getSizes&photo_id=${id}&format=json&jsoncallback=?`,
        {}
      ).done(function (data) {
        let sizes = data.sizes.size;
        $.getJSON(
          `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getInfo&photo_id=${id}&format=json&jsoncallback=?`,
          {}
        ).done(function (data) {
          let desc = data.photo;
          dynamicE.push({
            src: `${sizes[sizes.length - 2].source}`,
            thumb: `${sizes[sizes.length - 4].source}`,
            subHtml: `<div class="lightGallery-captions about">
                <h4>Photo by <a href="https://flickr.com/people/${desc.owner.nsid}">${desc.owner.realname}</a></h4>
                <p>Published on ${desc.dates.taken}</p></br>
                <p>${desc.description._content}</p>
            </div>`,
          });
          if (dynamicE.length == length) {
            galleries.push([galleryCard, dynamicE, galleryNumber]);
          }
          if (galleries.length == photosets) {
            localStorage.setItem("galleries", JSON.stringify(galleries));
            console.log(galleries);
            checkReload();
          }
        });
      });
    });
  });
}

//Function that gets user collections from localstorage or API if needed
function getCollections() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.galleries.getList&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    if (
      localStorage.getItem("collections") === null ||
      data.galleries.gallery.length !=
        JSON.parse(localStorage.getItem("collections")).length
    ) {
      $.each(data.galleries.gallery, function (i, gallery) {
        let galleryCard = `<div id="collection${i}"class="gallery"><div class="gallery-info"><h3><b>${gallery.title._content}</h3></b><p>${gallery.description._content}</p></div><img id="gallery${i}"
        class="cardImage" src="https://live.staticflickr.com/${gallery.primary_photo_server}/${gallery.primary_photo_id}_${gallery.primary_photo_secret}.jpg"
        /></div>`;
        getCollectionPhotos(
          data.galleries.gallery[i].id,
          data.galleries.gallery.length,
          galleryCard,
          i
        );
      });
    }
  });
}

//Function that gets image sources for each collection image from localstorage or API,
//then saves to localstorage
function getCollectionPhotos(id, photosets, galleryCard, galleryNumber) {
  let collectionPhotos = [];
  let dynamicE = [];
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.galleries.getPhotos&gallery_id=${id}&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    let length = data.photos.photo.length;

    $.each(data.photos.photo, function (i, photo) {
      let farmId = photo.farm;
      let serverId = photo.server;
      let id = photo.id;
      let secret = photo.secret;

      $.getJSON(
        `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getSizes&photo_id=${id}&format=json&jsoncallback=?`,
        {}
      ).then(function (data) {
        let sizes = data.sizes.size;
        $.getJSON(
          `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getInfo&photo_id=${id}&format=json&jsoncallback=?`,
          {}
        ).then(function (data) {
          desc = data.photo;
          dynamicE.push({
            src: `${sizes[sizes.length - 2].source}`,
            thumb: `${sizes[sizes.length - 4].source}`,
            subHtml: `<div class="lightGallery-captions about">
                  <h4>Photo by <a href="https://flickr.com/people/${desc.owner.nsid}">${desc.owner.realname}</a></h4>
                  <p>Published on ${desc.dates.taken}</p></br>
                  <p>${desc.description._content}</p>
              </div>`,
          });
          if (dynamicE.length == length) {
            collections.unshift([galleryCard, dynamicE, galleryNumber]);
          }
          if (collections.length == photosets) {
            localStorage.setItem("collections", JSON.stringify(collections));
            checkReload();
          }
        });
      });
    });
  });
}

//Function that gets photo sources with tag background from localstorage or API if needed
function getBackground() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.search&user_id=${user_id}&tags=background&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    let backgrounds = [];
    let length = data.photos.photo.length;
    if (
      localStorage.getItem("backgrounds") === null ||
      length != JSON.parse(localStorage.getItem("backgrounds")).length
    ) {
      $.each(data.photos.photo, function (i, photo) {
        $.getJSON(
          `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getSizes&photo_id=${photo.id}&format=json&jsoncallback=?`,
          {}
        ).then(function (data) {
          let sizes = data.sizes;
          backgroundSource = sizes.size[sizes.size.length - 2].source;
          backgrounds.push(backgroundSource);
          if (backgrounds.length == length) {
            localStorage.setItem("backgrounds", JSON.stringify(backgrounds));
            checkReload();
          }
        });
      });
    }
  });
}

//Opens side nav bar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

//Closes side nav bar
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
