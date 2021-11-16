$(document).ready(function () {
  $.getJSON("Exercise/Activity13/team.json", function (data) {
    $.each(data, function () {
      $.each(this, function (i, data) {
        $("#team").append(
          "Name: " +
            data.name +
            "<br>" +
            "Title: " +
            data.title +
            "<br>" +
            "Bio: " +
            data.bio +
            "<br><br>"
        );
      });
    });
  });
});
