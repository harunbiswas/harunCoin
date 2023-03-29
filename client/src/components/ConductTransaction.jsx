import axios from "axios";
import React, { useState } from "react";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import values from "../values";

export default function ConductTransaction() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState();
  const navigate = useNavigate();

  const recipientHandler = (e) => {
    setRecipient(e.target.value);
  };
  const amountHandler = (e) => {
    setAmount(e.target.value);
  };
  const conductTransaction = () => {
    const data = {
      recipient,
      amount,
    };
    axios
      .post(`${values.url}/transact`, data)
      .then((d) => {
        setRecipient("");
        setAmount("");
        alert(d.data.message || d.data.type);
        navigate("/transaction-pool");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="conduct-transaction">
      <Link to="/">Home</Link>

      <h3>Conduct a Transaction</h3>
      <br />
      <FormGroup>
        <FormControl
          input="text"
          placeholder="recipient"
          value={recipient}
          name="recipient"
          onChange={(e) => recipientHandler(e)}
        />
      </FormGroup>
      <br />
      <FormGroup>
        <FormControl
          input="number"
          placeholder="amount"
          value={amount}
          name="amount"
          onChange={(e) => amountHandler(e)}
        />
      </FormGroup>
      <br />
      <div className="" bsStyle="primary" onClick={conductTransaction}>
        <Button>Submit</Button>
      </div>
    </div>
  );
}
