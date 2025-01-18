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
    <div className="bg-white shadow-md text-Grey-80 rounded-lg p-4 w-full">
      <h3 className="text-Grey-80 text-lg font-bold">
        {bankName} - {accountType}
      </h3>
      <p className="text-primary text-2xl font-bold mt-2">
        ${balance.toLocaleString()}
      </p>
      <p className="mt-8 font-semibold">
        Last transaction: ${lastTransaction.amount.toFixed(2)} on{" "}
        {lastTransaction.date} - {lastTransaction.category}
      </p>
    </div>
  );
};

export default AccountCard;
