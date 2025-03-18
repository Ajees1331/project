import React, { useState } from "react";
import { Card, Row, Button } from "antd"; // Importing Button directly from 'antd'
import "./styles.css";

function Cards({ showIncomeModal, showExpenseModal }) {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  // Function to reset balance, income, and expenses
  const handleReset = () => {
    setBalance(0);
    setIncome(0);
    setExpenses(0);
  };

  // Functions to add income and expenses and update balance accordingly
  const addIncome = (amount) => {
    setIncome((prevIncome) => prevIncome + amount);
    setBalance((prevBalance) => prevBalance + amount); // Update balance when income is added
  };

  const addExpense = (amount) => {
    setExpenses((prevExpenses) => prevExpenses + amount);
    setBalance((prevBalance) => prevBalance - amount); // Update balance when expense is added
  };

  return (
    <div>
      <Row
        className="my-row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "space-between",
        }}
      >
        <Card className="my-card" title="Current Balance">
          <p>₹{balance}</p>
          <Button type="primary" onClick={handleReset}>
            Reset Balance
          </Button>
        </Card>

        <Card className="my-card" title="Total Income">
          <p>₹{income}</p>
          <Button type="primary" onClick={showIncomeModal}>
            Add Income
          </Button>
        </Card>

        <Card className="my-card" title="Total Expenses">
          <p>₹{expenses}</p>
          <Button type="primary" onClick={showExpenseModal}>
            Add Expense
          </Button>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
