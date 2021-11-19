$(window).on("load", function () {
  checkPhotoSets();
});

function checkPhotoSets() {
  if (localStorage.getItem("galleries") === null) {
    getPhotoSets();
  }
  let galleries = JSON.parse(localStorage.getItem("galleries"));
  console.log(galleries);
  $.each(galleries, function (i, gallery) {
    console.log(gallery[0]);
    $(".gallery-items").append(`${gallery[0]}`);
    console.log(gallery[2]);
    createLightGallery(gallery[1], gallery[2]);
  });
}

function createLightGallery(photos, i) {
  console.log(photos);
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
