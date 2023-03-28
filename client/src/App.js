import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import values from "./values";

const App = () => {
  const [walletInfo, setWalletInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${values.url}/wallet-info`)
      .then((d) => {
        setWalletInfo(d.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  return (
    <div className="App">
      <img
        src={
          "https://t4.ftcdn.net/jpg/05/26/51/41/360_F_526514126_EzOp5npwc5RwBM174ys0yHZvoW6vrkxD.jpg"
        }
        className="logo"
        alt="Harun Biswas Rubel"
      />
      <br />
      <Link to="/blocks">Blocks</Link>
      <Link to="/conduct-transaction">Conduct a Transaction</Link>
      <br />
      <h1>Welcome to Haruncoin!</h1>
      <br />
      <div className="wallet-info">
        <strong>Address: {walletInfo.address}</strong> <br />
        <strong>Balance: {walletInfo.balance}</strong>
      </div>
    </div>
  );
};

export default App;
