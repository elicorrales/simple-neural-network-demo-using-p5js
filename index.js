const numInputNeurons = 3; //num bdrooms, num bathrooms, square footage
const numHiddenNeurons = 4;
const numOutputNeurons = 2;
const numBedrooms = 3;
const numBaths = 2;
const squareFeet = 1000;
const canvasElem = document.getElementById('myCanvas');
const matrixElem = document.getElementById('myMatrix');

var matrix = new Matrix(numMatrixRows,numMatrixCols);
var numMatrixRows = 3;
var numMatrixCols = 2;


const createNewMatrix = () => {
    matrix = new Matrix(numMatrixRows,numMatrixCols);
}

const doIncRows = () => {
    numMatrixRows++;
    createNewMatrix();
}

const doDecRows = () => {
    if (numMatrixRows>1) numMatrixRows--;
    createNewMatrix();
}

const doIncCols = () => {
    numMatrixCols++;
    createNewMatrix();
}

const doDecCols = () => {
    if (numMatrixCols>1) numMatrixCols--;
    createNewMatrix();
}

const doRandomize = () => {
    matrix.randomize();
}

function displayMatrix() {
    let html = '';
    for (var r=0;r<matrix.rows;r++) {
        html += '<tr>';
        for (var c=0;c<matrix.cols;c++) {
            html += '<td>' + matrix.matrix[r][c] + '</td>';
        }
        html += '</tr>';
    };
    matrixElem.innerHTML = html;
}

var brain = new NeuralNetwork(numInputNeurons, numHiddenNeurons, numOutputNeurons);

function setup() {
    var canvas = createCanvas(700, 400);
    canvasElem.style.width = ''
    canvas.parent('myCanvas');
    background(0);
    displayMatrix();
}

function draw() {
    background(0);
    ellipse(width/2,height/2,width,height);
    displayMatrix();
}

displayMatrix();
