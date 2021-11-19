$(window).on("load", function () {
  checkProfile();
});

function checkProfile() {
  $("#about").text(localStorage.getItem("profileDesc"));
  $(".profilePhoto").attr("src", localStorage.getItem("profilePicture"));
}
