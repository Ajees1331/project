import React from "react";
import { Card, Row, Button } from "antd"; // Importing Button directly from 'antd'
import "./styles.css";

function Cards({ income, expense, totalBalance, showIncomeModal, showExpenseModal }) {
  // Function to reset balance, income, and expenses
  const handleReset = () => {
    // Reset functionality here, if needed (currently there's no state to reset locally)
    console.log("Resetting Balance..."); 
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
        {/* Current Balance Card */}
        <Card className="my-card" title="Current Balance">
          <p>₹{totalBalance}</p> {/* Use totalBalance from props */}
          <Button type="primary" onClick={handleReset}>
            Reset Balance
          </Button>
        </Card>

        {/* Total Income Card */}
        <Card className="my-card" title="Total Income">
          <p>₹{income}</p> {/* Use income from props */}
          <Button type="primary" onClick={showIncomeModal}>
            Add Income
          </Button>
        </Card>

        {/* Total Expenses Card */}
        <Card className="my-card" title="Total Expenses">
          <p>₹{expense}</p> {/* Use expense from props */}
          <Button type="primary" onClick={showExpenseModal}>
            Add Expense
          </Button>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
