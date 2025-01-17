import BalanceCard from "../components/BalanceCard";
import CardManagement from "../components/Cards-Acconts";
import ExpensesChart from "../components/charts/Expenses-chart";
import StatisticsChart from "../components/charts/Income-vs-Expenses-graph";
import CustomButton from "../components/CustomButton";
import Dropdown from "../components/Dropdawn"
import { IoMdAdd } from "react-icons/io";
import TransactionsList from "../components/TransactionsList";
import CashSummaryCard from "../components/CashSummaryCard";


function Dashboardpage() {
    const handleSelect = (value: string) => {
        console.log("Selected value:", value);
      };
  return (
    <div className=" p-8">
        <div className=" flex flex-row items-center justify-between mb-5">
            <div className="text-2xl text-Grey-80 font-bold font-accent">Dashboard</div>
            <div className=" flex flex-row gap-6">
                <Dropdown 
                options={['This week', 'Last week']}
                placeholder="This week"
                onSelect={handleSelect}/>
                <CustomButton
                title='Add transaction'
                containerstyle=' py-2 px-8 text-Grey-5  bg-primary rounded-lg hover:bg-white hover:text-Grey-80 border border-primary'
                textstyle='text-lg font-medium'
                iconstyle='text-lg font-medium pr-2'
                icon={<IoMdAdd/>}
                />
            </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
            <BalanceCard
            title= 'Total income'
            total= '22,645'
            pacentage= '30'
            prevtotal= '21,966'
            trendstyles= 'bg-primary'
            />
            <BalanceCard
            title= 'Total expenses'
            total= '22,645'
            pacentage= '30'
            prevtotal= '21,966'
            trendstyles= 'bg-primary'
            />
             <BalanceCard
            title= 'Total Savings'
            total= '22,645'
            pacentage= '30'
            prevtotal= '21,966'
            trendstyles= 'bg-primary'
            />
            <BalanceCard
            title= 'Total barance'
            total= '22,645'
            pacentage= '30'
            prevtotal= '21,966'
            trendstyles= 'bg-primary'
            />
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-5">
                <div className="col-start-1 col-span-2 row-start-1 row-span-2">
                    <StatisticsChart/>
                </div>
                <div className="col-start-3 col-end-4 row-start-1 row-span-2">
                    <ExpensesChart/>
                </div>
                <div className="col-start-4 col-end-5 row-start-1 row-span-2">
                    <CardManagement/>
                </div>
                <div className="col-start-1 col-span-4 row-start-3 row-span-3">
                    <TransactionsList/>
                </div>
        </div>
    </div>
  )
}

export default Dashboardpage