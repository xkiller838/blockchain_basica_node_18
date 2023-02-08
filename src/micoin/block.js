const SHA256 = require("crypto-js/sha256");
/**
 * esta variable se declara fuera de la clase para que no se reinicialize cada vez que se ejecuta la funcion mineblock
 * y se aumenta en 1 con la funcion abjuntDificulty()
 */
let globalDifficulty = 0;
/**
 * contador de blocks minados
 */
let blockCounter = 0;

class Block {
  constructor(index= 0, timestamp = new Date().getTime(), data, nonce = 0, difficulty=globalDifficulty, previousHash = '' ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty; // Dificultad inicial
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256( this.index +  this.previousHash +  this.timestamp +  JSON.stringify(this.data) +  this.nonce ).toString();
  }

  mineBlock() {
    while (
      this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    // console.log("Block mined: " + this.hash);
  }


  adjustDifficulty() {
    
    //si la cantidad de blocks minados es mayor que 2 ejecuta el ingrementador
    if (blockCounter > 2) {
      globalDifficulty++;
    }    
    console.log("🚀 ~ file: block.js:47 ~ Block ~ adjustDifficulty ~ this.difficulty", this.difficulty);
    console.log("🚀 ~ file: block.js:34 ~ Block ~ adjustDifficulty", globalDifficulty);
    
  }    
/**
 * incrementa el contador de block minados
 */
  blockCounter(){
    blockCounter++;
    console.log("🚀 ~ file: block.js:52 ~ Block ~ blockCounter ~ blockCounter", blockCounter)
  }
      
}

module.exports = Block;
