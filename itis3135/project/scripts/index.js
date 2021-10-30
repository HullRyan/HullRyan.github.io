var userid = "192658515@N08";
var api_key = "151dd3c0755a192df5e460420b7a8521";

$(window).on('load', function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});

var img = document.createElement('img');
img.setAttribute('src', 'https://live.staticflickr.com/65535/51064634808_172b09251b_k.jpg');
img.src += '?' + new Date().getTime();
img.setAttribute('crossOrigin', '');

img.addEventListener('load', function() {
    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches()
    console.log(swatches['Vibrant']);
    document.body.style.color = swatches['Vibrant'].getHex();
    document.getElementById("gallery-button").style.backgroundColor = swatches['Vibrant'].getHex();
    for (var swatch in swatches)
        if (swatches.hasOwnProperty(swatch) && swatches[swatch])
            console.log(swatch, swatches[swatch].getHex())

    /*
     * Results into:
     * Vibrant #7a4426
     * Muted #7b9eae
     * DarkVibrant #348945
     * DarkMuted #141414
     * LightVibrant #f3ccb4
     */
});

