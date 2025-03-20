import React, { useState } from 'react';
import { Table, Input } from 'antd'; // Import Input from Ant Design for search

function TransactionTable({ transactions }) {
  const [searchText, setSearchText] = useState(''); // State to hold the search query

  // Columns definition
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount.toFixed(2)}`, // Format amount as currency
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter transactions based on search text
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.name.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div>
      {/* Search Input Field */}
      <Input
        placeholder="Search transactions by Name, Tag, or Date"
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginBottom: 16, width: '300px' }}
      />
      
      {/* Transaction Table */}
      <Table
        dataSource={filteredTransactions} // Display filtered transactions
        columns={columns}
        rowKey="id" // Assuming each transaction has a unique 'id'
      />
    </div>
  );
}

export default TransactionTable;
