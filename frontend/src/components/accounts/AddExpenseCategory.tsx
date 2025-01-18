import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface AddExpenseCategoryCardProps {
  onClose: () => void;
  onSave: (categoryData: { categoryName: string; subcategories: string[] }) => void;
}

const AddExpenseCategory = ({ onClose, onSave }: AddExpenseCategoryCardProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>(['']);

  const handleSubcategoryChange = (index: number, value: string) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index] = value;
    setSubcategories(updatedSubcategories);
  };

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, '']);
  };

  const handleRemoveSubcategory = (index: number) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
  };

  const handleSave = () => {
    onSave({ categoryName, subcategories });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-Grey-80 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4">Add Category</h2>
          <IoCloseCircleOutline
            className="w-6 h-6 font-bold text-lg text-Grey-80 hover:text-primary"
            onClick={onClose}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-Grey-100 font-semibold">Category Name</label>
            <input
              type="text"
              className="w-full font-semibold text-lg border-2 rounded-lg p-2 mt-1 focus:border-primary focus:outline-none"
              value={categoryName}
              placeholder="Enter Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold text-Grey-100 mb-2">Subcategories</label>
            {subcategories.map((subcategory, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="w-full font-semibold text-lg border-2 rounded-lg p-2 focus:border-primary focus:outline-none"
                  value={subcategory}
                  placeholder="Enter Subcategory Name"
                  onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                />
                {subcategories.length > 1 && (
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveSubcategory(index)}
                  >
                    <AiOutlineMinus className="w-6 h-6" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddSubcategory}
              className="flex items-center font-semibold text-primary hover:text-Grey-100 mt-2"
            >
              <AiOutlinePlus className="w-5 h-5 mr-1 font-semibold" />
              Add Subcategory
            </button>
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

export default AddExpenseCategory;
