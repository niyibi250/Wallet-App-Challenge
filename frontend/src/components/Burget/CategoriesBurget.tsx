import { FiMoreVertical } from "react-icons/fi";
const CategoryBudgets = () => {
  const categories = [
    {
      name: "Food",
      total: 1200,
      spent: 820,
      color: "#FF6B6B",
    },
    {
      name: "Utilities",
      total: 800,
      spent: 690,
      color: "#FFD93D",
    },
    {
      name: "Health",
      total: 400,
      spent: 160,
      color: "#4CAF50",
    },
    {
      name: "Car",
      total: 260,
      spent: 120,
      color: "#2196F3",
    },
    {
      name: "Else",
      total: 4590,
      spent: 1320,
      color: "#9C27B0",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-none bg-white rounded-lg shadow-lg border p-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-bold font-accent text-Grey-80 text-lg">Categories</h3>
          <button className="p-1 hover:border hover:border-primary rounded-full text-Grey-80">
            <FiMoreVertical/>
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          {categories.map((category, index) => {
            const remaining = category.total - category.spent;
            const progress = (category.spent / category.total) * 100;

            return (
              <div key={index} className="font-accent text-Grey-80 font-bold">
                {/* Category Info */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600">{category.name}</span>
                  <span className="font-medium">
                    $ {category.total.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-gray-100 rounded-full mb-1">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: category.color,
                    }}
                  ></div>
                </div>

                {/* Amount Details */}
                <div className="flex justify-between text-sm">
                  <div className="text-gray-500">
                    $ {category.spent.toLocaleString()}
                    <div className="text-xs">Spent</div>
                  </div>
                  <div className="text-gray-500 text-right">
                    $ {remaining.toLocaleString()}
                    <div className="text-xs">Left</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBudgets;
