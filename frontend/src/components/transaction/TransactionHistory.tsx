import { useState } from 'react';
import { IoChevronDown } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import CustomButton from '../CustomButton';
import AddTransactiontable from '../transaction/AddTransaction';
import { useTransactions } from '../../utils/TransactionsContext';

const TransactionHistory = () => {
  const { transactions } = useTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month'); // Default period
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default category
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const transactionsPerPage = 8;

  const filterTransactions = () => {
    let filteredTransactions = transactions;

    if (selectedCategory !== 'All') {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.categoryName === selectedCategory
      );
    }

    if (selectedPeriod && selectedPeriod !== 'This Month') {
      const now = new Date();
      switch (selectedPeriod) {
        case 'Last Month':
          const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
          filteredTransactions = filteredTransactions.filter(
            transaction => 
              transaction.date && 
              new Date(transaction.date).getMonth() === lastMonth.getMonth() && 
              new Date(transaction.date).getFullYear() === lastMonth.getFullYear()
          );
          break;
        case 'Last Quarter':
          const lastQuarter = new Date(now.setMonth(now.getMonth() - 3));
          filteredTransactions = filteredTransactions.filter(
            transaction => 
              transaction.date && 
              new Date(transaction.date) >= lastQuarter
          );
          break;
        case 'Last Year':
          const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
          filteredTransactions = filteredTransactions.filter(
            transaction => 
              transaction.date && 
              new Date(transaction.date).getFullYear() === lastYear.getFullYear()
          );
          break;
        default:
          break;
      }
    }

    return filteredTransactions;
  };

  const filteredTransactions = filterTransactions(); // Apply filtering
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full bg-white text-Grey-80 rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex flex-col mb-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-bold text-Grey-80 font-accent">Transaction History</h2>
            <CustomButton
              title='Add Transaction'
              containerstyle=' py-2 px-8 text-Grey-5 bg-primary rounded-lg hover:bg-white hover:text-Grey-80 border border-primary'
              textstyle='text-lg font-medium'
              iconstyle='text-lg font-medium pr-2'
              icon={<IoMdAdd />}
              handlepress={() => setShowAddTransaction(true)}
            />
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mt-6">
            <div className="flex gap-4 text-sm text-Grey-80 font-accent font-bold">
              <button
                className={`hover:text-gray-200 ${selectedCategory === 'All' ? 'text-primary' : ''}`}
                onClick={() => handleCategoryChange('All')}
              >
                All Transactions
              </button>
              <button
                className={`hover:text-gray-200 ${selectedCategory === 'Expenses' ? 'text-primary' : ''}`}
                onClick={() => handleCategoryChange('Expenses')}
              >
                Expenses
              </button>
              <button
                className={`hover:text-gray-200 ${selectedCategory === 'Income' ? 'text-primary' : ''}`}
                onClick={() => handleCategoryChange('Income')}
              >
                Income
              </button>
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
                  {selectedPeriod}
                  <IoChevronDown className='ml-10' />
                </button>
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu hover:bg-primary">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:text-Grey-5 hover:bg-primary w-full text-left" role="menuitem" onClick={() => handlePeriodChange('This Month')}>This Month</button>
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
                <th className="text-left pb-3">Merchant</th>
                <th className="text-left pb-3">Account</th>
                <th className="text-left pb-3">Category</th>
                <th className="text-left pb-3">Date</th>
                <th className="text-left pb-3">Amount</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={index} className="font-semibold border-b border-gray-800">
                  <td className="py-4">{transaction.description}</td>
                  <td>{transaction.categoryName}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {transaction.categoryName}
                    </div>
                  </td>
                  <td>{transaction.date ? new Date(transaction.date).toLocaleDateString() : ''}</td>
                  <td className={Number(transaction.amount) > 0 ? "text-green-400" : "text-red-400"}>
                    {Number(transaction.amount) > 0 ? "+" : ""}
                    {transaction.amount}
                  </td>
                  <td className='text-center'>
                    <div className="relative">
                      <button
                        className="p-1 hover:bg-gray-100 rounded-full"
                        onClick={(e) => {
                          const menu = e.currentTarget.nextElementSibling;
                          menu?.classList.toggle("hidden");
                        }}
                      >
                        <FiMoreVertical className="h-4 w-4" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 hidden">
                        <button
                          onClick={()=>{}} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                          Update
                        </button>
                        <button 
                          onClick={()=>{}}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-Grey-100">
          <div>
            {indexOfFirstTransaction + 1}-{Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length}
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
      {showAddTransaction && <AddTransactiontable onClose={()=>setShowAddTransaction(false)} onSave={()=>setShowAddTransaction(false)}/> }
    </div>
  );
};

export default TransactionHistory;
