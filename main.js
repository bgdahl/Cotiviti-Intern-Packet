const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "07/18/2023","Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let EMR = new Blockchain();
EMR.addBlock(new Block(1, "07/04/2023", { A1c: 7.6}));
EMR.addBlock(new Block(2, "07/12/2023", { A1c: 10.5}));
EMR.addBlock(new Block(3, "07/13/2023", {BP: 120/80}));

//console.log('Is blockchain valid?' + EMR.isChainValid())

//EMR.chain[2].data = {A1c: 6};
//EMR.chain[2].hash = EMR.chain[1].calculateHash();

//console.log('Is blockchain valid?' + EMR.isChainValid())


console.log(JSON.stringify(EMR, null, 4));