const Transaction = require("./transaction");
const Wallet = require("./index");

const { verifySignature } = require("../util");

describe("Transaction", () => {
  let transaction, senderWallet, recipient, amount;

  beforeEach(() => {
    senderWallet = new Wallet();
    recipient = "recipient-public-key";
    amount = 50;

    transaction = new Transaction({ senderWallet, recipient, amount });
  });

  it("has an `id`", () => {
    expect(transaction).toHaveProperty("id");
  });

  describe("outputMap", () => {
    it("has an `outputMap`", () => {
      expect(transaction).toHaveProperty("outputMap");
    });

    it("outputs tha amount to the recipient", () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });

    it("outputs the remaining balance for the `senderWallet`", () => {
      expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
        senderWallet.balance - amount
      );
    });
  });

  describe("input", () => {
    it("has a `input`", () => {
      expect(transaction).toHaveProperty("input");
    });

    it("has a `timestamp` in the input", () => {
      expect(transaction.input).toHaveProperty("timestamp");
    });

    it("has a `amount` to the `senderWallet` balance", () => {
      expect(transaction.input.amount).toEqual(senderWallet.balance);
    });

    it("sets the `address` to the `senderWallet` publicKey", () => {
      expect(transaction.input.address).toEqual(senderWallet.publicKey);
    });

    it("signs the input", () => {
      expect(
        verifySignature({
          publicKey: senderWallet.publicKey,
          data: transaction.outputMap,
          signature: transaction.input.signature,
        })
      ).toBe(true);
    });
  });

  describe("validTransaction()", () => {
    describe("when the transaction is valid", () => {
      it("returns true", () => {
        expect(Transaction.valideTransaction(transaction)).toBe(true);
      });
    });

    describe("when the transaction is invalid", () => {
      describe("and a transaction outputMap value is invalid", () => {
        it("returns false", () => {
          transaction.outputMap[senderWallet.publicKey] = 9999999;
          expect(Transaction.valideTransaction(transaction)).toBe(false);
        });
      });

      describe("and a transaction input signature is invalid", () => {
        it("returns false", () => {
          transaction
            .expect(Transaction.valideTransaction(transaction))
            .toBe(false);
        });
      });
    });
  });
});