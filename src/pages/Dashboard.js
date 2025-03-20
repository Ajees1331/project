import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/Modals/AddExpenseModal";  // Ensure correct path
import AddIncomeModal from "../components/Modals/AddIncomeModal";    // Ensure correct path
import { addDoc, collection, query, getDocs } from "firebase/firestore"; // Import query and getDocs
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import moment from "moment";
import TransactionTable from "../components/TransactionsTable";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

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

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`), // Fixed path: Correct template literals
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");

      // Add new transaction to the state
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);

      calculateBalance(); // Recalculate balance after adding new transaction
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    if (user) {
      // Try fetching transactions from localStorage first
      const savedTransactions = localStorage.getItem("transactions");
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        fetchTransactions();
      }
    }
  }, [user]); // Run when `user` state changes

  useEffect(() => {
    calculateBalance();
  }, [transactions]); // Recalculate balance when `transactions` state changes

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`)); // Correct path here
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push({
          ...doc.data(),
          id: doc.id, // Optional: Add the document ID for reference
        });
      });
      setTransactions(transactionsArray);
      console.log("Transactions Array", transactionsArray);
      toast.success("Transactions Fetched!");

      // Save the transactions to localStorage for persistence across page reloads
      localStorage.setItem("transactions", JSON.stringify(transactionsArray));
    }
    setLoading(false);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
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

          <TransactionTable transactions={transactions} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
