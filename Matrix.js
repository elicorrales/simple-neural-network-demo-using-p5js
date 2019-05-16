function Matrix(rows,cols) {

    this.rows = rows;
    this.cols = cols;
    this.cellFactor = 0;
    this.matrix = [];
    for (var r=0;r<this.rows;r++) {
        this.matrix[r] = [];
        for (var c=0;c<this.cols;c++) {
            this.matrix[r][c] = 0;
        }
    };

}

Matrix.prototype.add = function(n) {
    for (var r=0;r<this.rows;r++) {
        for (var c=0;c<this.cols;c++) {
            this.matrix[r][c] += n;
        }
    };
}

Matrix.prototype.mult = function(n) {
    for (var r=0;r<this.rows;r++) {
        for (var c=0;c<this.cols;c++) {
            this.matrix[r][c] *= n;
        }
    };
}

Matrix.prototype.randomize = function(n) {
    for (var r=0;r<this.rows;r++) {
        for (var c=0;c<this.cols;c++) {
            this.matrix[r][c] = random(-1,1).toFixed(2);
        }
    };
}

Matrix.prototype.incVal = function() {
    let value = parseFloat(this.cellFactor);
    //if (value < 0.1) value += parseFloat(0.01);
    //else if (value < 1) value += parseFloat(0.1);
    if (value < 0.1) value += 0.01;
    else if (value < 1) value += 0.1;
    else if (value < 10) value += 0.5;
    else if (value < 50) value += 1;
    else if (value < 100) value += 5;
    else if (value < 500) value += 10;
    else if (value < 1000) value += 50;
    else value += 100;
    //this.cellFactor = parseFloat(value).toFixed(2);
    this.cellFactor = value.toFixed(2);
};

Matrix.prototype.decVal = function() {
    let value = parseFloat(this.cellFactor);
    if (Math.abs(value) < 0.1) value -= 0.01;
    else if (Math.abs(value) < 1) value -= 0.1;
    else if (Math.abs(value) < 10) value -= 0.5;
    else if (Math.abs(value) < 50) value -= 1;
    else if (Math.abs(value) < 100) value -= 5;
    else if (Math.abs(value) < 500) value -= 10;
    else if (Math.abs(value) < 1000) value -= 50;
    else value -= 100;
    //this.cellFactor = parseFloat(value).toFixed(2);
    this.cellFactor = value.toFixed(2);
};


Matrix.prototype.addVal = function(n) {
    for (var r=0;r<this.rows;r++) {
        for (var c=0;c<this.cols;c++) {
            this.matrix[r][c] += parseFloat(this.cellFactor);
            var val = parseFloat(this.matrix[r][c]);
            this.matrix[r][c] = parseFloat(val.toFixed(2));
        }
    };
}

Matrix.prototype.multVal = function(n) {
    for (var r=0;r<this.rows;r++) {
        for (var c=0;c<this.cols;c++) {
            this.matrix[r][c] *= parseFloat(this.cellFactor);
            var val = parseFloat(this.matrix[r][c]);
            this.matrix[r][c] = parseFloat(val.toFixed(2));
        }
    };
}