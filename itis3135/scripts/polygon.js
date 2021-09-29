//Main function that occurs when button is pressed
function polygonInput() {
    sides = validateEntry();
    polygonName = getShape(sides);
    displayPolygon(polygonName, sides);
}

//Looks up polygon name from stored array
function getShape(sides) {
    return(polygons[sides-1]);
}

//Display function which diplays sides entered from user and polygon name
function displayPolygon(polygonName, sides) {
    document.getElementById("polygonDisplay").innerHTML = 
        "Your chosen polygon is a: " + polygonName + 
        "<br/>It has: " + sides + " sides";
}

//Validates user entry through a loop and if statements
function validateEntry() {
    
    var input;
    
    while(input = prompt("Please enter number of sides of polygon 1-40: ")) 
    {
        if (isNaN(input) || parseInt(input) <= 0 || parseInt(input) > 40)
        {
            alert("Invalid Input");
        } 
        else 
        {
            return parseInt(input);
        }
    }
}

//Array that holds polygon names according to index+1
var polygons = [
    "henagon",
    "digon",
    "triangle",
    "quadrilateral",
    "pentagon",
    "hexagon",
    "heptagon",
    "Octagon",
    "nonagon, enneagon",
    "decagon",
    "undecagon, hendecagon",
    "dodecagon",
    "tridecagon, triskaidecagon",
    "tetradecagon, tetrakaidecagon",
    "pentadecagon, pentakaidecagon",
    "hexadecagon, hexakaidecagon",
    "heptadecagon, heptakaidecagon",
    "octadecagon, octakaidecagon",
    "enneadecagon, enneakaidecagon",
    "Icosagon",
    "icosikaihenagon, icosihenagon",
    "icosikaidigon",
    "icosikaitrigon",
    "icosikaitetragon",
    "icosikaipentagon",
    "icosikaihexagon",
    "icosikaiheptagon",
    "icosikaioctagon",
    "icosikaienneagon",
    "triacontagon",
    "triacontakaihenagon",
    "triacontakaidigon",
    "triacontakaitrigon",
    "triacontakaitetragon",
    "triacontakaipentagon",
    "triacontakaihexagon",
    "triacontakaiheptagon",
    "triacontakaioctagon",
    "triacontakaienneagon",
    "tetracontagon"
];