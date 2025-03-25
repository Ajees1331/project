import React, { useState } from 'react';
import { Table, Input, Select, Radio } from 'antd'; // Import only once

const { Option } = Select; // Destructure Option from Select

function TransactionTable({ transactions }) {
  const [searchText, setSearchText] = useState(''); // State to hold the search query
  const [typeFilter, setTypeFilter] = useState(''); // Filter for transaction type (income/expense)
  const [sortKey, setSortKey] = useState(''); // Sorting option (by date or amount)

  // Columns definition for the table
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

  // Filter transactions based on search text and type filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchText.toLowerCase());

    const matchesTypeFilter =
      typeFilter === '' || transaction.type === typeFilter;

    return matchesSearch && matchesTypeFilter;
  });

  // Sort transactions based on the selected sortKey (date or amount)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date); // Sort by date
    } else if (sortKey === 'amount') {
      return a.amount - b.amount; // Sort by amount
    } else {
      return 0; // No sorting
    }
  });

  return (
    <div style={{ padding: '20px' }}>
      {/* Search Input Field */}
      <Input
        placeholder="Search transactions by Name, Tag, or Date"
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginBottom: 16, width: '300px' }}
      />

      {/* Type Filter */}
      <Select
        className="select-input"
        onChange={(value) => setTypeFilter(value)}
        value={typeFilter}
        placeholder="Filter by Type"
        allowClear
        style={{ marginBottom: 16, width: '200px' }}
      >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>

      {/* Sorting Radio Buttons */}
      <div style={{ marginBottom: 16 }}>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
      </div>

      {/* Transaction Table */}
      <Table
        dataSource={sortedTransactions} // Display sorted and filtered transactions
        columns={columns}
        rowKey="id" // Assuming each transaction has a unique 'id'
      />
    </div>
  );
}

export default TransactionTable;
