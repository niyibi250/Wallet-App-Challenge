import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import AddAccountTable from "./accounts/AddAcount";

const CardManagement = () => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardData = [
    {
      cardNumber: '4156',
      expiryDate: '10/25',
      balance: 2640,
      totalBalance: 5447,
      cardName: 'Salary',
      cardType: 'Debit',
    },
    {
      cardNumber: '4157',
      expiryDate: '12/24',
      balance: 1000,
      totalBalance: 6447,
      cardName: 'Credit',
      cardType: 'Credit',
    },
    {
      cardNumber: '4158',
      expiryDate: '1/20',
      balance: 2000,
      totalBalance: 7447,
      cardName: 'Savings',
      cardType: 'Savings',
    },
  ];

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  return (
    <div className="w-full h-full bg-white rounded-xl px-10 py-5">
      <div className="flex justify-between items-center mb-2 font-accent text-Grey-80 font-semibold">
        <h2 className="text-lg font-semibold">My Accounts</h2>
        <div className="flex gap-2">
          <button className="p-1 rounded-full">
            <IoMdAddCircleOutline className="w-6 h-6 text-Grey-80 hover:text-primary" onClick={() => setShowAddAccount(true)} />
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <FaArrowLeftLong className="text-Grey-80 font-accent font-bold hover:text-primary" onClick={prevCard} />
        <div className="relative mb-4 w-60">
          <div className="absolute w-full h-full bg-Blue rounded-xl -rotate-6 z-0"></div>
          <div className="relative bg-primary p-4 rounded-xl z-10">
            <div className="flex justify-between items-start text-white">
              <span className="uppercase font-medium">Bank</span>
              <span className="font-medium">${cardData[currentIndex].balance.toLocaleString()}</span>
            </div>
            <div className="mt-8 text-white">
              <div className="mb-5">•••• •••• •••• {cardData[currentIndex].cardNumber}</div>
            </div>
          </div>
        </div>
        <FaArrowRightLong className="text-Grey-80 font-accent font-bold hover:text-primary" onClick={nextCard} />
      </div>

      <div className="flex justify-center gap-1 mb-4">
        {cardData.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        ))}
      </div>

      <div className="space-y-3 font-accent text-Grey-80 font-semibold border-t">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Card Name</span>
          <span className="font-medium">{cardData[currentIndex].cardName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Account Balance</span>
          <span className="font-medium">{cardData[currentIndex].cardType}</span>
        </div>
        <div className="pt-2">
          <div className="flex justify-between">
            <span className="text-gray-600">All Cards</span>
            <span className="font-medium">$ {cardData[currentIndex].totalBalance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {showAddAccount && <AddAccountTable onClose={() => setShowAddAccount(false)} onSave={() => setShowAddAccount(false)} />}
    </div>
  );
};

export default CardManagement;

