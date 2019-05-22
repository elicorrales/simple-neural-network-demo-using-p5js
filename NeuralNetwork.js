class NeuralNetwork {

    static sigmoid = (x) => {
        return 1 / ( 1 + Math.exp(-x));
    }

    constructor(numInputNeurons, numHiddenNeurons, numOutputNeurons) {

        this.inputNodes = numInputNeurons;
        this.hiddenNodes = numHiddenNeurons;
        this.outputNodes = numOutputNeurons;

        this.whtsBtweenInAndHiddenM = new Matrix(this.hiddenNodes,this.inputNodes,'NnWtInToHid');
        this.whtsBtweenHiddenAndOutM = new Matrix(this.outputNodes,this.hiddenNodes,'NnWtOutToHid');
        this.whtsBtweenInAndHiddenM.randomize();
        this.whtsBtweenHiddenAndOutM.randomize();

        this.biasHiddenM = new Matrix(this.hiddenNodes,1,'NnHiddenBias');
        this.biasOutM = new Matrix(this.outputNodes,1,'NnOutputBias');
        this.biasHiddenM.randomize();
        this.biasOutM.randomize();
    }

    print() {
        console.log('==========NN==============');
        console.log('i:'+this.inputNodes+', h:'+this.hiddenNodes+', o:'+this.outputNodes);
        this.whtsBtweenInAndHiddenM.print();
        this.whtsBtweenHiddenAndOutM.print();
        this.biasHiddenM.print();
        this.biasOutM.print();
    }

    feedforward(inputsArray){
        let inputsM = Matrix.fromArray(inputsArray, 'NnInputs');
        let hiddenM = Matrix.multiply(this.whtsBtweenInAndHiddenM, inputsM, 'NnMultHiddenByInputs');
        hiddenM.add(this.biasHiddenM);
        hiddenM.execFuncForEveryCell(NeuralNetwork.sigmoid);
        let outputM = Matrix.multiply(this.whtsBtweenHiddenAndOutM,hiddenM);
        outputM.add(this.biasOutM);
        outputM.execFuncForEveryCell(NeuralNetwork.sigmoid);
        return  outputM.data._data.flat();
        //return  output.data._data;
    }

    train(inputsArray, targetsArray) { //targets=answer
        let outputsArray = this.feedforward(inputsArray);
        let targetsM = Matrix.fromArray(targetsArray,'NnTrainTargets');
        let outputsM = Matrix.fromArray(outputsArray,'NnTrainOutputs');


        //error =  targets - outputs
        let errorM = Matrix.subtract(targetsM,outputsM, 'NnTargetsMinusOutputs');

        outputsM.print();
        targetsM.print();
        errorM.print();
    }
}