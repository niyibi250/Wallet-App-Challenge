import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

interface AddAccountCardProps {
  onClose: () => void;
  onSave: (accountData: {
    accountName: string;
    accountNumber: string;
    accountType: string;
    accountBalance: string;
  }) => void;
}

const AddAccountTable = ({ onClose, onSave }: AddAccountCardProps) => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('Bank');
  const [accountBalance, setAccountBalance] = useState('');

  const handleSave = () => {
    onSave({ accountName, accountNumber, accountType, accountBalance });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-Grey-80 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4">Add Account</h2>
          <IoCloseCircleOutline
            className="w-6 h-6 font-bold text-lg text-Grey-80 hover:text-primary"
            onClick={onClose}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Account Name</label>
            <input
              type="text"
              className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
              value={accountName}
              placeholder="Enter Account Name"
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold">Account Number</label>
            <input
              type="text"
              className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
              value={accountNumber}
              placeholder="Enter Account Number"
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold">Account Type</label>
            <select
              className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="Bank">Bank</option>
              <option value="Cash">Cash</option>
              <option value="MobileMoney">Mobile Money</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Account Balance</label>
            <input
              type="text"
              className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
              value={accountBalance}
              placeholder="Enter Balance"
              onChange={(e) => setAccountBalance(e.target.value)}
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full py-2 bg-primary text-white rounded-lg font-medium mt-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountTable;
