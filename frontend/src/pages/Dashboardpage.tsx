import { Transaction } from '../types/transactionType';
import { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState, AppDispatch } from '../state/store';
import { fetchCategories} from '../state/category/CategorySlice';
import { fetchTransactions } from '../state/transaction/transactionSlice';
import { fetchAccounts } from '../state/accounts/accountSlice';
import { fetchBudgets } from '../state/burget/BurgetSlice';
import BalanceCard from '../components/BalanceCard';
import CardManagement from '../components/Cards-Acconts';
import ExpensesChart from '../components/charts/Expenses-chart';
import StatisticsChart from '../components/charts/Income-vs-Expenses-graph';
import CustomButton from '../components/CustomButton';
import TransactionsList from '../components/TransactionsList';
import AddTransactiontable from '../components/transaction/AddTransaction';
import Dropdown from '../components/Dropdawn';
import calculateTransactionSummary from '../utils/transactionSummary';

function Dashboardpage() {
  const dispatch: AppDispatch = useAppDispatch();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const { transactions } = useAppSelector((state: RootState) => state.transaction);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= sixMonthsAgo;
  });

  const { totalAmount: Total, prevMonthTotal: PrevTotal, differencePercentage: Percentage } =
    calculateTransactionSummary(recentTransactions);
  
    const calculateTotalsAndPercentages = (transactions: Transaction[], type: 'income' | 'expense' | 'saving') => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transaction.type === type && transactionDate >= sixMonthsAgo;
      });

      const total = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

      const previousSixMonthsAgo = new Date();
      previousSixMonthsAgo.setMonth(previousSixMonthsAgo.getMonth() - 12);

      const prevMonthTotal = transactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transaction.type === type &&
            transactionDate >= previousSixMonthsAgo &&
            transactionDate < sixMonthsAgo
          );
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const percentage = (total / (prevMonthTotal !== 0 ? prevMonthTotal : total)) * 100;

      return { total, prevMonthTotal, percentage };
    };
    
    const { total: incomeTotal, prevMonthTotal: incomePrevTotal, percentage: incomePercentage } =
      calculateTotalsAndPercentages(recentTransactions, 'income');
    
    const { total: expenseTotal, prevMonthTotal: expensePrevTotal, percentage: expensePercentage } =
      calculateTotalsAndPercentages(recentTransactions, 'expense');
    
    const { total: savingTotal, prevMonthTotal: savingPrevTotal, percentage: savingPercentage } =
      calculateTotalsAndPercentages(recentTransactions, 'saving');

  const handleSelect = (option: string) => {
    console.log('Selected option:', option);
  };

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
    <div className="p-8">
      <div className="flex sm:flex-col lg:flex-row items-center justify-between mb-5">
        <div className="text-2xl text-Grey-80 font-bold font-accent">Dashboard</div>
        <div className="flex flex-row gap-6">
          <Dropdown
            options={['Last 6 months']}
            placeholder="Last 6 months"
            onSelect={handleSelect}
          />
          <CustomButton
            title="Add transaction"
            containerstyle="py-2 px-8 text-Grey-5 bg-primary rounded-lg hover:bg-white hover:text-Grey-80 border border-primary"
            textstyle="text-lg font-medium"
            iconstyle="text-lg font-medium pr-2"
            icon={<IoMdAdd />}
            handlepress={() => setShowAddTransaction(true)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <BalanceCard
          title="Total income"
          total={incomeTotal || 0}
          percentage={incomePercentage || 0}
          prevtotal={incomePrevTotal || 0}
          trendstyles="bg-primary"
        />
        <BalanceCard
          title="Total expenses"
          total={expenseTotal || 0}
          percentage={expensePercentage || 0}
          prevtotal={expensePrevTotal || 0}
          trendstyles="bg-primary"
        />
        <BalanceCard
          title="Total Savings"
          total={savingTotal || 0}
          percentage={savingPercentage || 0}
          prevtotal={savingPrevTotal || 0}
          trendstyles="bg-primary"
        />
        <BalanceCard
          title="Total balance"
          total={Total || 0}
          percentage={Percentage || 0}
          prevtotal={PrevTotal || 0}
          trendstyles="bg-primary"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2">
          <StatisticsChart/>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 row-span-2">
          <ExpensesChart/>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 row-span-2">
          <CardManagement />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 row-span-3">
          <TransactionsList/>
        </div>
      </div>

      {showAddTransaction && <AddTransactiontable onClose={() => setShowAddTransaction(false)} />}
    </div>
  );
}

export default Dashboardpage;