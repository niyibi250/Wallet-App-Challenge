import { useEffect } from "react";
import StatisticsChart from "../components/charts/Income-vs-Expenses-graph";
import Dropdown from "../components/Dropdawn"
import BudgetStatisticsChart from "../components/report/BudgetStatisticsChart";
import ExpensesCompared from "../components/report/ExpensesCompared";
import IncomeExpensesChart from "../components/report/IncomeExpensesChart";
import { useAppDispatch } from '../state/hooks';
import { AppDispatch } from '../state/store';
import { fetchCategories } from "../state/category/CategorySlice";
import { fetchAccounts } from "../state/accounts/accountSlice";
import { fetchTransactions } from "../state/transaction/transactionSlice";
import { fetchBudgets } from "../state/burget/BurgetSlice";

function Reportpage() {
    const dispatch: AppDispatch = useAppDispatch();
    useEffect(() => {
        const loadData = async () => {
          try {
            await dispatch(fetchCategories());
            await dispatch(fetchAccounts());
            await dispatch(fetchTransactions());
            await dispatch(fetchBudgets());
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
    
        loadData();
      }, [dispatch]);
    const handleSelect = (value: string) => {
        console.log("Selected value:", value);
      };
  return (
    <div className=" p-8">
        <div className=" flex flex-row items-center justify-between mb-5">
            <div className="text-2xl text-Grey-80 font-bold font-accent">Roport</div>
            <div className=" flex flex-row gap-6">
                <Dropdown 
                options={['This month','6 months', '12 months', '24 months']}
                placeholder="This months"
                onSelect={handleSelect}/>
            </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-5">
                <div className="col-start-1 col-span-2 row-start-1 row-span-2">
                    <IncomeExpensesChart/>
                </div>
                <div className="col-start-3 col-span-2 row-start-1 row-span-2">
                    <StatisticsChart/>
                </div>
                <div className="col-start-1 col-span-2 row-start-3 row-span-2">
                    <ExpensesCompared/>
                </div>
                <div className="col-start-3 col-span-2 row-start-3 row-span-2">
                    <BudgetStatisticsChart/>
                </div>
        </div>
    </div>
  )
}

export default Reportpage