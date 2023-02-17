const Transaction = require("../wallet/transaction");

class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }

  mineTransactions() {
    const validTransactions = this.transactionPool.validTransactions();

    // genetate the miner's reward
    validTransactions.push(
      Transaction.rewardTransaction({ minerWallet: this.wallet })
    );

    //add a block consistion of these transactions to the blockChain
    this.blockchain.addBlock({ data: validTransactions });

    // broadcast the update blockchain
    this.pubsub.broadcustChain();
    // clear the pool
    this.transactionPool.clear();
  }
}

module.exports = TransactionMiner;
