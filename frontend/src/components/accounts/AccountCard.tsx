import React from "react";

interface AccountCardProps {
  bankName: string;
  accountType: string;
  balance: number;
  lastTransaction: {
    amount: number;
    date: string;
    category: string;
  };
}

const AccountCard: React.FC<AccountCardProps> = ({
  bankName,
  accountType,
  balance,
  lastTransaction,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h3 className="text-gray-800 font-semibold">
        {bankName} - {accountType}
      </h3>
      <p className="text-green-600 text-xl font-bold mt-2">
        ${balance.toLocaleString()}
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Last transaction: ${lastTransaction.amount.toFixed(2)} on{" "}
        {lastTransaction.date} - {lastTransaction.category}
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Transactions
      </button>
    </div>
  );
};

export default AccountCard;
