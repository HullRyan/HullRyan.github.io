$(document).ready(function () {
    var photosUrl = `https://api.flickr.com/services/feeds/photos_public.gne? 
        id=82407828@N07&format=json&jsoncallback=?&tags=vectacorpbuilding`;
    getPhotos(photosUrl);
});

function getPhotos(photosUrl) {
    $.getJSON(photosUrl).then(function (data) {
        photos = data.items;
        var buildingPhotos = document.getElementById("new_building");
        $.each(photos, function(i, photo) {
            console.log(photo);
            buildingPhotos.innerHTML += `<a href="${photo.media.m}" data-lightbox="new_building" data-title="${photo.title}">
            <img src="${photo.media.m}"></a>`;
        })
    })
}
