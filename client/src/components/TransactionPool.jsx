import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import values from "../values";
import Transaction from "./Transaction";

const POLL_INERVAL_MS = 10000;

export default function TransactionPool() {
  const [trnasactionPoolMap, setTransactionPoolMap] = useState({});
  const navigate = useNavigate();

  const getDataHandler = () => {
    axios
      .get(`${values.url}/transaction-pool-map`)
      .then((d) => setTransactionPoolMap(d.data))
      .catch((e) => console.error(e.response));
  };

  const mineTransactionHandser = () => {
    axios
      .get(`${values.url}/mine-transactions`)
      .then((d) => {
        if (d.status === 200) {
          alert("success!");
          navigate("/blocks");
        } else {
          alert("The mine-transaction block request did not complete!");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    getDataHandler();
    const intervalId = setInterval(() => {
      getDataHandler();
    }, POLL_INERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="transaction-pool">
      <div className="">
        <Link to="/">Home</Link>
      </div>

      <br />
      <h3>Transaction pool</h3>
      <br />
      {Object.values(trnasactionPoolMap).map((transaction) => (
        <div className="" key={transaction.id}>
          <hr />
          <Transaction transaction={transaction} />
        </div>
      ))}
      <hr />
      <Button onClick={mineTransactionHandser} bsStyle="primary">
        Mine the Transactions
      </Button>
    </div>
  );
}
