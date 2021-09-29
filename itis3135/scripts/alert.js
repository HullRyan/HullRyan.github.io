function testScript(){
    alert("This script is running!");
}

function intro()
{

    var companyName = "Real Cool Hamster Design, Ltd";
    var usersName = "";
    var usersFeeling = "";

    var currentTime = new Date();
    var date = ((currentTime.getMonth() + 1) + "/" + currentTime.getDate() + "/" + currentTime.getFullYear());
    var time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();

    usersName = prompt("Please enter your name");
    usersFeeling = prompt("How are you doing?");

        if(usersName != null)
        {
            document.getElementById("functionResponse").innerHTML = 
            "<img src=\"images/hamster-clipart-library-com.png\" width='120' height='120' alt='Hamster logo'/>" +
            "<br/>Today is " + date + ", and the time is " + time +
            "<br/>The " + companyName + " welcomes you, " + usersName + 
            "!<br/>We're glad you are doing " + usersFeeling;
        }
}

function calculateTax()
{
    const TAX_RATE = .0525;
    var input = parseInt(prompt("Tax Rate is 5.25%. Enter $ amount to find tax amount: "));
    if (input > 0) 
    {
        document.getElementById("functionResponse").innerHTML = 
        "<b>Calculate Tax:</b><br/>" +
        "Tax Rate: " + (TAX_RATE * 100) + "%<br/>$ Input: " + input +
        "<br/>Tax Amount: $" + (TAX_RATE * input).toFixed(2) + 
        "<br/>Total: $" + ((TAX_RATE * input) + input).toFixed(2);
    }   
    else 
    {
        alert("Please try again and enter a positive number.");
    }
}

function areaPerimeter() 
{
    var length = parseInt(prompt("Please enter length: "));
    var height = parseInt(prompt("Please enter length: "));
    if (length > 0 && height > 0)
    {
        document.getElementById("functionResponse").innerHTML = 
        "<b>Calculate Area and Perimeter:</b><br/>" +
        "Length: " + length + "<br/>Height: " + height +
        "<br/><br/>Area: " + (length * height).toFixed(2) + 
        "<br/>Perimeter: " + ((length * 2)+(height * 2)).toFixed(2);
    }
    else
    {
        alert("Please try again and enter a positive number.");
    }
}

function milesPerGallon()
{
    var miles = parseInt(prompt("Please enter miles driven: "));
    var gallons = parseInt(prompt("Please enter gallons used: "));
    if (miles > 0 && gallons > 0)
    {
        document.getElementById("functionResponse").innerHTML = 
        "<b>Calculate Miles Per Gallon:</b><br/>" +
        "Miles driven: " + miles + "<br/>Gallons used: " + gallons +
        "<br/><br/>Miles Per Gallon: " + (miles/gallons).toFixed(2); 
    }
    else
    {
        alert("Please try again and enter a positive number.");
    }
}

function gpaCalculator()
{
    var grades = [];
    var classes = parseInt(prompt("Please enter number of classes taken: "));
    var gpa = 0;
    for(var i = 0; i < classes; i++)
    {
        var grade = "";
        while(  grade.toLowerCase() != "a" && grade.toLowerCase() != "b" && 
                grade.toLowerCase() != "c" && grade.toLowerCase() != "d" && 
                grade.toLowerCase() != "f")
                {
                    grade = prompt(("Please enter grade (a,b,c,d,f) received in class " + (i + 1) + ":"));
                }
        grades.push(grade);
    }
    for(var i = 0; i < grades.length; i++)
    {
        switch(grades[i].toLowerCase())
        {
            case "a":
                gpa += 4;
                break;
            case "b":
                gpa += 3;
                break;
            case "c":
                gpa += 2;
                break;
            case "d":
                gpa += 1;
                break;
            case "f":
                gpa += 0;
                break;
        }
    }
    gpa /= classes;

    document.getElementById("functionResponse").innerHTML = 
        "<b>Calculate UNCC GPA:</b><br/>" +
        "Classes taken: " + classes +
        "<br/><br/>GPA: " + gpa.toFixed(2); 
}

function displayDadJoke()
{
    var randomJokeIndex = Math.floor(Math.random() * 32 + 1);

    document.getElementById("functionResponse").innerHTML = 
        "<b>Dad Joke Generator:</b><br/>" +
         dadJokes[randomJokeIndex] +
        "<br/><br/>" + dadJokes[0]; 
}

var dadJokes = 
[
"Jokes received from CountryLiving.com",
"What do you call a factory that makes okay products? A satisfactory.",
"Dear Math, grow up and solve your own problems.",
"What did the janitor say when he jumped out of the closet? Supplies!",
"Have you heard about the chocolate record player? It sounds pretty sweet.",
"What did the ocean say to the beach? Nothing, it just waved.",
"Why do seagulls fly over the ocean? Because if they flew over the bay, we'd call them bagels.",
"I only know 25 letters of the alphabet. I don't know y.",
"How does the moon cut his hair? Eclipse it.",
"What did one wall say to the other? I'll meet you at the corner.",
"What did the zero say to the eight? That belt looks good on you.",
"A skeleton walks into a bar and says, 'Hey, bartender. I'll have one beer and a mop.'",
"Where do fruits go on vacation? Pear-is!",
"I asked my dog what's two minus two. He said nothing.",
"What did Baby Corn say to Mama Corn? Where's Pop Corn?",
"What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
"What does a sprinter eat before a race? Nothing, they fast!",
"Where do you learn to make a banana split? Sundae school.",
"What has more letters than the alphabet? The post office!",
"Dad, did you get a haircut? No, I got them all cut!",
"What do you call a poor Santa Claus? St. Nickel-less.",
"I got carded at a liquor store, and my Blockbuster card accidentally fell out. The cashier said never mind.",
"Where do boats go when they're sick? To the boat doc.",
"I don't trust those trees. They seem kind of shady.",
"My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right!",
"How do you get a squirrel to like you? Act like a nut.",
"Why don't eggs tell jokes? They'd crack each other up.",
"I don't trust stairs. They're always up to something.",
"What do you call someone with no body and no nose? Nobody knows.",
"Did you hear the rumor about butter? Well, I'm not going to spread it!",
"Why couldn't the bicycle stand up by itself? It was two tired.",
"What did one hat say to the other? Stay here! I'm going on ahead.",
"Why did Billy get fired from the banana factory? He kept throwing away the bent ones."
]