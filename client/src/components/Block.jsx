import React, { useState } from "react";
import Transaction from "./Transaction";

const Block = ({ info }) => {
  const { hash, timestamp, data } = info;
  const [displayTransaction, setDsiplayTransaction] = useState(false);

  const toggleTransaction = () => setDsiplayTransaction(!displayTransaction);

  const Data = () => {
    let dataDisplay = JSON.stringify(data);
    dataDisplay =
      dataDisplay.length > 35
        ? dataDisplay.substring(0, 35) + "..."
        : dataDisplay;

    if (displayTransaction) {
      return (
        <div className="">
          <div className="">
            {data.map((tranasction, i) => (
              <div className="" key={tranasction.id}>
                <hr />
                <Transaction transaction={tranasction} />
              </div>
            ))}
            {dataDisplay.length > 35 && (
              <div className="">
                <button onClick={toggleTransaction} className="btn btn-danger">
                  Show less
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="">
        <strong>Data: {dataDisplay}</strong>
        {dataDisplay.length > 35 && (
          <div className="">
            <button onClick={toggleTransaction} className="btn btn-primary">
              Show More
            </button>{" "}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="block">
      <strong>Hash: {`${hash.substring(0, 15)}...`}</strong> <br />
      <strong>
        Timestamp: {new Date(timestamp).toLocaleDateString()}
      </strong>{" "}
      <Data />
    </div>
  );
};

export default Block;
