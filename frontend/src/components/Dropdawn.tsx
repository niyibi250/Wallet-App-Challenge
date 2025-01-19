
import { FaChevronDown } from "react-icons/fa";

import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  placeholder: string;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="bg-white flex flex-col items-center justify-center text-Grey-80 font-accent rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-row justify-between items-center py-2 px-4 text-lg font-semibold lg:gap-32"
        >
          {selectedOption || placeholder}
          <FaChevronDown/>
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-Grey-5 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="block px-4 py-2 text-lg font-semibold text-Grey-100 hover:bg-primary hover:text-gray-900 w-full text-left"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

