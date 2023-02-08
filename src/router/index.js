const express = require("express");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true})); 

const Blockchain = require("../micoin/blockChain");
const Block = require('../micoin/block');

const blockchain = new Blockchain();


app.get("/", (req, res) => {
  res.send("Welcome to the Blockchain API!");
});

app.get("/blockchain", (req, res) => {
  res.send(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const data = req.body;
  const block = new Block(data);
  block.mineBlock();
  block.blockCounter();
  block.adjustDifficulty();
  blockchain.addBlock(block);
  res.status(201).send(block);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});