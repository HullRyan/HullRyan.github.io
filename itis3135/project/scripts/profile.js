var user_id = "192658515@N08";
var api_key = "151dd3c0755a192df5e460420b7a8521";
var galleries = [];
var collections = [];

$(window).on("load", function () {
  getName();
  getSocials();
  getProfile();
  getPhotoSets();
  getCollections();
  getBackground();
});

function getName() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.people.getInfo&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    let name = data.person.realname._content;
    $(".username").text(name);
    if (
      localStorage.getItem("name") === null ||
      name != localStorage.getItem("name")
    ) {
      localStorage.clear();
      localStorage.setItem("name", name);
    }
  });
}

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
      $.getJSON(
        `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.search&user_id=${user_id}&tags=profile&format=json&jsoncallback=?`,
        {}
      ).done(function (data) {
        profilePhoto = data.photos.photo[0];
        profilePhotoSource = `https://live.staticflickr.com/${profilePhoto.server}/${profilePhoto.id}_${profilePhoto.secret}_b.jpg`;
        localStorage.setItem("profilePicture", profilePhotoSource);
      });
    }
  });
}

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
            src="https://live.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}.jpg"
            /></div>`;
        getPhotos(
          data.photosets.photoset[i].id,
          data.photosets.photoset.length,
          galleryCard
        );
      });
    }
  });
}

function getSocials() {
  let socials = [];
  if (JSON.parse(localStorage.getItem("socials")) === null) {
    $.getJSON(
      `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.profile.getProfile&user_id=${user_id}&format=json&jsoncallback=?`,
      {}
    ).done(function (data) {
      localStorage.setItem("socials", JSON.stringify(data.profile));
    });
  }
}

function getPhotos(id, photosets, galleryCard) {
  let galleryPhotos = [];
  let dynamicE = [];
  console.log("In getphotos");
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photosets.getPhotos&photoset_id=${id}&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    var length = data.photoset.photo.length;

    $.each(data.photoset.photo, function (i, ps) {
      var farmId = ps.farm;
      var serverId = ps.server;
      var id = ps.id;
      var secret = ps.secret;

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
          console.log(desc);
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
            galleries.unshift([galleryCard, dynamicE]);
          }
          if (galleries.length == photosets) {
            localStorage.setItem("galleries", JSON.stringify(galleries));
            console.log(galleries);
          }
        });
      });
    });
  });
}

function getCollections() {
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.galleries.getList&user_id=${user_id}&format=json&jsoncallback=?`,
    {}
  ).done(function (data) {
    console.log(data);
    if (
      localStorage.getItem("collections") === null ||
      data.galleries.gallery.length !=
        JSON.parse(localStorage.getItem("collections")).length
    ) {
      $.each(data.galleries.gallery, function (i, gallery) {
        let galleryCard = `<div id="collection${i}"class="gallery"><div class="gallery-info"><h3><b>${gallery.title._content}</h3></b><p>${gallery.description._content}</p></div><img id="gallery${i}"
          src="https://live.staticflickr.com/${gallery.primary_photo_server}/${gallery.primary_photo_id}_${gallery.primary_photo_secret}.jpg"
        /></div>`;
        console.log(data.galleries.gallery.length);
        getCollectionPhotos(
          data.galleries.gallery[i].id,
          data.galleries.gallery.length,
          galleryCard
        );
      });
    }
  });
}

function getCollectionPhotos(id, photosets, galleryCard) {
  let collectionPhotos = [];
  let dynamicE = [];
  console.log("In getCollectionPhotos");
  $.getJSON(
    `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.galleries.getPhotos&gallery_id=${id}&format=json&jsoncallback=?`,
    {}
  ).then(function (data) {
    console.log(data);
    var length = data.photos.photo.length;

    $.each(data.photos.photo, function (i, ps) {
      var farmId = ps.farm;
      var serverId = ps.server;
      var id = ps.id;
      var secret = ps.secret;

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
          console.log(length);
          console.log(dynamicE.length);
          if (dynamicE.length == length) {
            collections.unshift([galleryCard, dynamicE]);
          }
          if (collections.length == photosets) {
            localStorage.setItem("collections", JSON.stringify(collections));
            console.log(collections);
          }
        });
      });
    });
  });
}

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
      console.log(data.photos.photo);
      $.each(data.photos.photo, function (i, photo) {
        $.getJSON(
          `https://api.flickr.com/services/rest?api_key=${api_key}&method=flickr.photos.getSizes&photo_id=${photo.id}&format=json&jsoncallback=?`,
          {}
        ).then(function (data) {
          let sizes = data.sizes;
          backgroundSource = sizes.size[sizes.size.length - 2].source;
          backgrounds.push(backgroundSource);
          if (backgrounds.length == length) {
            console.log("Pushing backgrounds");
            localStorage.setItem("backgrounds", JSON.stringify(backgrounds));
            location.reload();
          }
        });
      });
    }
  });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
