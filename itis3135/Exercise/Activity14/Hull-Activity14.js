$(document).ready(function () {
  document.getElementById("toobin").addEventListener("click", function () {
    $.getJSON("Exercise/Activity14/json_files/toobin.json", function (data) {
      console.log(`object`, data);
      changeSpeaker(data);
    });
  });
  document.getElementById("sorkin").addEventListener("click", function () {
    $.getJSON("Exercise/Activity14/json_files/sorkin.json", function (data) {
        console.log(`object`, data);
        changeSpeaker(data);
      });
  });
  document.getElementById("chua").addEventListener("click", function () {
    $.getJSON("Exercise/Activity14/json_files/chua.json", function (data) {
        console.log(`object`, data);
        changeSpeaker(data);
      });
  });
  document.getElementById("sampson").addEventListener("click", function () {
    $.getJSON("Exercise/Activity14/json_files/sampson.json", function (data) {
        console.log(`object`, data);
        changeSpeaker(data);
      });
  });
}); // end ready

function changeSpeaker(data) {
    speaker = data.speakers[0];
    console.log(`speaker`, speaker);
    document.getElementById("main").innerHTML = 
   `<h1>${speaker.title}</h1>
	<h2>${speaker.month}</h2>
	<h3>${speaker.speaker}</h3>
	<img src="Exercise/Activity14/${speaker.image}" alt = "${speaker.speaker} picture">
	<p>${speaker.text}
    </p>`;
}
