class Matrix {

    constructor(rows,cols,name) {
        this.name = name;
        this.rows = rows;
        this.cols = cols;
        this.cellFactor = 0;
        this.matrix = [];
        this.dotMatrix;
        for (let r=0;r<this.rows;r++) {
            this.matrix[r] = [];
            for (let c=0;c<this.cols;c++) {
                this.matrix[r][c] = 0;
            }
        }
    }

    add(n) {
        if (n instanceof Matrix && n.rows === this.rows && n.cols === this.cols) { 
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    this.matrix[r][c] += parseFloat(n.matrix[r][c]);
                }
            }

        } else if (n instanceof Matrix) { 
            return false;
        } else if (n !== undefined) {
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    let v = parseFloat(n);
                    this.matrix[r][c] += parseFloat(v);
                }
            }
        } else {
            return false;
        }
        return true;
    }

    mult(n, type) {
        if (n instanceof Matrix && type === 'hadamard' && n.rows === this.rows && n.cols === this.cols) { 
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    this.matrix[r][c] *= parseFloat(n.matrix[r][c]);
                }
            }

        } else if (n instanceof Matrix && type === 'dot' && this.cols === n.rows) { 
            this.dotMatrix = new Matrix(n.rows,this.cols,'dot'+this.name);

        } else if (n instanceof Matrix) { 
            return false;
        } else if (n !== undefined) {
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    let v = parseFloat(n);
                    this.matrix[r][c] *= parseFloat(v);
                }
            }
        } else {
            return false;
        }
        return true;
    }

    randomize() {
        for (let r=0;r<this.rows;r++) {
            for (let c=0;c<this.cols;c++) {
                this.matrix[r][c] = random(-1,1);
            }
        }
    }

    incVal() {
        let value = parseFloat(this.cellFactor);
        //if (value < 0.1) value += parseFloat(0.01);
        //else if (value < 1) value += parseFloat(0.1);
        if (Math.abs(value) < 0.1) value += 0.01;
        else if (Math.abs(value) < 1) value += 0.1;
        else if (Math.abs(value) < 10) value += 0.5;
        else if (Math.abs(value) < 50) value += 1;
        else if (Math.abs(value) < 100) value += 5;
        else if (Math.abs(value) < 500) value += 10;
        else if (Math.abs(value) < 1000) value += 50;
        else value += 100;
        this.cellFactor = value.toFixed(2);
    }

    decVal() {
        let value = parseFloat(this.cellFactor);
        if (Math.abs(value) < 0.1) value -= 0.01;
        else if (Math.abs(value) < 1) value -= 0.1;
        else if (Math.abs(value) < 10) value -= 0.5;
        else if (Math.abs(value) < 50) value -= 1;
        else if (Math.abs(value) < 100) value -= 5;
        else if (Math.abs(value) < 500) value -= 10;
        else value -= 100;
        this.cellFactor = value.toFixed(2);
    }


    addVal() {
        this.add(this.cellFactor);
    }

    multVal() {
        return this.mult(this.cellFactor);
    }


}