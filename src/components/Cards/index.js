import React, { useState } from 'react';
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button"; 

function Cards() {
  const [balance, setBalance] = useState(0);

  const handleReset = () => {
    setBalance(0); // Reset the balance to 0
  };

  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p>₹{balance}</p>
          <Button text="Reset Balance"  blue={true} onClick={handleReset} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
