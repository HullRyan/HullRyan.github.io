let headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.io)",
};

var photoSets = [[],[]];

function getPhotos() {
  $.getJSON(
    "https://api.flickr.com/services/rest?api_key=151dd3c0755a192df5e460420b7a8521&method=flickr.photosets.getPhotos&photoset_id=72157720050478418&format=json&jsoncallback=?",
    {}
  ).done(function (data) {
    console.log(data);
    var div = document.querySelector(".images");

    $.each(data.photoset.photo, function (i, gp) {
      var farmId = gp.farm;
      var serverId = gp.server;
      var id = gp.id;
      var secret = gp.secret;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

      //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

      $(".images").append(
        `<img src="https://live.staticflickr.com/${serverId}/${id}_${secret}_b.jpg"/>`
      );
    });
  });
}
