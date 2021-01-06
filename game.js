// Copyright (c) 2020 eContriver LLC

var dotX = 0;
var dotY = 0;
var visibleCanvas = null;
var context = null;
var dotImage = null;

// document.addEventListener("DOMContentLoaded" - the whole document (HTML) has been loaded.
// window.addEventListener("load" - the whole document and its resources (e.g. images, iframes, scripts) have been loaded.
//   i.e. window.onload
document.addEventListener("DOMContentLoaded", function(event) {
    loadScript("seedRandom.js");
    visibleCanvas = document.getElementById('game');
    visibleCanvas.style.backgroundColor = "lightgray";
    document.addEventListener("keydown", move);
    context = visibleCanvas.getContext('2d');
    dotImage = new Image();
    dotImage.src = 'dot.png';
    dotImage.onload = function() {
        context.drawImage(dotImage, dotX, dotY);
    }
});

function loadScript(file) {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", file);
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
}

function move(event) {
    context.clearRect(0, 0, visibleCanvas.width, visibleCanvas.height);
    switch (event.key) {
        case "w":
            dotY -= 10;
            break;
        case "s":
            dotY += 10;
            break;
        case "a":
            dotX -= 10;
            break;
        case "d":
            dotX += 10;
            break;
    }
    generateRandom();
    context.drawImage(dotImage, dotX, dotY);
    event.preventDefault(); // prevents arrows from scrolling
}

function generateRandom() {
    console.time(generateRandom.name)
    var scaleFactor = 80; 
    for (var x = 0; x < visibleCanvas.width; x += scaleFactor) {
        for (var y = 0; y < visibleCanvas.height; y += scaleFactor) {
            // Implementation 1: using ANSI C rand (42ms for 600,000 and not very random)
            // var rand = PRNG(x << 16 + y) % 255;

            // Implementation 2: using seedrandom.js (3100ms for 600,000 and very random)
            Math.seedrandom(x + ',' + y);
            var rand = (Math.random() * Number.MAX_SAFE_INTEGER) >>> 0; // shift by 0 truncates decimal

            // if ((rand % 255) < 240) continue;
            var r = (rand >>> 8) % 255;
            var g = (rand >>> 16) % 255;
            var b = (rand >>> 24) % 255;
            var size = (rand >>> 3) % scaleFactor;
            var a = 255;
            colorPixel2(x, y, size, r, g, b, a);
        }
    }
    console.timeEnd(generateRandom.name)
}

function PRNG(seed) { 
    //console.log("Seed: '" + seed + "'");
    var a = 1103515245;
    var c = 12345;
    var m = 2**31;
    var random = (a * seed + c) % m;
    // console.log("Random: '" + random + "'");
    return random;
}

// Took over 300 ms to generate for 1040-40 x 640-40
function colorPixel2(x, y, size, r, g, b, a) {
    context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    context.fillRect(x, y, size, size);
}

/* Took over 2 seconds to generate for 1040-40 x 640-40
function colorPixel(x, y) {
    var id = context.createImageData(1,1);
    var d = id.data;
    d[0]   = 255; // r
    d[1]   = 0; // g
    d[2]   = 0; // b
    d[3]   = 255; // a
    context.putImageData( id, x, y );  
}//*/
