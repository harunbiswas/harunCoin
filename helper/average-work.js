const Blockchain = require("../blockChain/blockchain");

const blockChain = new Blockchain();

blockChain.addBlock({ data: "initial" });

console.log(`first block`, blockChain.chain[blockChain.chain.length - 1]);

let prevTimestamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i < 10000; i++) {
  prevTimestamp = blockChain.chain[blockChain.chain.length - 1].timestamp;

  blockChain.addBlock({ data: `block ${i}` });
  nextBlock = blockChain.chain[blockChain.chain.length - 1];

  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);

  average = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Aberage time: ${average}ms`
  );
}
