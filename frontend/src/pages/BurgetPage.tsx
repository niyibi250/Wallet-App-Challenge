import CustomButton from "../components/CustomButton";
import Dropdown from "../components/Dropdawn"
import { IoMdAdd } from "react-icons/io";
import CategoryBudgets from "../components/Burget/CategoriesBurget";
import BudgetStatistics from "../components/Burget/BudgetStatistics";
import AddBudget from '../components/Burget/AddBudgetByCategory';
import { useState } from "react";


function BurgetPage() {
    const [showAdBurget, setShowAddBurget] = useState(false);
    const handleSelect = (value: string) => {
        console.log("Selected value:", value);
      };
  return (
    <div className=" p-8">
        <div className=" flex flex-row items-center justify-between mb-5">
            <div className="text-2xl text-Grey-80 font-bold font-accent">Burget</div>
            <div className=" flex flex-row gap-6">
                <Dropdown 
                options={['This week', 'Last week']}
                placeholder="March,2024"
                onSelect={handleSelect}/>
                <CustomButton
                title='Add Burget'
                containerstyle=' py-2 px-8 text-Grey-5 bg-primary rounded-lg hover:bg-white hover:text-Grey-80 border border-primary'
                textstyle='text-lg font-medium'
                iconstyle='text-lg font-medium pr-2'
                icon={<IoMdAdd/>}
                handlepress={() => setShowAddBurget(true)}
                />
            </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-5">
                <div className="col-start-3 col-end-5 row-start-1 row-span-2">
                    <BudgetStatistics/>
                </div>
                <div className="col-start-1 col-span-2 row-start-1 row-span-3">
                    <CategoryBudgets/>
                </div>
        </div>
        {showAdBurget && <AddBudget onClose={() => setShowAddBurget(false)} onSave={() => setShowAddBurget(false)} />}
    </div>
  )
}

export default BurgetPage