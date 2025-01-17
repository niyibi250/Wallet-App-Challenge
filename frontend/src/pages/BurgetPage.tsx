import CustomButton from "../components/CustomButton";
import Dropdown from "../components/Dropdawn"
import { IoMdAdd } from "react-icons/io";
import BudgetProgressCard from "../components/Burget/BurgetProgressCard";
import CategoryBudgets from "../components/Burget/CategoriesBurget";
import BudgetStatistics from "../components/Burget/BudgetStatistics";


function BurgetPage() {
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
                />
            </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-5">
                <div className="col-start-1 col-end-3 row-start-1 row-span-1">
                    <BudgetProgressCard/>
                </div>
                <div className="col-start-3 col-end-5 row-start-1 row-span-2">
                    <BudgetStatistics/>
                </div>
                <div className="col-start-1 col-span-2 row-start-2 row-span-3">
                    <CategoryBudgets/>
                </div>
        </div>
    </div>
  )
}

export default BurgetPage