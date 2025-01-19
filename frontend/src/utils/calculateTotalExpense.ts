interface Transaction {
    _id: string;
    userId: string;
    accountName: string;
    type: string;
    amount: number;
    categoryName: string;
    description: string;
    date: string; // Assuming it's ISO string
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface TransactionValues {
  userId: string;
  accountName: string;
  type: string;
  amount: string;
  categoryName: string;
  description: string;
  date: Date | null;
}
  interface ExpenseResult {
    categoryName: string;
    totalAmount: number;
  }
  
  const calculateTotalExpense = (
    transactions: Transaction[],
    startDate: string,
    endDate: string,
    categoryName: string
  ): ExpenseResult => {
    // Filter transactions for expenses, matching category name, and within the time frame
    const filteredTransactions = transactions.filter(transaction => {
      return (
        transaction.type === 'Expense' &&
        transaction.categoryName === categoryName &&
        new Date(transaction.date) >= new Date(startDate) &&
        new Date(transaction.date) <= new Date(endDate)
      );
    });
  
    // Calculate the total amount of filtered transactions
    const totalAmount = filteredTransactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  
    return {
      categoryName,
      totalAmount,
    };
  };
  
  export default calculateTotalExpense;
  