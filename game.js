// Copyright (c) 2020 eContriver LLC

var dotX = 0;
var dotY = 0;
var visibleCanvas = null;
var context = null;
var dotImage = null;

document.addEventListener("DOMContentLoaded", function(event) {
    visibleCanvas = document.getElementById('game');
    visibleCanvas.style.backgroundColor = "red";
    document.addEventListener("keydown", move);
    context = visibleCanvas.getContext('2d');
    dotImage = new Image();
    dotImage.src = 'dot.png';
    dotImage.onload = function() {
        context.drawImage(dotImage, dotX, dotY);
    }
});

function move(event) {
    switch (event.key) {
        case "ArrowUp":
            dotY -= 10;
            break;
        case "ArrowDown":
            dotY += 10;
            break;
        case "ArrowLeft":
            dotX -= 10;
            break;
        case "ArrowRight":
            dotX += 10;
            break;
    }
    context.clearRect(0, 0, visibleCanvas.width, visibleCanvas.height);
    context.drawImage(dotImage, dotX, dotY);
    event.preventDefault(); // prevents arrows from scrolling
}
