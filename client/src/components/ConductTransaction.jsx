import React, { useState } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ConductTransaction() {
  const [data, setData] = useState({
    recipient: "",
    amount: 0,
  });

  const handler = (e) => {
    setData({ [e.target.name]: e.target.value });
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
          value={data.recipient}
          name="recipient"
          onChange={(e) => handler(e)}
        />
      </FormGroup>
      <br />
      <FormGroup>
        <FormControl
          input="number"
          placeholder="amount"
          value={data.amount}
          name="amount"
          onChange={(e) => handler(e)}
        />
      </FormGroup>
    </div>
  );
}
