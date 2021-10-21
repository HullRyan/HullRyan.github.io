//Referenced slides in book

$(document).ready(function () {
    //Preloading images for main image display, takes longer on initial load 
  $("#image_list a").each(function () {
    var swappedImage = new Image();
    swappedImage.src = $(this).attr("href");
  });

  //Left side of slideshow
  $("#list-left a").click(function (evt) {

    //Temp variable used for assignment for image source
    var imageUrl = $(this).attr("href");
    $("#main-image").attr("src", imageUrl);

    //Temp variable used for assignment for image caption
    var caption = $(this).attr("title");
    $("#caption").text(caption);

    //Takes away redirect from href
    evt.preventDefault(); 
  });

  //Right side of slideshow
  $("#list-right a").click(function (evt) {

    var imageUrl = $(this).attr("href");
    $("#main-image").attr("src", imageUrl);

    var caption = $(this).attr("title");
    $("#caption").text(caption);


    evt.preventDefault(); 
  });

});
