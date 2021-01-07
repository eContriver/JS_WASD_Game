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

const ScriptAssets = Object.freeze({
    'seedrandom': 'seedrandom.js'
});
const ImageAssets = Object.freeze({
    'dot': 'dot.png'
});

class AssetMgr {
    constructor() {
        this.imagesPending = [];
        this.imagesLoaded = [];
        this.imageObjects = new Map();
        this.imageCallbacks = new Map();
        this.scriptsPending = [];
        this.scriptsLoaded = [];
        this.scriptCallbacks = new Map();
    }
    addScripts(scripts) {
        scripts.forEach((function(script){
            if (this.scriptsLoaded.includes(script)) return;
            if (this.scriptsPending.includes(script)) return;
            this.scriptsPending.push(script);
            loadScript(script, (function() {
                const index = this.scriptsPending.indexOf(script);
                this.scriptsLoaded.push(script); // let it exist in both briefly
                this.scriptsPending.splice(index, 1); // remove it
                this.runScriptCallbacks(script); // run callbacks as they were
            }).bind(this));
        }).bind(this));
    }
    onScriptLoad(script, func) {
        this.scriptCallbacks.set(script, func);
        this.runScriptCallbacks(script); // run callbacks now in case it was loaded
    }
    runScriptCallbacks(script) {
        if (this.scriptCallbacks.has(script)) {
            let func = this.scriptCallbacks.get(script); // and run it
            func(script);
        }
    }
    addImages(srcs) {
        srcs.forEach(function(src){
            if (this.imagesLoaded.includes(src)) return;
            if (this.imagesPending.includes(src)) return;
            this.imagesPending.push(src);
            this.loadImage(src, function() {
                const index = this.imagesPending.indexOf(src);
                this.imagesLoaded.push(src); // let it exist in both briefly
                this.imagesPending.splice(index, 1); // remove it
                this.runImageCallbacks(src);
            }.bind(this));
        }.bind(this));
    }
    onImageLoad(src, func) {
        this.imageCallbacks.set(src, func);
        this.runImageCallbacks(src);
    }
    runImageCallbacks(src) {
        let func = this.imageCallbacks.get(src); // and run it
        func(this.imageObjects.get(src));
    }
    loadImage(image, func) {
        let loader = new Image();
        loader.src = image;
        loader.onload = func;
        this.imageObjects.set(image, loader);
    }
}

function sleep(durationMs){
    var now = new Date().getTime();
    while(new Date().getTime() < now + durationMs){ /* noop */ } 
}

function loadScript(file, func) {
    sleep(2000);
    let element = document.createElement('script');
    element.type = 'text/javascript';
    element.src = file;
    element.addEventListener('load', func);
    document.getElementsByTagName("head")[0].appendChild(element);
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    midPoint(b) {
        return new Point((b.x - this.x) / 2, (b.y - this.y) / 2);
    }
}

class Character {
    constructor(location) {
        this.location = location;
        this.image = null;
    }
}

class World {
    constructor(max) {
        this.max = max;
        this.min = new Point(0, 0);
    }

    center() {
        return this.min.midPoint(this.max);
    }
}

class Game {
    constructor() {
        // only add member variables if the game owns the object
    }
    run(assetMgr) {
        let world = new World(new Point(640 * 80, 1040 * 80));
        visibleCanvas = document.getElementById('game');
        visibleCanvas.style.backgroundColor = "lightgray";
        // Set character starting location 
        let dot = new Character(world.center()); // middle
        //let dot = new Character(world.minX + 520, world.minY + 320); // min boundary
        //let dot = new Character(world.maxX - 520, world.maxY - 320); // max boundary
        // TODO: Move and draw should be decoupled
        assetMgr.onScriptLoad(ScriptAssets.seedrandom, function(script) {
            let keyHandler = function(event) {
                move(event, assetMgr);
            };
            document.addEventListener("keydown", keyHandler); // TODO: move needs to get dot, 
        });
        // do we bind and add move to Char or how to add key bindign, that moves char, from hi level
        context = visibleCanvas.getContext('2d');
        // TODO: Need assetMgr with after load...
        assetMgr.onImageLoad(ImageAssets.dot, function(image) {
            dot.image = image;
            context.drawImage(dot.image, dot.location.x, dot.location.y);
        });
    }
}


function move(event, assetMgr) {
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
    let dotImage = assetMgr.imageObjects.get(ImageAssets.dot);
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
    //event.preventDefault(); // prevents (F5 and) arrows from scrolling (with wasd we don't need this now)
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
            colorPixel(x-xStart, y-yStart, size, r, g, b, a);
        }
    }
    // console.timeEnd(generateRandom.name)
}

// function PRNG(seed) { 
//     //console.log("Seed: '" + seed + "'");
//     var a = 1103515245;
//     var c = 12345;
//     var m = 2**31;
//     var random = (a * seed + c) % m;
//     // console.log("Random: '" + random + "'");
//     return random;
// }

// Took over 300 ms to generate for 1040-40 x 640-40
function colorPixel(x, y, size, r, g, b, a) {
    context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    context.fillRect(x, y, size, size);
}

/* Took over 2 seconds to generate for 1040-40 x 640-40
function colorPixel2(x, y) {
    var id = context.createImageData(1,1);
    var d = id.data;
    d[0]   = 255; // r
    d[1]   = 0; // g
    d[2]   = 0; // b
    d[3]   = 255; // a
    context.putImageData( id, x, y );  
}//*/

function main() {
    let assetMgr = new AssetMgr();
    assetMgr.addScripts(Object.values(ScriptAssets));
    assetMgr.addImages(Object.values(ImageAssets));
    // document.addEventListener("DOMContentLoaded" - the whole document (HTML) has been loaded.
    // window.addEventListener("load" - the whole document and its resources (e.g. images, iframes, scripts) have been loaded.
    //   i.e. window.onload
    document.addEventListener("DOMContentLoaded", function(event) {
        let game = new Game();
        game.run(assetMgr);
    });
}

main();
