import { useState } from 'react';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';

const TransactionTable = () => {
  const { transactions } = useAppSelector((state: RootState) => state.transaction);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const transactionsPerPage = 8;

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Income') return transaction.type === 'income';
    if (selectedFilter === 'Expense') return transaction.type === 'expense';
    if (selectedFilter === 'Savings') return transaction.type === 'saving';
    return true;
  });

  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
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
              <button 
                className={`hover:text-gray-200 ${selectedFilter === 'All' ? 'text-primary' : ''}`} 
                onClick={() => handleFilterChange('All')}
              >
                All Transactions
              </button>
              <button 
                className={`hover:text-gray-200 ${selectedFilter === 'Income' ? 'text-primary' : ''}`} 
                onClick={() => handleFilterChange('Income')}
              >
                Incomes
              </button>
              <button 
                className={`hover:text-gray-200 ${selectedFilter === 'Expense' ? 'text-primary' : ''}`} 
                onClick={() => handleFilterChange('Expense')}
              >
                Expenses
              </button>
              <button 
                className={`hover:text-gray-200 ${selectedFilter === 'Savings' ? 'text-primary' : ''}`} 
                onClick={() => handleFilterChange('Savings')}
              >
                Savings
              </button>
            </div>
            <div className="flex items-center gap-2">
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
                  <td className="py-4">{transaction.account.accountName}</td>
                  <td>{transaction.date ? new Date(transaction.date).toLocaleDateString() : ''}</td>
                  <td>{transaction.category.name}</td>
                  <td className={transaction.type !== 'expense' ? "text-primary" : "text-Red"}>
                    {transaction.type !== 'expense' ? "+" : "-"}
                    {transaction.amount}
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
                className={`p-2 ${currentPage === pageIndex + 1 ? "bg-gray-700" : "hover:bg-gray-800"} rounded`}
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
