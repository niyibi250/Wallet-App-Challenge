interface TransactionValues {
    userId: string;
    accountName: string;
    type: string;
    amount: string; // as string because of API response
    categoryName: string;
    description: string;
    date: Date | null;
  }
  
  interface CurrentPrevMonthExpenseResult {
    currentMonthExpenses: number[];
    prevMonthExpenses: number[];
    categories: string[];
  }
  
  const calculateCategoryExpensesCurrentPrevMonth = (transactions: TransactionValues[]): CurrentPrevMonthExpenseResult => {
    // Get the current and previous month/year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
    // Helper function to filter transactions by month and year
    const filterTransactionsByMonth = (year: number, month: number) => {
      return transactions.filter(transaction => {
        if (!transaction.date) return false;
        const transDate = new Date(transaction.date);
        return transDate.getFullYear() === year && transDate.getMonth() === month;
      });
    };
  
    // Filter transactions for current and previous months
    const currentMonthTransactions = filterTransactionsByMonth(currentYear, currentMonth);
    const prevMonthTransactions = filterTransactionsByMonth(prevYear, prevMonth);
  
    // Group transactions by category and sum their amounts
    const groupAndSumByCategory = (transactions: TransactionValues[]) => {
      const groupedByCategory = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.categoryName]) {
          acc[transaction.categoryName] = 0;
        }
        acc[transaction.categoryName] += parseFloat(transaction.amount);
        return acc;
      }, {} as { [key: string]: number });
  
      return {
        categories: Object.keys(groupedByCategory),
        expenses: Object.values(groupedByCategory),
      };
    };
  
    const currentMonthResult = groupAndSumByCategory(currentMonthTransactions);
    const prevMonthResult = groupAndSumByCategory(prevMonthTransactions);
  
    const categories = currentMonthResult.categories.length > 0 ? currentMonthResult.categories : prevMonthResult.categories;
    const currentMonthExpenses = currentMonthResult.expenses.length > 0 ? currentMonthResult.expenses : prevMonthResult.expenses;
    const prevMonthExpenses = prevMonthResult.expenses;
  
    return { currentMonthExpenses, prevMonthExpenses, categories };
  };
  
  export default calculateCategoryExpensesCurrentPrevMonth;
  