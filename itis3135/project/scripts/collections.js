$(window).on("load", function () {
  checkPhotoSets();
});

function checkPhotoSets() {
  if (localStorage.getItem("collections") === null) {
    getCollections();
  }
  let collections = JSON.parse(localStorage.getItem("collections"));
  console.log(collections);
  $.each(collections, function (i, collection) {
    $(".gallery-items").append(`${collection[0]}`);
    createLightGallery(collection[1], collection[2]);
  });
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
