import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

interface TransactionDetails { 
  _id: string;
  userId: string;
  accountName: string;
  type: "expense" | "income";
  amount: number;
  categoryName: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateTransactionCardProps {
  transactionDetails: TransactionDetails;
  onClose: () => void;
  onUpdate: (updatedTransaction: TransactionDetails) => void;
}

const UpdateTransactionCard = ({
  transactionDetails,
  onClose,
  onUpdate,
}: UpdateTransactionCardProps) => {
  const [transactionType, setTransactionType] = useState(transactionDetails.type);
  const [name, setName] = useState(transactionDetails.description);
  const [category, setCategory] = useState(transactionDetails.categoryName);
  const [account, setAccount] = useState(transactionDetails.accountName);
  const [amount, setAmount] = useState(transactionDetails.amount);
  const [date, setDate] = useState(transactionDetails.date);

  const handleUpdate = () => {
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-Grey-80 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4">Update Transaction</h2>
          <IoCloseCircleOutline
            className="w-6 h-6 font-bold text-lg text-Grey-80 hover:text-primary"
            onClick={onClose}
          />
        </div>
        <div className="flex justify-between mb-4">
          {['Income', 'Expenses', 'Savings'].map((type) => (
            <button
              key={type}
              onClick={() => setTransactionType(type)}
              className={`flex-1 py-2 font-semibold rounded-lg ${
                transactionType === type
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
              value={name}
              placeholder="Enter Transaction Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold">Category</label>
              <select
                className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block font-semibold">Account</label>
              <select
                className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option value="Card **** 4156">Card **** 4156</option>
                <option value="Card **** 1234">Card **** 1234</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold">Amount</label>
              <input
                type="text"
                className="w-full border-2 font-semibold text-lg rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold">Date</label>
              <input
                type="datetime-local"
                className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleUpdate}
            className="w-full py-2 bg-primary text-white rounded-lg font-medium mt-4"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransactionCard;
