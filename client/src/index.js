import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Blocks from "./components/Blocks";
import ConductTransaction from "./components/ConductTransaction";
import TransactionPool from "./components/TransactionPool";
import "./style.css";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={App} />
      <Route path="/blocks" Component={Blocks} />
      <Route path="/conduct-transaction" Component={ConductTransaction} />
      <Route path="/transaction-pool" Component={TransactionPool} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
