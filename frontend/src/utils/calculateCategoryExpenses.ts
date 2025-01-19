interface TransactionValues {
    userId: string;
    accountName: string;
    type: string;
    amount: string; // as string because of API response
    categoryName: string;
    description: string;
    date: Date | null;
  }
  
  interface CategoryExpenseResult {
    expenses: number[];
    categories: string[];
    totalExpense: number;
  }
  
  const calculateCategoryExpenses = (transactions: TransactionValues[], periodMonths: number): CategoryExpenseResult => {
    // Get the current month and calculate the desired period
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const desiredMonths = Array.from({ length: periodMonths }, (_, index) => 
      new Date(currentYear, currentMonth - index)
    );
  
    // Filter transactions based on the date within the desired period
    const filteredTransactions = transactions.filter(transaction => {
      if (!transaction.date) return false;
      return desiredMonths.some(month => 
        transaction.date &&
        new Date(transaction.date).getMonth() === month.getMonth() &&
        new Date(transaction.date).getFullYear() === month.getFullYear()
      );
    });
  
    // Group transactions by category and sum their amounts
    const groupedByCategory = filteredTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.categoryName]) {
        acc[transaction.categoryName] = 0;
      }
      acc[transaction.categoryName] += parseFloat(transaction.amount);
      return acc;
    }, {} as { [key: string]: number });
  
    const categories = Object.keys(groupedByCategory);
    const expenses = Object.values(groupedByCategory);
    const totalExpense = expenses.reduce((sum, value) => sum + value, 0);
  
    return { expenses, categories, totalExpense };
  };
  
  export default calculateCategoryExpenses;
  