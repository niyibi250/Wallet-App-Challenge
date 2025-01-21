import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import { useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';

const TransactionsList = () => {
  const { transactions } = useAppSelector((state: RootState) => state.transaction);
  
   const sixMonthsAgo = new Date();
   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= sixMonthsAgo;
  });

  const allTransactions = recentTransactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 4;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md font-accent">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold text-Grey-80">Recent Transactions</h2>
      </div>

      {/* Content */}
      <div className="pt-4">
        <div className="grid grid-cols-4 py-2 font-bold text-Grey-80 border-b">
          <div className="flex items-center gap-1">
            Category
          </div>
          <div className="flex items-center gap-1">
            Date
          </div>
          <div className="flex items-center gap-1">
            Amount
          </div>
          <div className="flex items-center gap-1">
            Account
          </div>
        </div>

        {/* Transactions */}
        <div className="space-y-2 mt-2">
          {currentTransactions.map((transaction, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center py-3 px-2 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span>{transaction.category.name}</span>
              </div>
              <div className="text-gray-600">{transaction.date ? new Date(transaction.date).toLocaleDateString() : ''}</div>
              <div
                className={transaction.type !== 'expense' ? "text-primary" : "text-Red"}>
                {transaction.type !== 'expense' ? "+" : "-"}${Math.abs(Number(transaction.amount)).toFixed(2)}
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>{transaction.account.accountName}</span>
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
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Update
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(allTransactions.length / transactionsPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
       {/* {showUpdateTransaction && <UpdateTransactionCard  onClose={()=>setShowUpdateTransaction(false)} onUpdate={()=>setShowUpdateTransaction(false)}/> } */}
    </div>
  );
};

export default TransactionsList;
