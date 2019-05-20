const canvasWidth = 800;
const canvasHeight = 500;
const numInputNeurons = 3; //num bdrooms, num bathrooms, square footage
const numHiddenNeurons = 4;
const numOutputNeurons = 2;
const numBedrooms = 3;
const numBaths = 2;
const squareFeet = 1000;
const messagesElem = document.getElementById('messages');
const canvasElem = document.getElementById('myCanvas');
const matrix1Elem = document.getElementById('myMatrix');
const dotMatrixElem = document.getElementById('myDotMatrix');
const transposedMatrixElem = document.getElementById('myTransposedMatrix');
const matrix2Elem = document.getElementById('myMatrix2');
const mainFactorElem = document.getElementById('mainFactor');
const factor1Elem = document.getElementById('cellFactor1');
const factor2Elem = document.getElementById('cellFactor2');
const matrix1SelectElem = document.getElementById('selectMatrix1');
const matrix2SelectElem = document.getElementById('selectMatrix2');

var numMatrixRows = 3;
var numMatrixCols = 2;
var matrix1 = new Matrix(numMatrixRows,numMatrixCols,'Matrix1');
var matrix2 = new Matrix(numMatrixRows,numMatrixCols,'Matrix2');
var redoMatrixTable = false;

canvasElem.style.width = canvasWidth;
canvasElem.style.height = canvasHeight;

var matrix1Selected = false;
var matrix2Selected = false;

const showMessage = (type, message) => {
    messagesElem.innerHTML = message;
    messagesElem.className = 'alert alert-' + type;
}

const clearMessage = () => {
    messagesElem.innerHTML = '';
    messagesElem.className = '';
}

const createNewMatrix = () => {
    if (matrix1Selected) {
        matrix1 = new Matrix(numMatrixRows,numMatrixCols,'Matrix1');
        factor1Elem.innerHTML = parseFloat(matrix1.cellFactor).toFixed(2);
    }
    if (matrix2Selected) {
        matrix2 = new Matrix(numMatrixRows,numMatrixCols,'Matrix2');
        factor2Elem.innerHTML = parseFloat(matrix2.cellFactor).toFixed(2);
    }
    redoMatrixTable = true;
}

const doOnChangeMainFactor = () => {
    if (matrix1Selected) {
        matrix1.cellFactor = mainFactorElem.value;
        factor1Elem.innerHTML = parseFloat(mainFactorElem.value).toFixed(2);
    }
    if (matrix2Selected) {
        matrix2.cellFactor = mainFactorElem.value;
        factor2Elem.innerHTML = parseFloat(mainFactorElem.value).toFixed(2);
    }
}

const doSetFactors = () => {
    matrix1.cellFactor = mainFactorElem.value;
    factor1Elem.innerHTML = parseFloat(mainFactorElem.value).toFixed(2);
    matrix2.cellFactor = mainFactorElem.value;
    factor2Elem.innerHTML = parseFloat(mainFactorElem.value).toFixed(2);
}

