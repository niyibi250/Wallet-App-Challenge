import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import CustomButton from "../CustomButton";
import AddTransactiontable from "../transaction/AddTransaction";
import UpdateTransactionCard from "../transaction/UpdateTransactionCard";

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showUpdateTransaction, setShowUpdateTransaction] = useState(false);
  const [transactionToUpdate, setTransactionToUpdate] = useState(null);
  const [actionMenus, setActionMenus] = useState({});

  const transactionsPerPage = 8;

  const transactions = [
    {
      id: "1",
      merchant: "Fornelino",
      account: "Monobank",
      category: "Groceries",
      icon: "🛒",
      date: "Apr 15, 2024",
      amount: -570,
    },
    {
      id: "2",
      merchant: "From Sarah G.",
      account: "Monobank",
      category: "Uncategorized",
      icon: "❓",
      date: "Apr 15, 2024",
      amount: 5560,
    },
    // Add more transactions here...
  ];

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setIsMenuOpen(false);
  };

  const toggleActionMenu = (transactionId) => {
    setActionMenus((prevMenus) => ({
      ...prevMenus,
      [transactionId]: !prevMenus[transactionId],
    }));
  };

  const handleUpdateClick = (transaction) => {
    setTransactionToUpdate(transaction);
    setShowUpdateTransaction(true);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    console.log("Updated Transaction:", updatedTransaction);
    setShowUpdateTransaction(false);
  };

  return (
    <div className="w-full bg-white text-Grey-80 rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex flex-col mb-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-bold text-Grey-80 font-accent">
              Transaction History
            </h2>
            <CustomButton
              title="Add Transaction"
              containerstyle=" py-2 px-8 text-Grey-5 bg-primary rounded-lg hover:bg-white hover:text-Grey-80 border border-primary"
              textstyle="text-lg font-medium"
              iconstyle="text-lg font-medium pr-2"
              icon={<IoMdAdd />}
              handlepress={() => setShowAddTransaction(true)}
            />
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
              {currentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="font-semibold border-b border-gray-800"
                >
                  <td className="py-4">{transaction.merchant}</td>
                  <td>{transaction.account}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{transaction.icon}</span>
                      {transaction.category}
                    </div>
                  </td>
                  <td>{transaction.date}</td>
                  <td
                    className={
                      transaction.amount > 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </td>
                  <td className="relative">
                    <button
                      className="w-full h-full flex flex-row justify-center p-4"
                      onClick={() => toggleActionMenu(transaction.id)}
                    >
                      <FiMoreVertical className="hover:border hover:border-primary rounded-full text-lg" />
                    </button>
                    {actionMenus[transaction.id] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md">
                        <button
                          className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary hover:text-white w-full"
                          onClick={() => handleUpdateClick(transaction)}
                        >
                          Update
                        </button>
                        <button
                          className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary hover:text-white w-full"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddTransaction && (
        <AddTransactiontable
          onClose={() => setShowAddTransaction(false)}
          onSave={() => setShowAddTransaction(false)}
        />
      )}
      {showUpdateTransaction && transactionToUpdate && (
        <UpdateTransactionCard
          transactionDetails={transactionToUpdate}
          onClose={() => setShowUpdateTransaction(false)}
          onUpdate={handleUpdateTransaction}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
