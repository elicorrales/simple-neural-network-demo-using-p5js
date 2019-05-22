class NeuralNetwork {

    static sigmoid = (x) => {
        return 1 / ( 1 + Math.exp(-x));
    }

    constructor(numInputNeurons, numHiddenNeurons, numOutputNeurons) {

        this.inputNodes = numInputNeurons;
        this.hiddenNodes = numHiddenNeurons;
        this.outputNodes = numOutputNeurons;

        this.whtsBtweenInAndHidden = new Matrix(this.hiddenNodes,this.inputNodes,'NnWtInToHid');
        this.whtsBtweenHiddenAndOut = new Matrix(this.outputNodes,this.hiddenNodes,'NnWtOutToHid');
        this.whtsBtweenInAndHidden.randomize();
        this.whtsBtweenHiddenAndOut.randomize();

        this.biasHidden = new Matrix(this.hiddenNodes,1,'NnHiddenBias');
        this.biasOut = new Matrix(this.outputNodes,1,'NnOutputBias');
        this.biasHidden.randomize();
        this.biasOut.randomize();
    }

    print() {
        console.log('==========NN==============');
        console.log('i:'+this.inputNodes+', h:'+this.hiddenNodes+', o:'+this.outputNodes);
        this.whtsBtweenInAndHidden.print();
        this.whtsBtweenHiddenAndOut.print();
        this.biasHidden.print();
        this.biasOut.print();
    }

    feedforward(inputsArray){
        let inputs = Matrix.fromArray(inputsArray, 'NnInputs');
        let hidden = Matrix.multiply(this.whtsBtweenInAndHidden, inputs, 'NnMultHiddenByInputs');
        hidden.add(this.biasHidden);
        return hidden.execFuncForEveryCell(NeuralNetwork.sigmoid);
    }
}