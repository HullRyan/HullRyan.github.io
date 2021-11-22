$(window).on("load", function () {
  checkPhotoSets();
});

//Checks and retrieves users galleries from local storage
function checkPhotoSets(grid) {
  if (localStorage.getItem("galleries") === null) {
    getPhotoSets();
  }
  let galleries = JSON.parse(localStorage.getItem("galleries"));
  console.log(galleries);
  $.each(galleries, function (i, gallery) {
    console.log(gallery[0]);
    $(".grid").append(`${gallery[0]}`);
    console.log(gallery[2]);
    createLightGallery(gallery[1], gallery[2], galleries);
  });
}

//Creates light galleries dynamically
function createLightGallery(photos, i, galleries) {
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
  console.log(document.getElementById("gallery-container").childElementCount);
  console.log(galleries.length);
  if (
    document.getElementById("gallery-container").childElementCount ==
    galleries.length
  ) {
    console.log("refreshing items");
    grid.refreshItems().layout();
  }
}
