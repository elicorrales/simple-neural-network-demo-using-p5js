function Matrix(rows,cols) {

    this.rows = rows;
    this.cols = cols;
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
            this.matrix[r][c] = random(-1,1);
        }
    };
}