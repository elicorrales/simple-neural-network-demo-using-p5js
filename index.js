const canvasWidth = 800;
const canvasHeight = 500;
const numInputNeurons = 3; //num bdrooms, num bathrooms, square footage
const numHiddenNeurons = 4;
const numOutputNeurons = 2;
const numBedrooms = 3;
const numBaths = 2;
const squareFeet = 1000;
const canvasElem = document.getElementById('myCanvas');
const matrixElem = document.getElementById('myMatrix');
const factorElem = document.getElementById('cellFactor');

var numMatrixRows = 3;
var numMatrixCols = 2;
var matrix = new Matrix(numMatrixRows,numMatrixCols);
var redoMatrixTable = false;

canvasElem.style.width = canvasWidth;
canvasElem.style.height = canvasHeight;

const createNewMatrix = () => {
    matrix = new Matrix(numMatrixRows,numMatrixCols);
    redoMatrixTable = true;
    factorElem.innerHTML = matrix.cellFactor;
}

const doIncRows = () => {
    numMatrixRows++;
    createNewMatrix();
}

const doDecRows = () => {
    if (numMatrixRows>1) { numMatrixRows--; }
    createNewMatrix();
}

const doIncCols = () => {
    numMatrixCols++;
    createNewMatrix();
}

const doDecCols = () => {
    if (numMatrixCols>1) { numMatrixCols--; }
    createNewMatrix();
}

const doRandomize = () => {
    matrix.randomize();
    redoMatrixTable = true;
}

const doIncVal = () => {
    matrix.incVal();
    factorElem.innerHTML = matrix.cellFactor;
}

const doDecVal = () => {
    matrix.decVal();
    factorElem.innerHTML = matrix.cellFactor;
}

const doAddVal = () => {
    matrix.addVal();
    redoMatrixTable = true;
}

const doMultVal = () => {
    matrix.multVal();
    redoMatrixTable = true;
}

function displayMatrix() {
    let html = '';
    for (var r=0;r<matrix.rows;r++) {
        html += '<tr>';
        for (var c=0;c<matrix.cols;c++) {
            html += '<td id="row'+r+'col'+c+'" ><input type="text" value="'+ matrix.matrix[r][c] + '" maxlength="7" size="7"/></td>';
        }
        html += '</tr>';
    };
    matrixElem.innerHTML = html;
    redoMatrixTable = false;
}

var brain = new NeuralNetwork(numInputNeurons, numHiddenNeurons, numOutputNeurons);

function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('myCanvas');
    background(0);
    displayMatrix();
}

function draw() {
    background(0);
    ellipse(width/2,height/2,width,height);
    if (redoMatrixTable) displayMatrix();
}

