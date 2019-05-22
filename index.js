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
var redoNeuralNetwork = false;

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