const doIncRows = () => {
    clearMessage();
    numMatrixRows++;
    if (matrix1Selected) {
        createNewMatrix();
    }
    if (matrix2Selected) {
        createNewMatrix();
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
}

const doDecRows = () => {
    clearMessage();
    if (numMatrixRows>1) { numMatrixRows--; }
    if (matrix1Selected) {
        createNewMatrix();
    }
    if (matrix2Selected) {
        createNewMatrix();
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
}

const doIncCols = () => {
    clearMessage();
    numMatrixCols++;
    if (matrix1Selected) {
        createNewMatrix();
    }
    if (matrix2Selected) {
        createNewMatrix();
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
}

const doDecCols = () => {
    clearMessage();
    if (numMatrixCols>1) { numMatrixCols--; }
    if (matrix1Selected) {
        createNewMatrix();
    }
    if (matrix2Selected) {
        createNewMatrix();
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
}

const doIncVal = () => {
    clearMessage();
    if (matrix1Selected) {
        matrix1.incVal();
        factor1Elem.innerHTML = parseFloat(matrix1.cellFactor).toFixed(2);
    }
    if (matrix2Selected) {
        matrix2.incVal();
        factor2Elem.innerHTML = parseFloat(matrix2.cellFactor).toFixed(2);
    } 
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
}

const doDecVal = () => {
    clearMessage();
    if (matrix1Selected) {
        matrix1.decVal();
        factor1Elem.innerHTML = parseFloat(matrix1.cellFactor).toFixed(2);
    }
    if (matrix2Selected) {
        matrix2.decVal();
        factor2Elem.innerHTML = parseFloat(matrix2.cellFactor).toFixed(2);
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
}

const doAddVal = () => {
    clearMessage();
    if (matrix1Selected) {
        matrix1.addVal();
    }
    if (matrix2Selected) {
        matrix2.addVal();
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
    redoMatrixTable = true;
}

const doMultVal = () => {
    clearMessage();
    if (matrix1Selected) {
        if (!matrix1.multVal()) {
            showMessage('danger','Matrix Sizes Dont Align'); 
        }
    }
    if (matrix2Selected) {
        if (!matrix2.multVal()) {
            showMessage('danger','Matrix Sizes Dont Align'); 
        }
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
    redoMatrixTable = true;
}

const doRandomize = () => {
    clearMessage();
    if (matrix1Selected) {
        matrix1.randomize();
        factor1Elem.innerHTML = matrix1.cellFactor;
    }
    if (matrix2Selected) {
        matrix2.randomize();
        factor2Elem.innerHTML = matrix2.cellFactor;
    }
    if (!matrix1Selected && !matrix2Selected) {
        showMessage('danger','No Matrix Selected');
    }
    redoMatrixTable = true;
}

const doSelectMatrix1 = () => {
    matrix1Selected = matrix1Selected?false:true;
    if (matrix1Selected) {
        matrix1SelectElem.className = 'btn btn-danger btn-block';
        matrix1SelectElem.innerHTML = 'Selected';
    } else {
        matrix1SelectElem.className = 'btn btn-secondary btn-block';
        matrix1SelectElem.innerHTML = 'Select';
    }
    clearMessage();
}

const doSelectMatrix2 = () => {
    matrix2Selected = matrix2Selected?false:true;
    if (matrix2Selected) {
        matrix2SelectElem.className = 'btn btn-danger btn-block';
        matrix2SelectElem.innerHTML = 'Selected';
    } else {
        matrix2SelectElem.className = 'btn btn-secondary btn-block';
        matrix2SelectElem.innerHTML = 'Select';
    }
    clearMessage();
}

const doAddByMatrix2 = () => {
    clearMessage();
    if (!matrix1.add(matrix2)) {
        showMessage('danger','Matrix Sizes Dont Align'); 
    }
    redoMatrixTable = true;
}

const doDotProdByMatrix2 = () => {
    clearMessage();
    if (!matrix1.mult(matrix2,'dot')) {
        showMessage('danger','Matrix Sizes Dont Align'); 
    }
    redoMatrixTable = true;
}

const doTransposeMatrix1 = () => {
    clearMessage();
    matrix1.transpose();
    redoMatrixTable = true;
}

const doAddByMatrix1 = () => {
    clearMessage();
    if (!matrix2.add(matrix1)) {
        showMessage('danger','Matrix Sizes Dont Align'); 
    }
    redoMatrixTable = true;
}

function changeCellValue(name,row,col,obj) {
    if (name === matrix1.name) {
        matrix1.data._data[row][col] = obj.value;
    } else if (name === matrix2.name) {
        matrix2.data._data[row][col] = obj.value;
    }
}

function displayMatrix(whichMatrixElem, whichMatrix) {
    let html = '';
    for (let r=0;r<whichMatrix.rows;r++) {
        html += '<tr>';
        for (let c=0;c<whichMatrix.cols;c++) {
            //html += '<td id="row'+r+'col'+c+'" ><input id="row'+r+'col'+c+'" type="text" value="'+ parseFloat(whichMatrix.data.get([r,c])).toFixed(2) + '" maxlength="7" size="7" onchange="changeCellValue('+whichMatrixElem+','+r+','+c+')"/></td>';
            html += '<td><input id="row'+r+'col'+c+'" type="text" value="'+ parseFloat(whichMatrix.data.get([r,c])).toFixed(2) + '" maxlength="7" size="7" onchange="changeCellValue(\''+whichMatrix.name+'\','+r+','+c+',this)"/></td>';
        }
        html += '</tr>';
    };
    whichMatrixElem.innerHTML = html;
    redoMatrixTable = false;
}

let brain = new NeuralNetwork(numInputNeurons, numHiddenNeurons, numOutputNeurons);

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('myCanvas');
    background(0);
    displayMatrix(matrix1Elem, matrix1);
    displayMatrix(matrix2Elem, matrix2);
}

function draw() {
    background(0);
    ellipse(width/2,height/2,width,height);
    if (redoMatrixTable) { 
        displayMatrix(matrix1Elem, matrix1);
        if (matrix1.dotMatrix !== undefined) {
             displayMatrix(dotMatrixElem, matrix1.dotMatrix);
        }
        if (matrix1.transposed !== undefined) { displayMatrix(transposedMatrixElem, matrix1.transposed); }
        displayMatrix(matrix2Elem, matrix2);
    }
}

