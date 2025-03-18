import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/Modals/AddExpenseModal";  // Ensure correct path
import AddIncomeModal from "../components/Modals/AddIncomeModal";    // Ensure correct path

function Dashboard() {
  // States for controlling modal visibility
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  // Show Expense Modal
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  // Show Income Modal
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  // Hide Expense Modal
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  // Hide Income Modal
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  // Handle form submission
  const onFinish = (values, type) => {
    console.log(`${type} Form Submitted:`, values);
    // Handle income or expense submission logic (e.g., API call)
  };

  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />

      {/* Custom Expense Modal */}
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />

      {/* Custom Income Modal */}
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
    </div>
  );
}

export default Dashboard;
