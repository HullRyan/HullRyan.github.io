var user_id = "192658515@N08";
var api_key = "151dd3c0755a192df5e460420b7a8521";

var person;
var profilePictureSource;

$(window).on("load", function () {
  w3.includeHTML(checkSocials);
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

function checkSocials() {
  checkName();
  if(localStorage.getItem("socials") === null) {
    getSocials();
  }
    let profile = JSON.parse(localStorage.getItem("socials"));
    console.log(profile);
    let socials = document.getElementsByClassName("socials");
    if (profile.facebook != "") {
      console.log("in facebook");
      $(".socials").append(
        `<a class="fab fa-facebook fa-lg" href="https://www.facebook.com/${profile.facebook}"></a>`
      );
    }
    if (profile.instagram != "") {
      console.log("in instagram");
      $(".socials").append(
        `<a class="fab fa-instagram fa-lg" href="https://www.instagram.com/${profile.instagram}"></a>`
      );
    }
    if (profile.pinterest != "") {
      console.log("in pinterest");
      $(".socials").append(
        `<a class="fab fa-pinterest fa-lg" href="https://www.pinterest.com/${profile.pinterest}"></a>`
      );
    }
    if (profile.tumblr != "") {
      console.log("in tumblr");
      $(".socials").append(
        `<a class="fab fa-tumblr fa-lg" href="https://www.tumblr.com/${profile.tumblr}"></a>`
      );
    }
    if (profile.twitter != "") {
      console.log("in twitter");
      $(".socials").append(
        `<a class="fab fa-twitter fa-lg" href="https://www.twitter.com/${profile.twitter}"></a>`
      );
    }
    if (profile.website != "") {
      console.log("in website");
      $(".socials").append(
        `<a class="fas fa-home fa-lg" href="${profile.website}"></a>`
      );
    }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}