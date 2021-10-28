var img = document.createElement('img');
img.setAttribute('src', 'https://live.staticflickr.com/65535/51064634808_172b09251b_k.jpg')

img.addEventListener('load', function() {
    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches()
    document.body.style.color = [color-value];
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