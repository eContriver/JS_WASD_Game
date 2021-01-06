// Copyright (c) 2020 eContriver LLC

var dotXWorld = 0;
var dotYWorld = 0;
var visibleCanvas = null;
var context = null;
var dotImage = null;
var minYWorld = 0;
var maxYWorld = 640 * 80;
var minXWorld = 0;
var maxXWorld = 1040 * 80;

// document.addEventListener("DOMContentLoaded" - the whole document (HTML) has been loaded.
// window.addEventListener("load" - the whole document and its resources (e.g. images, iframes, scripts) have been loaded.
//   i.e. window.onload
document.addEventListener("DOMContentLoaded", function(event) {
    loadScript("seedrandom.js");
    visibleCanvas = document.getElementById('game');
    visibleCanvas.style.backgroundColor = "lightgray";
    dotYWorld = (minYWorld + 320);
    dotXWorld = (minXWorld + 520);
    // dotYWorld = (maxYWorld - 320);
    // dotXWorld = (maxXWorld - 520);
    document.addEventListener("keydown", move);
    context = visibleCanvas.getContext('2d');
    dotImage = new Image();
    dotImage.src = 'dot.png';
    dotImage.onload = function() {
        context.drawImage(dotImage, dotXWorld, dotYWorld);
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
    var movementAmount = 10;
    switch (event.key) {
        case "w":
            dotYWorld -= movementAmount;
            break;
        case "s":
            dotYWorld += movementAmount;
            break;
        case "a":
            dotXWorld -= movementAmount;
            break;
        case "d":
            dotXWorld += movementAmount;
            break;
    }
    dotYWorld = (dotYWorld + dotImage.height > maxYWorld) ? maxYWorld - dotImage.height : dotYWorld;
    dotYWorld = (dotYWorld < minYWorld) ? minYWorld : dotYWorld;
    dotXWorld = (dotXWorld + dotImage.width > maxXWorld) ? maxXWorld - dotImage.width : dotXWorld;
    dotXWorld = (dotXWorld < minXWorld) ? minXWorld : dotXWorld;
    var canvasYWorld = dotYWorld - (visibleCanvas.height / 2);
    var canvasXWorld = dotXWorld - (visibleCanvas.width / 2);
    var dotXCanvas = visibleCanvas.width / 2;
    var dotYCanvas = visibleCanvas.height / 2;
    if (canvasYWorld < minYWorld) {
        dotYCanvas += (canvasYWorld - minYWorld);
        canvasYWorld = minYWorld;
    }
    if ((canvasYWorld + visibleCanvas.height) > maxYWorld) {
        dotYCanvas += visibleCanvas.height - (maxYWorld - canvasYWorld);
        canvasYWorld = maxYWorld - visibleCanvas.height;
    }
    if (canvasXWorld < minXWorld) {
        dotXCanvas += (canvasXWorld - minXWorld);
        canvasXWorld = minXWorld;
    }
    if ((canvasXWorld + visibleCanvas.width) > maxXWorld) {
        dotXCanvas += visibleCanvas.width - (maxXWorld - canvasXWorld);
        canvasXWorld = maxXWorld - visibleCanvas.width;
    }
    generateRandom(canvasXWorld, canvasXWorld + visibleCanvas.width, canvasYWorld, canvasYWorld + visibleCanvas.height);
    console.log("Moving to: " + dotXWorld + "," + dotYWorld);
    context.drawImage(dotImage, dotXCanvas, dotYCanvas);
    event.preventDefault(); // prevents arrows from scrolling
}

function generateRandom(xStart, xEnd, yStart, yEnd) {
    // console.time(generateRandom.name)
    for (var x = xStart; x < xEnd; x += 1) {
        for (var y = yStart; y < yEnd; y += 1) {
            var scaleFactor = 80; 
            if ((x % scaleFactor) != 0) continue;
            if ((y % scaleFactor) != 0) continue;
            // Implementation 1: using ANSI C rand (42ms for 600,000 and not very random)
            // var rand = PRNG(x << 16 + y) % 256; // we use modulo 256 because 255 would produe a 0 for 255 (i.e. 0-254), we want 0-255

            // Implementation 2: using seedrandom.js (3100ms for 600,000 and very random)
            Math.seedrandom(x + ',' + y);
            var rand = (Math.random() * Number.MAX_SAFE_INTEGER) >>> 0; // shift by 0 truncates decimal

            if ((rand % 10) > 1) continue;
            var r = ((rand >>> 0) % 2) * 255;
            var g = ((rand >>> 1) % 2) * 255;
            var b = ((rand >>> 2) % 2) * 255;
            var size = (scaleFactor * (((rand >>> 3) % 4) + 1)) / 4;
            var a = 255;
            colorPixel2(x-xStart, y-yStart, size, r, g, b, a);
        }
    }
    // console.timeEnd(generateRandom.name)
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
