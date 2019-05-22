class Matrix {

    constructor(rows,cols,name) {
        this.name = name;
        this.rows = rows;
        this.cols = cols;
        this.cellFactor = 0;
        this.dotMatrix;
        this.transposed;
        this.data = math.zeros(this.rows,this.cols);
    }

    static fromArray(array, name) {
        let rows = array.length;
        if (!(array[0] instanceof Array)) {
            for (let r=0; r<rows; r++) {
                let val = array[r];
                let arr = [];
                arr.push(val);
                array[r] = arr;
            }
        }
        let temp = math.matrix(array);
        let tempM = new Matrix(temp.size()[0], temp.size()[1], name);
        tempM.data = temp;
        return tempM;
    }


    print() {
        console.log('======Matrix======');
        console.log(this.name + ', r:' + this.rows + ', c:' + this.cols + ', f:' + this.cellFactor);
        console.table(this.data._data);
    }

    randomize() {
        for (let r=0;r<this.rows;r++) {
            for (let c=0;c<this.cols;c++) {
                this.data._data[r][c] = math.random() * 2 - 1;
            }
        }
    }

    add(n) {
        if (n instanceof Matrix && n.rows === this.rows && n.cols === this.cols) { 
            let temp = math.add(this.data, n.data);
            /*
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    this.data._data[r][c] += parseFloat(n.data._data[r][c]);
                }
            }
            */
            this.data = temp;

        } else if (n instanceof Matrix) { 
            return false;
        } else if (n !== undefined) {
            this.execFuncForEveryCell(this.addScalar, n);
            /*
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    let v = parseFloat(n).toFixed(2);
                    let d = parseFloat(this.data._data[r][c]).toFixed(2);
                    this.data._data[r][c] = parseFloat(v + d).toFixed(2);
                }
            }
            */
        } else {
            return false;
        }
        return true;
    }

    static multiply(a, b, name) {
        if (a instanceof Matrix && b instanceof Matrix && a.cols === b.rows) {
            let temp = math.multiply(a.data, b.data);
            let result =  Matrix.fromArray(temp._data, name);
            return  result;
        } else {
            throw 'inputs a and b must be matrices.  a.cols must equal b.rows';
        }
    }

    mult(n, type) {
        //if (type === 'dot' && n instanceof Matrix && this.rows === n.cols && this.cols === n.rows) {
        if (type === 'mult' && n instanceof Matrix && this.cols === n.rows ) { //{ && this.cols === n.rows) {
            let temp = math.multiply(this.data , n.data);
            this.dotMatrix = new Matrix(temp.size()[0],temp.size()[1],'myMultMatrix');
            this.dotMatrix.data = temp;
            return true;
        } else if (n instanceof Matrix) {
            return false;
        } else if(n !== undefined) {
            this.execFuncForEveryCell(this.multiplyByScalar, n);
/*
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    let v = parseFloat(n).toFixed(2);
                    let d = parseFloat(this.data._data[r][c]).toFixed(2);
                    this.data._data[r][c] = parseFloat(v*d).toFixed(2);
                }
            }
*/
            return true;
        }
        return false;
    }

    addScalar(cellValue, scalar) { 
        return parseFloat(cellValue) + parseFloat(scalar);
    }
    multiplyByScalar(cellValue, scalar) {
        return parseFloat(cellValue) * parseFloat(scalar);
    }

    execFuncForEveryCell(func, scalar) {
            for (let r=0;r<this.rows;r++) {
                for (let c=0;c<this.cols;c++) {
                    let cell = this.data._data[r][c];
                    let cellValue = parseFloat(cell);
                    this.data._data[r][c] = parseFloat(func(cellValue, scalar));
                }
            }


    }

    transpose() {
        let temp = math.transpose(this.data);
        let rows = temp.size()[0];
        let cols = temp.size()[1];
        this.transposed = new Matrix(rows, cols, 'myTransposedMatrix');
        this.transposed = new Matrix(temp.size()[0],temp.size()[1],'myDotMatrix');
        this.transposed.data = temp;
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