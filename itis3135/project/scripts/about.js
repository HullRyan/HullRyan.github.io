$(window).on("load", function () {
  checkProfile();
});

//Function that gets profile image and description from local storage and displays it
function checkProfile() {
  $("#about").text(localStorage.getItem("profileDesc"));
  $(".profilePhoto").attr("src", localStorage.getItem("profilePicture"));
}
