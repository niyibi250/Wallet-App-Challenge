import { useState } from "react";
import AccountCard from "../components/accounts/AccountCard";
import TransactionTable from "../components/accounts/TransactionTable";
import CustomButton from "../components/CustomButton";
import { IoMdAdd } from "react-icons/io";
import AddAccountTable from "../components/accounts/AddAcount";
import AddExpenseCategory from "../components/accounts/AddExpenseCategory";
import { useTransactions } from '../utils/TransactionsContext';
import sortAndSummarizeTransactions from "../utils/sortAndSummarizeTransactions";


function Accountpage() {
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const { transactions } = useTransactions();
    const { sortedSummary} = sortAndSummarizeTransactions(transactions);
    const Income = sortedSummary.find((transaction) => transaction.type === "Income");
    const Expenses = sortedSummary.find((transaction) => transaction.type === "Expense");
    const Savings = sortedSummary.find((transaction) => transaction.type === "Saving");


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
        <div className="grid grid-cols-3 gap-4">
                <div className="col-start-1 col-span-1">
                    <AccountCard
                        bankName="Income"
                        accountType=""
                        balance={Income?.totalAmount || 0}
                        lastTransactionamount= {Income?.lastTransaction?.amount}
                        lastTransactioncategory= {Income?.lastTransaction?.categoryName}
                        lastTransactiondate= { Income?.lastTransaction?.date}
                    />
                </div>
                <div className="col-start-2 col-span-1">
                    <AccountCard
                        bankName="Expense"
                        accountType=""
                        balance={Expenses?.totalAmount || 0}
                        lastTransactionamount= {Expenses?.lastTransaction?.amount}
                        lastTransactioncategory= {Expenses?.lastTransaction?.categoryName}
                        lastTransactiondate= { Expenses?.lastTransaction?.date}
                    />
                </div>
                <div className="col-start-3 col-span-1">
                    <AccountCard
                        bankName="Saving"
                        accountType=""
                        balance={Savings?.totalAmount || 0}
                        lastTransactionamount= {Savings?.lastTransaction?.amount}
                        lastTransactioncategory= {Savings?.lastTransaction?.categoryName}
                        lastTransactiondate= { Savings?.lastTransaction?.date}
                    />
                </div>
                <div className="col-start-1 col-span-3">
                    <TransactionTable/>
                </div>
        </div>
        {showAddAccount && <AddAccountTable onClose={()=>setShowAddAccount(false)} onSave={()=>setShowAddAccount(false)}/> }
        {showAddCategory && <AddExpenseCategory onClose={()=>setShowAddCategory(false)} onSave={()=>setShowAddCategory(false)}/> }
    </div>
  )
}

export default Accountpage