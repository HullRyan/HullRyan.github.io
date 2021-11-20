$(window).on("load", function () {
  checkSocials();
});

//Checks through all possible social media links on Flickr and dynamically makes buttons for each
function checkSocials() {
  if (localStorage.getItem("socials") === null) {
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
