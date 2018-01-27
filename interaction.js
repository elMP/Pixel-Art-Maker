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

//workarond because window.getSelection().toString() doesn't work correctly in Firefox
function getSelectionText(element) {
    if (window.getSelection) {
        try {
            return element.value.substring(element.selectionStart, element.selectionEnd);            
        } catch (e) {
            console.log('Cant get selection text')
        }
    } 
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

function numbersLessThen100Allowed(e) {
    //if special key down allow character input
    if (e.charCode < 32)
        return;

    //if already entered number contains less then two digits
    //or selection in input exists
    //and if new character is between 0 and 9
    //then allow character input
    if ( (this.value.length < 2 || getSelectionText(e.target) )
        && e.charCode >= 48 && e.charCode <= 57)
        return;
    
    //otherwise don't allow character input
    return false;
}

window.onload = createNewCanvas;
createGrid.onclick = createNewCanvas;
height.onkeypress = numbersLessThen100Allowed;
width.onkeypress = numbersLessThen100Allowed;