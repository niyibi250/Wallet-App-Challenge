import { useState, useEffect } from "react";
import AccountCard from "../components/accounts/AccountCard";
import TransactionTable from "../components/accounts/TransactionTable";
import CustomButton from "../components/CustomButton";
import { IoMdAdd } from "react-icons/io";
import AddAccountTable from "../components/accounts/AddAcount";
import AddExpenseCategory from "../components/accounts/AddExpenseCategory";
import { useAppDispatch } from '../state/hooks';
import { AppDispatch } from '../state/store';
import { fetchAccounts } from '../state/accounts/accountSlice';
import { useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';
import { fetchCategories } from "../state/category/CategorySlice";
import { fetchTransactions } from "../state/transaction/transactionSlice";
import { fetchBudgets } from "../state/burget/BurgetSlice";

function Accountpage() {
    const dispatch: AppDispatch = useAppDispatch();
    const { accounts } = useAppSelector((state: RootState) => state.account);
    const { transactions } = useAppSelector((state: RootState) => state.transaction);
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    

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

      const findLastTransaction = (accountName: string) => {
        const accountTransactions = transactions.filter(transaction => transaction.account.accountName === accountName);
        console.log(`Transactions for ${accountName}:`, accountTransactions);
      
        if (accountTransactions.length === 0) {
          console.log(`No transactions found for account: ${accountName}`);
          return undefined;
        }
      
        const sortedTransactions = accountTransactions.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
      
        console.log(`Sorted transactions for ${accountName}:`, sortedTransactions);
      
        const lastTransaction = sortedTransactions[0];
        console.log(`Last transaction for ${accountName}:`, lastTransaction);
      
        return lastTransaction;
      }

  return (
    <div className=" p-8">
        <div className=" flex flex-row items-center justify-between mb-5">
            <div className="text-2xl text-Grey-80 font-bold font-accent">Accounts</div>
            <div className=" flex flex-row gap-6">
                <CustomButton
                    title='Add Category'
                    containerstyle=' py-2 px-8 bg-white rounded-lg border border-Grey-30 hover:border hover:border-primary'
                    textstyle='text-lg text-Grey-80 font-medium'
                    iconstyle='text-lg text-Grey-80 font-medium pr-2'
                    icon={<IoMdAdd/>}
                    handlepress={() => setShowAddCategory(true)}
                />
                <CustomButton
                    title='Add Account'
                    containerstyle=' py-2 px-8 bg-primary text-Grey-5 rounded-lg hover:bg-white hover:text-Grey-80 hover:border hover:border-primary'
                    textstyle='text-lg font-medium'
                    iconstyle='text-lg font-medium pr-2 '
                    icon={<IoMdAdd/>}
                    handlepress={() => setShowAddAccount(true)}
                />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {accounts.map((account) => {
                const lastTransaction = findLastTransaction(account.accountName);
                return (
                    <div className="sm:col-span-1" key={account.accountName}>
                    <AccountCard
                        bankName={account.accountName}
                        accountType={account.accountType}
                        balance={account.balance}
                        lastTransactionamount={lastTransaction ? lastTransaction.amount : 0}
                        lastTransactioncategory={lastTransaction ? lastTransaction.category.name : ''}
                        lastTransactiondate={lastTransaction ? lastTransaction.date : ''}
                    />
                    </div>
                );
            })} 
            <div className="sm:col-span-3">
                <TransactionTable/>
            </div>
        </div>
        {showAddAccount && <AddAccountTable onClose={()=>setShowAddAccount(false)}/> }
        {showAddCategory && <AddExpenseCategory onClose={()=>setShowAddCategory(false)} onSave={()=>setShowAddCategory(false)}/> }
    </div>
  )
}

export default Accountpage
