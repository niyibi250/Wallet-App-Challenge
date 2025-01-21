import TransactionHistory from "../components/transaction/TransactionHistory";
import { useAppDispatch } from '../state/hooks';
import { AppDispatch } from '../state/store';
import { fetchCategories } from "../state/category/CategorySlice";
import { fetchAccounts } from "../state/accounts/accountSlice";
import { fetchTransactions } from "../state/transaction/transactionSlice";
import { fetchBudgets } from "../state/burget/BurgetSlice";
import { useEffect } from "react";

function TransactionPage() {
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
  return (
    <div className=" p-8">
        <div className="flex flex-col mt-5">
            <TransactionHistory/>
        </div>
    </div>
  )
}

export default TransactionPage