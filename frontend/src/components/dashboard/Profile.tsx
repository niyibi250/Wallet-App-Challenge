import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";


export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-row justify-between items-center gap-2 pb-3 pr-4 pl-8 pt-3 rounded-tl-lg font-accent">
      <div className="flex flex-row items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center"><span className="text-Grey-5">JS</span></div>
          <div className="text-lg text-Grey-100 font-bold">Jone Smith</div>
      </div>
      <FaAngleDown className="text-lg font-semibold text-Grey-100"/>
    </div>
  );
}
