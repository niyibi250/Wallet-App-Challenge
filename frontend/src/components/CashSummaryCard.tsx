import { IoMdAddCircleOutline } from "react-icons/io";
import { GoPencil } from "react-icons/go";

const CashSummaryCard = () => {
  const cashData = [
    { category: 'Gifts', amount: 1200 },
    { category: 'Money box', amount: 720 },
    { category: 'Bonus', amount: 1068 },
  ];

  const totalCash = cashData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-full h-full rounded-lg shadow-lg border bg-white">
      <div className="px-10 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">My Cash</h2>
          <div className="flex gap-2">
            <button
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Edit"
            >
              <GoPencil className="w-4 h-4 text-gray-600" />
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100"
              aria-label="Clock"
            >
              <IoMdAddCircleOutline className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Cash Items */}
        <div className="space-y-3">
          {cashData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{item.category}</span>
              <span className="font-medium">
                $ {item.amount.toLocaleString()}
              </span>
            </div>
          ))}

          {/* Total */}
          <div className="pt-3 mt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">All Cash</span>
              <span className="font-semibold">
                $ {totalCash.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashSummaryCard;
