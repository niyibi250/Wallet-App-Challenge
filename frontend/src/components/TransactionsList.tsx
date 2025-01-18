import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoLightBulb } from "react-icons/go";
import { FiDollarSign } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import UpdateTransactionCard from "./transaction/updatetransaction";

interface transactionDetails {
  id: string;
  transactionType: string;
  name: string;
  category: string;
  account: string;
  amount: string;
  date: string;
};
const TransactionsList = () => {
  const [showUpdateTransaction, setShowUpdateTransaction] = useState(false);
  const allTransactions = [
    {
      id: 1,
      category: "Food",
      icon: <AiOutlineShoppingCart className="h-4 w-4 text-gray-600" />,
      datetime: "3 Dec 23 6:57 PM",
      amount: -15.98,
      payment: "Card **4156",
    },
    {
      id: 2,
      category: "Electricity",
      icon: <GoLightBulb className="h-4 w-4 text-gray-600" />,
      datetime: "3 Dec 23 2:12 PM",
      amount: -4.12,
      payment: "Cash",
    },
    {
      id: 3,
      category: "Salary",
      icon: <FiDollarSign className="h-4 w-4 text-gray-600" />,
      datetime: "3 Dec 23 10:44 AM",
      amount: 4800,
      payment: "Card **5230",
    },
    {
      id: 4,
      category: "Transport",
      icon: <AiOutlineShoppingCart className="h-4 w-4 text-gray-600" />,
      datetime: "4 Dec 23 8:30 AM",
      amount: -25.5,
      payment: "Card **4156",
    },
    {
      id: 5,
      category: "Groceries",
      icon: <AiOutlineShoppingCart className="h-4 w-4 text-gray-600" />,
      datetime: "5 Dec 23 6:20 PM",
      amount: -50.75,
      payment: "Cash",
    },
    {
      id: 6,
      category: "Bonus",
      icon: <FiDollarSign className="h-4 w-4 text-gray-600" />,
      datetime: "5 Dec 23 1:00 PM",
      amount: 1500,
      payment: "Bank Transfer",
    },
    {
      id: 7,
      category: "Health",
      icon: <GoLightBulb className="h-4 w-4 text-gray-600" />,
      datetime: "6 Dec 23 10:15 AM",
      amount: -75.32,
      payment: "Card **5230",
    },
    {
      id: 8,
      category: "Food",
      icon: <AiOutlineShoppingCart className="h-4 w-4 text-gray-600" />,
      datetime: "7 Dec 23 7:45 PM",
      amount: -20.15,
      payment: "Cash",
    },
    {
      id: 9,
      category: "Utilities",
      icon: <GoLightBulb className="h-4 w-4 text-gray-600" />,
      datetime: "8 Dec 23 9:30 AM",
      amount: -65.4,
      payment: "Card **4156",
    },
    {
      id: 10,
      category: "Salary",
      icon: <FiDollarSign className="h-4 w-4 text-gray-600" />,
      datetime: "8 Dec 23 11:00 AM",
      amount: 5000,
      payment: "Card **5230",
    },
    {
      id: 11,
      category: "Entertainment",
      icon: <AiOutlineShoppingCart className="h-4 w-4 text-gray-600" />,
      datetime: "9 Dec 23 8:00 PM",
      amount: -120.5,
      payment: "Card **4156",
    },
    {
      id: 12,
      category: "Shopping",
      icon: <AiOutlineShoppingCart className="h-4 w-4 text-gray-600" />,
      datetime: "10 Dec 23 4:45 PM",
      amount: -250.75,
      payment: "Card **5230",
    },
  ];
  

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
        {/* Column Headers */}
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
          {currentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-4 items-center py-3 px-2 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-gray-100">{transaction.icon}</div>
                <span>{transaction.category}</span>
              </div>
              <div className="text-gray-600">{transaction.datetime}</div>
              <div
                className={
                  transaction.amount > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>{transaction.payment}</span>
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
       {showUpdateTransaction && <UpdateTransactionCard transactionDetails={selectedTransaction} onClose={()=>setShowUpdateTransaction(false)} onUpdate={()=>setShowUpdateTransaction(false)}/> }
    </div>
  );
};

export default TransactionsList;
