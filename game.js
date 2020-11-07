//alert("game code started!");

document.addEventListener("DOMContentLoaded", function(event) {
    visibleCanvas = document.getElementById('game');
    visibleCanvas.style.backgroundColor = "red";
    document.addEventListener("keydown", move);
});

function move(event) {
    switch (event.key) {
        case "ArrowUp":
            visibleCanvas.style.backgroundColor = "blue";
            break;
        case "ArrowDown":
            visibleCanvas.style.backgroundColor = "green";
            break;
    }
}
