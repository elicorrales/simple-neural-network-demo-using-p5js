class Matrix {

    constructor(rows,cols,name) {
        this.name = name;
        this.rows = rows;
        this.cols = cols;
        this.cellFactor = 0;
        this.temp = [];
        this.dotMatrix;
        this.transposed;
        for (let r=0;r<this.rows;r++) {
            this.temp[r] = [];
            for (let c=0;c<this.cols;c++) {
                this.temp[r].push(0);
            }
        }
        this.data = math.matrix(this.temp);
    }

    add(n) {
        if (n instanceof Matrix && n.rows === this.rows && n.cols === this.cols) { 
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    this.data._data[r][c] += parseFloat(n.data._data[r][c]);
                }
            }

        } else if (n instanceof Matrix) { 
            return false;
        } else if (n !== undefined) {
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    let v = parseFloat(n).toFixed(2);
                    let d = parseFloat(this.data._data[r][c]).toFixed(2);
                    this.data._data[r][c] = parseFloat(v + d).toFixed(2);
                }
            }
        } else {
            return false;
        }
        return true;
    }

    createMatrixCopy(m) {
        var n = [];
        for (let i=0;i<m.length;i++) {
            var row = [];
            for (let j=0;j<m[0].length;j++) {
                row.push(m[i][j]);
            }
            n.push(row);
        }

        return n;
    }

    mult(n, type) {
        if (type === 'dot' && n instanceof Matrix && this.rows === n.cols && this.cols === n.rows) {
            let temp = math.multiply(this.data , n.data);
            this.dotMatrix = new Matrix(temp.size()[0],temp.size()[1],'myDotMatrix');
            this.dotMatrix.data = temp;
            return true;
        } else if (n instanceof Matrix) {
            return false;
        } else if(n !== undefined) {
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    let v = parseFloat(n).toFixed(2);
                    let d = parseFloat(this.data._data[r][c]).toFixed(2);
                    this.data._data[r][c] = parseFloat(v*d).toFixed(2);
                }
            }
            return true;
        }
        return false;
    }

    transpose() {
        let data = Matrix.transpose(this.data);
        let rows = data.length;
        let cols = data[0].length;
        this.transposed = new Matrix(rows, cols, 'M1Trans');
        this.transposed.data = data;
    }
    randomize() {
        for (let r=0;r<this.rows;r++) {
            for (let c=0;c<this.cols;c++) {
                this.data._data[r][c] = random(-1,1);
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
        return this.add(this.cellFactor);
    }

    multVal() {
        return this.mult(this.cellFactor);
    }


}