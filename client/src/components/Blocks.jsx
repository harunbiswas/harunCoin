import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import values from "../values";
import Block from "./Block";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    axios
      .get(`${values.url}/blocks`)
      .then((d) => {
        setBlocks(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="blocks">
      <Link to="/">Home</Link>
      <h1>Blocks</h1>

      {blocks.map((block, i) => (
        <Block key={i} info={block} />
      ))}
    </div>
  );
};

export default Blocks;
