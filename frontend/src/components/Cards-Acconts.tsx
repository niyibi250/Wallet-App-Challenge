import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

const CardManagement = () => {
  // Sample data
  const cardData = {
    cardNumber: '4156',
    expiryDate: '10/25',
    balance: 2640,
    totalBalance: 5447,
    cardName: 'Salary',
    cardType: 'Debit',
  };

  return (
    <div className="w-full h-full bg-white rounded-xl px-10 py-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 font-accent text-Grey-80 font-semibold">
        <h2 className="text-lg font-semibold">My Accounts</h2>
        <div className="flex gap-2">
          <button className="p-1 rounded-full">
            <IoMdAddCircleOutline className="w-6 h-6 text-Grey-80 hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Card Preview */}
      <div className="flex flex-row items-center gap-2">
        <FaArrowLeftLong className="text-Grey-80 font-accent font-bold hover:text-primary"/>
        <div className="relative mb-4 w-60 ">
          <div className="absolute w-full h-full bg-green-400 rounded-xl -rotate-6 z-0"></div>
          <div className="relative bg-cyan-400 p-4 rounded-xl z-10">
            <div className="flex justify-between items-start text-white">
              <span className="uppercase font-medium">Bank</span>
              <span className="font-medium">${cardData.balance.toLocaleString()}</span>
            </div>
            <div className="mt-8 text-white">
              <div className="mb-5">•••• •••• •••• {cardData.cardNumber}</div>
            </div>
          </div>
        </div>
        <FaArrowRight className="text-Grey-80 font-accent font-bold hover:text-primary"/>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-1 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
      </div>

      {/* Card Details */}
      <div className="space-y-3 font-accent text-Grey-80 font-semibold">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Card Name</span>
          <span className="font-medium">{cardData.cardName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Account Balance</span>
          <span className="font-medium">{cardData.cardType}</span>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between">
            <span className="text-gray-600">All Cards</span>
            <span className="font-medium">$ {cardData.totalBalance.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardManagement;
