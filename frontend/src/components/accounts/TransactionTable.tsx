import { useState } from 'react';
import { IoChevronDown } from "react-icons/io5";

const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const transactionsPerPage = 8;

  const transactions = [
    {
      account: "Monobank",
      category: "Groceries",
      date: "Apr 15, 2024",
      amount: -570,
    },
    {
      account: "Monobank",
      category: "Uncategorized",
      date: "Apr 15, 2024",
      amount: 5560,
    },
    {
      account: "Wise",
      category: "Beauty",
      date: "Apr 15, 2024",
      amount: -533,
    },
    {
      account: "Privatbank",
      category: "Transport",
      date: "Apr 14, 2024",
      amount: -59,
    },
    {
      account: "Revolut",
      category: "Uncategorized",
      date: "Apr 14, 2024",
      amount: 5700,
    },
    {
      account: "Revolut",
      category: "Pets",
      date: "Apr 13, 2024",
      amount: -556,
    },
    {
      account: "Pumb",
      category: "Hobby",
      date: "Apr 11, 2024",
      amount: -540,
    },
    {
      account: "Wise",
      category: "Subscription",
      date: "Apr 11, 2024",
      amount: -510,
    },
  ];

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full bg-white text-Grey-80 rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex flex-col mb-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-bold text-Grey-100">Transaction History</h2>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mt-6">
            <div className="flex gap-4 text-sm text-Grey-80 font-accent font-bold">
              <button className="hover:text-gray-200">All Transactions</button>
              <button className="hover:text-gray-200">Expenses</button>
              <button className="hover:text-gray-200">Income</button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative inline-block text-left bg-Grey-5 text-Grey-100 rounded-md px-2 hover:border hover:border-primary">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {selectedPeriod ? selectedPeriod : 'This Month'}
                  <IoChevronDown className='ml-10' />
                </button>
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu hover:bg-primary">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:text-Grey-5 hover:bg-primary w-full text-left" role="menuitem" onClick={() => handlePeriodChange('Last Month')}>This Month</button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:text-Grey-5 hover:bg-primary w-full text-left" role="menuitem" onClick={() => handlePeriodChange('Last Month')}>Last Month</button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:text-Grey-5 hover:bg-primary w-full text-left" role="menuitem" onClick={() => handlePeriodChange('Last Quarter')}>Last Quarter</button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:text-Grey-5 hover:bg-primary w-full text-left" role="menuitem" onClick={() => handlePeriodChange('Last Year')}>Last Year</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-lg text-Grey-100 font-semibold font-accent border-b border-gray-700">
                <th className="text-left pb-3">Account</th>
                <th className="text-left pb-3">Date</th>
                <th className="text-left pb-3">Category</th>
                <th className="text-left pb-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={index} className="font-semibold border-b border-gray-800">
                  <td className="py-4">{transaction.account}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.category}</td>
                  <td className={transaction.amount > 0 ? "text-green-400" : "text-red-400"}>
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-Grey-100">
          <div>
            {indexOfFirstTransaction + 1}-{Math.min(indexOfLastTransaction, transactions.length)} of {transactions.length}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-800 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`px-2 py-1 hover:bg-gray-800 rounded ${currentPage === pageIndex + 1 ? "bg-gray-700" : ""}`}
                onClick={() => setCurrentPage(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
            <button className="p-1 hover:bg-gray-800 rounded" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
