import { FiMoreVertical } from "react-icons/fi";
const BudgetProgressCard = () => {
  const budgetData = {
    total: 7250,
    spent: 3040,
    remaining: 4210,
  };

  // Calculate the percentage spent
  const spentPercentage = (budgetData.spent / budgetData.total) * 100;

  return (
    <div className="w-full h-full flex items-center justify-center font-main">
      <div className="w-full h-full max-w-none bg-white rounded-lg shadow-lg border p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-Grey-80">Total Budget</h2>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-Grey-100">
              $ {budgetData.total.toLocaleString()}
            </span>
            <button
              className="p-1 rounded-full hover:border hover:border-primary"
              aria-label="More Options"
            >
              <FiMoreVertical/>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-5 bg-Greenish rounded-full mb-5">
          <div
            className="absolute left-0 top-0 h-full bg-primary rounded-full"
            style={{ width: `${spentPercentage}%` }}
          ></div>
        </div>

        {/* Amount Labels */}
        <div className="flex justify-between font-accent">
          <div>
            <div className="font-bold text-Grey-80">
              $ {budgetData.spent.toLocaleString()}
            </div>
            <div className="text-Grey-80 font-semibold font-accent">Spent</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-Grey-80">
              $ {budgetData.remaining.toLocaleString()}
            </div>
            <div className="text-Grey-80 font-semibold font-accent">Left</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgressCard;
