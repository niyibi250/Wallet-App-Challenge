import BalanceCard from "../components/BalanceCard";
import CardManagement from "../components/Cards-Acconts";
import ExpensesChart from "../components/charts/Expenses-chart";
import StatisticsChart from "../components/charts/Income-vs-Expenses-graph";
import CustomButton from "../components/CustomButton";
import { IoMdAdd } from "react-icons/io";
import TransactionsList from "../components/TransactionsList";
import { useState } from "react";
import AddTransactiontable from "../components/transaction/AddTransaction";
import sortAndSummarizeTransactions from "../utils/sortAndSummarizeTransactions";
import { useTransactions } from '../utils/TransactionsContext';



function Dashboardpage() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const { transactions } = useTransactions();
  const { sortedSummary, overallBalances } = sortAndSummarizeTransactions(transactions);
  const Income = sortedSummary.find((transaction) => transaction.type === "Income");
  const Expenses = sortedSummary.find((transaction) => transaction.type === "Expense");
  const Savings = sortedSummary.find((transaction) => transaction.type === "Saving");

  return (
    <div className="p-8">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="text-2xl text-Grey-80 font-bold font-accent">Dashboard</div>
        <div className="flex flex-row gap-6">
          <CustomButton
            title='Add transaction'
            containerstyle='py-2 px-8 text-Grey-5  bg-primary rounded-lg hover:bg-white hover:text-Grey-80 border border-primary'
            textstyle='text-lg font-medium'
            iconstyle='text-lg font-medium pr-2'
            icon={<IoMdAdd />}
            handlepress={() => setShowAddTransaction(true)}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <BalanceCard
          title='Total income'
          total={Income?.totalAmount || 0}
          pacentage={Income?.differencePercentage || 0}
          prevtotal={Income?.prevMonthTotal || 0}
          trendstyles='bg-primary'
        />
        <BalanceCard
          title='Total expenses'
          total={Expenses?.totalAmount || 0}
          pacentage={Expenses?.differencePercentage || 0}
          prevtotal={Expenses?.prevMonthTotal || 0}
          trendstyles='bg-primary'
        />
        <BalanceCard
          title='Total Savings'
          total={Savings?.totalAmount || 0}
          pacentage={Savings?.differencePercentage || 0}
          prevtotal={Savings?.prevMonthTotal || 0}
          trendstyles='bg-primary'
        />
        <BalanceCard
          title='Total balance'
          total={overallBalances.totalBalance}
          pacentage={overallBalances.balanceDifferencePercentage}
          prevtotal={overallBalances.prevMonthBalance}
          trendstyles='bg-primary'
        />
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-5">
        <div className="col-start-1 col-span-2 row-start-1 row-span-2">
          <StatisticsChart />
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-span-2">
          <ExpensesChart />
        </div>
        <div className="col-start-4 col-end-5 row-start-1 row-span-2">
          <CardManagement />
        </div>
        <div className="col-start-1 col-span-4 row-start-3 row-span-3">
          <TransactionsList />
        </div>
      </div>
      {showAddTransaction && <AddTransactiontable onClose={() => setShowAddTransaction(false)} onSave={() => setShowAddTransaction(false)} />}
    </div>
  )
}

export default Dashboardpage;
