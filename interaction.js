const BODY = document.getElementsByTagName('body')[0];
let MOUSEDOWN = 0; //what button is down

function makeGrid(height, width) {
    //delete prevous grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    //create new grid
    for (let i = 0; i < height; ++i) {
        let newTr = document.createElement('tr');
        grid.appendChild(newTr);
        for (let j = 0; j < width; ++j) {
            let newTd = document.createElement('td');
            newTr.appendChild(newTd);
        }
    }    
}

function setBackgroundColor() {
    grid.style.backgroundColor = document.getElementById('backgroundColor').value;
}

function createNewCanvas() {
    let h = document.getElementById('height').value;
    let w = document.getElementById('width').value;
    setBackgroundColor();
    makeGrid(h, w);
}

function paint(element) {
    if (MOUSEDOWN == 1)
        element.style.backgroundColor = document.getElementById('color').value;
    else if (MOUSEDOWN == 3)
        element.style.backgroundColor = '';
}

grid.onmousedown = function(e) {
    e.preventDefault();

    let element = e.target;
    MOUSEDOWN = e.which;
    paint(element);
}

grid.onmouseover= function(e) {
    if (MOUSEDOWN && e.target.tagName == 'TD') {
        paint(e.target);
    }
}

grid.oncontextmenu = function(e) {
    e.preventDefault();
}

backgroundColor.onchange = function(e) {
    setBackgroundColor();
}

BODY.onmouseup = function(e) {
    MOUSEDOWN = 0;
}

window.onload = createNewCanvas;
createGrid.onclick = createNewCanvas;




