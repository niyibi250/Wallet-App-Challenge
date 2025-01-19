interface TransactionValues {
    userId: string;
    accountName: string;
    type: string;
    amount: string; // as string because of API response
    categoryName: string;
    description: string;
    date: Date | null;
  }
  
  const calculateIncomeAndExpenses = (transactions: TransactionValues[], periodMonths: number): { income: number[], expenses: number[], months: string[] } => {
  
    // Get the current month and calculate the desired period
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const desiredMonths = Array.from({ length: periodMonths }, (_, index) => 
      new Date(currentYear, currentMonth - index)
    );
  
    // Generate abbreviated month names
    const months = desiredMonths.map(month => month.toLocaleString('default', { month: 'short' }));
  
    const filteredTransactions = transactions.filter(transaction => {
      if (!transaction.date) return false;
      return desiredMonths.some(month => 
        transaction.date &&
        new Date(transaction.date).getMonth() === month.getMonth() &&
        new Date(transaction.date).getFullYear() === month.getFullYear()
      );
    });
  
    // Ensure the accumulator has a valid structure
    const groupedData: { [key: string]: TransactionValues[] } = filteredTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.type]) {
        acc[transaction.type] = [];
      }
      acc[transaction.type].push(transaction);
      return acc;
    }, {} as { [key: string]: TransactionValues[] });
  
    const incomeData = groupedData["Income"]?.map(t => parseFloat(t.amount)) || [];
    const expensesData = groupedData["Expense"]?.map(t => parseFloat(t.amount)) || [];
  
    // Calculate the total income and expenses for each month
    const income = new Array(periodMonths).fill(0).map((_, index) => 
      incomeData.filter(_value => 
        new Date(filteredTransactions[index]?.date || '').getMonth() === currentMonth - index
      ).reduce((sum, value) => sum + value, 0)
    );
  
    const expenses = new Array(periodMonths).fill(0).map((_, index) => 
      expensesData.filter(_value => 
        new Date(filteredTransactions[index]?.date || '').getMonth() === currentMonth - index
      ).reduce((sum, value) => sum + value, 0)
    );
  
    return { income, expenses, months };
  };
  
  export default calculateIncomeAndExpenses;
  