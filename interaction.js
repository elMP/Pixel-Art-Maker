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

window.onload = createNewCanvas;
createGrid.onclick = createNewCanvas;

let backgroundColor = document.getElementById('backgroundColor');
backgroundColor.onchange = function(e) {
    //alert(document.getElementById('backgroundColor').value);
    setBackgroundColor();
}

grid.onclick = function(e) {
    e.stopPropagation(); // останавливаем всплытие
    let element = e.target;
    element.style.backgroundColor = document.getElementById('color').value;
}
