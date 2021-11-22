$(document).ready(function () {
    $.getJSON("Exercise/Activity15/facultyList.json", function(data) {
        console.log(data);
        var faculty = data.facultymembers;
        console.log(faculty);
        let facultyDiv = document.getElementById("faculty");
        for(let i = 0; i < faculty.length; i++) {
            facultyDiv.innerHTML += (  `<img src="./Exercise/Activity15/${faculty[i].image}" alt="${faculty[i].full_name} photo">
                                <h2>${faculty[i].full_name}</h2>
                                <h3>${faculty[i].department}</h3>
                                <p>${faculty[i].bio}</p>`)
        } 
    })
});
