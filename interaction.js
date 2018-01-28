const body = document.getElementsByTagName('body')[0];
let mousedown = 0; //what button is down
let grid = document.getElementById('grid');
let color = document.getElementById('color');
let backgroundColor = document.getElementById('backgroundColor');
let createGrid = document.getElementById('createGrid');
let height = document.getElementById('height');
let width = document.getElementById('width');

//draw table
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
    grid.style.backgroundColor = backgroundColor.value;
}

//use height, width and background colour to draw canvas
function createNewCanvas() {
    let h = height.value;
    let w = width.value;
    setBackgroundColor();
    makeGrid(h, w);
}

function paint(element) {
    if (mousedown == 1)
        element.style.backgroundColor = color.value;
    else if (mousedown == 3)
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

//add or remove warning about allowed height and width
function addOrRemoveWarning(action) {
    let tips = document.getElementsByClassName('tip');
    for (let i = 0; i < tips.length; ++i)
        if (action == 'add')
            tips[i].classList.add('warning');
        else if (action == 'remove')
            tips[i].classList.remove('warning');
}

//check that height or width has allowed value
function numbersLessThen100Allowed(e) {
    addOrRemoveWarning('remove');

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
    addOrRemoveWarning('add');
    return false;
}

//event handlers
grid.onmousedown = function(e) {
    e.preventDefault();

    let element = e.target;
    mousedown = e.which;
    paint(element);
}

grid.onmouseover= function(e) {
    if (mousedown && e.target.tagName == 'TD') {
        paint(e.target);
    }
}

//we use right button to erasing
grid.oncontextmenu = function(e) {
    e.preventDefault();
}

backgroundColor.onchange = function(e) {
    setBackgroundColor();
}

body.onmouseup = function(e) {
    mousedown = 0;
}

window.onload = createNewCanvas;
createGrid.onclick = createNewCanvas;
height.onkeypress = numbersLessThen100Allowed;
width.onkeypress = numbersLessThen100Allowed;