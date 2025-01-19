import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import AddAccountTable from "./accounts/AddAcount";
import { useAccount } from "../utils/AccountContext";

const CardManagement = () => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { account, loading, error } = useAccount();

  const prevCard = () => {
    if (account.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + account.length) % account.length);
    }
  };

  const nextCard = () => {
    if (account.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % account.length);
    }
  };

  if (loading) {
    return <p>Loading accounts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full h-full bg-white rounded-xl px-10 py-5">
      <div className="flex justify-between items-center mb-2 font-accent text-Grey-80 font-semibold">
        <h2 className="text-lg font-semibold">My Accounts</h2>
        <div className="flex gap-2">
          <button className="p-1 rounded-full">
            <IoMdAddCircleOutline
              className="w-6 h-6 text-Grey-80 hover:text-primary"
              onClick={() => setShowAddAccount(true)}
            />
          </button>
        </div>
      </div>

      {account.length > 0 ? (
        <>
          <div className="w-full flex flex-row items-center gap-2 justify-center mb-4">
            <button
              onClick={prevCard}
              className={`text-Grey-80 font-bold hover:text-primary transition ${
                account.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={account.length <= 1}
            >
              <FaArrowLeftLong className="w-6 h-6" />
            </button>
            <div className="relative w-72">
              <div className="absolute w-full h-full bg-blue-500 rounded-xl -rotate-6 z-0"></div>
              <div className="relative bg-primary p-4 rounded-xl z-10">
                <div className="flex justify-between items-start text-white">
                  <span className="uppercase font-medium">{account[currentIndex].accountType}</span>
                  <span className="font-medium">${account[currentIndex].accountBalance.toLocaleString()}</span>
                </div>
                <div className="mt-8 text-white">
                  <div className="mb-5">•••• •••• •••• {account[currentIndex].accountNumber.slice(-4)}</div>
                </div>
              </div>
            </div>
            <button
              onClick={nextCard}
              className={`text-Grey-80 font-bold hover:text-primary transition ${
                account.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={account.length <= 1}
            >
              <FaArrowRightLong className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-1 mb-4">
            {account.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex ? "bg-green-500" : "bg-gray-300"}`}></div>
            ))}
          </div>

          <div className="space-y-3 font-accent text-Grey-80 font-semibold border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Name</span>
              <span className="font-medium">{account[currentIndex].accountName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Account Type</span>
              <span className="font-medium">{account[currentIndex].accountType}</span>
            </div>
            <div className="pt-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Account Balance</span>
                <span className="font-medium">$ {account[currentIndex].accountBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No accounts available.</p>
      )}

      {showAddAccount && <AddAccountTable onClose={() => setShowAddAccount(false)} onSave={() => setShowAddAccount(false)} />}
    </div>
  );
};

export default CardManagement;
