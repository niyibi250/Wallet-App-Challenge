interface TransactionValues {
    userId: string;
    accountName: string;
    type: string;
    amount: string;
    categoryName: string;
    description: string;
    date: Date | null;
  }
  const sortTransactionsByRecent = (transactions: TransactionValues[]): TransactionValues[] => {
    return [...transactions].sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  };
  
  
  
  export default sortTransactionsByRecent;