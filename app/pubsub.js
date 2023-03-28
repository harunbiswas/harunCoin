const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-469b871f-904c-4efd-b868-7b64e9c477f0",
  subscribeKey: "sub-c-339bea5f-81f2-4a0a-827e-2c617bbd8530",
  sectetKey: "sec-c-M2ZkNjBiZGMtYTJkNy00MGI2LWJmYTItNDI0MTA1MmQwMTEy",
  uuid: "unique-client-identifier",
};

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
  TRANSACTION: "TRANSACTION",
};

class PubSub {
  constructor({ blockchain, transactionPool }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  // listner function
  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;
        console.log(
          `Message received. Channel: ${channel}. Message: ${message}.`
        );

        const parsedMessage = JSON.parse(message);

        switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(parsedMessage, true, () => {
              this.transactionPool.clearBlockchainTransactions({
                chain: parsedMessage,
              });
            });
            break;
          case CHANNELS.TRANSACTION:
            this.transactionPool.setTransaction(parsedMessage);
            break;
          default:
            return;
        }
      },
    };
  }

  // publish function
  publish({ channel, message }) {
    this.pubnub.unsubscribe(
      {
        channels: [channel],
        withPresence: true,
      },
      (status) => {
        if (status.error) {
          console.log(status.error);
        } else {
          this.pubnub.publish(
            {
              channel: channel,
              message: message,
            },
            (status, res) => {
              if (status.error) {
                console.log(status.error);
              } else {
                this.pubnub.subscribe({
                  channels: [channel],
                });
              }
            }
          );
        }
      }
    );
  }

  // broadcust chain function
  broadcustChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  // broadcust transaction method

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }
}

module.exports = PubSub;
