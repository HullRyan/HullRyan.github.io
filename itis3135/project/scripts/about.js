$(window).on("load", function () {
  w3.includeHTML(checkProfile);
  $(".se-pre-con").fadeOut("slow");
});

function checkName() {
  if(localStorage.getItem("name") === null) {
    getName();
    $(".username").text(localStorage.getItem("name"));
  } else {
    let name = localStorage.getItem("name");
    $(".username").text(name);
  }
}

function checkProfile() {
    checkName();
    $("#about").text(localStorage.getItem("profileDesc"));
    $(".profilePhoto").attr("src", localStorage.getItem("profilePicture"));
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
