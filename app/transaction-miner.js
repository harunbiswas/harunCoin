class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }

  mineTransactions() {
    // get the transaction pool's valid transactions
    // genetate the miner's reward
    //add a block consistion of these transactions to the blockChain
    // broadcast the update blockchain
    // clear the pool
  }
}

module.exports = TransactionMiner;
