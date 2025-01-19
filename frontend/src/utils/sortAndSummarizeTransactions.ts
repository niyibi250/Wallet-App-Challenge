interface TransactionValues {
  userId: string;
  accountName: string;
  type: string;
  amount: string;
  categoryName: string;
  description: string;
  date: Date | null;
}

interface SortedTransaction {
  type: string; // Transaction type: Income, Expense, Saving
  totalAmount: number; // Total amount for this transaction type
  prevMonthTotal: number; // Previous month's total amount for this transaction type
  differencePercentage: number; // Percentage difference between current month and previous month
  lastTransaction: TransactionValues | null; // Most recent transaction for this type
}

interface OverallBalances {
  totalBalance: number; // Total balance for all accounts this month
  prevMonthBalance: number; // Previous month's total balance for all accounts
  balanceDifferencePercentage: number; // Percentage difference between current and previous month's total balance
}

const sortAndSummarizeTransactions = (
  transactions: TransactionValues[]
): { sortedSummary: SortedTransaction[], overallBalances: OverallBalances } => {
  const groupedTransactions: Record<string, TransactionValues[]> = transactions.reduce(
    (acc, transaction) => {
      if (!acc[transaction.type]) {
        acc[transaction.type] = [];
      }
      acc[transaction.type].push(transaction);
      return acc;
    },
    {} as Record<string, TransactionValues[]>
  );

  const currentMonth = new Date().getMonth();
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const sortedSummary: SortedTransaction[] = Object.keys(groupedTransactions).map(
    (type) => {
      const typeTransactions = groupedTransactions[type];

      // Current month's total
      const totalAmount = typeTransactions.reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount),
        0
      );

      // Previous month's total
      const prevMonthTransactions = typeTransactions.filter(
        (transaction) =>
          transaction.date &&
          new Date(transaction.date).getMonth() === prevMonth
      );
      const prevMonthTotal = prevMonthTransactions.reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount),
        0
      );

      // Percentage difference
      const differencePercentage = prevMonthTotal > 0
        ? parseFloat((((totalAmount - prevMonthTotal) / prevMonthTotal) * 100).toFixed(2))
        : 0;

      // Most recent transaction
      const lastTransaction = typeTransactions.reduce((latest, transaction) => {
        if (!latest || (transaction.date && new Date(transaction.date) > new Date(latest.date!))) {
          return transaction;
        }
        return latest;
      }, null as TransactionValues | null);

      return {
        type,
        totalAmount,
        prevMonthTotal,
        differencePercentage,
        lastTransaction,
      };
    }
  );

  // Calculate overall balances
  const allTransactions = Object.values(groupedTransactions).flat();
  const currentMonthTotalBalance = allTransactions.reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount),
    0
  );

  const prevMonthTotalBalance = allTransactions.filter(
    (transaction) =>
      transaction.date &&
      new Date(transaction.date).getMonth() === prevMonth
  ).reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount),
    0
  );

  const balanceDifferencePercentage = prevMonthTotalBalance > 0
    ? ((currentMonthTotalBalance - prevMonthTotalBalance) / prevMonthTotalBalance) * 100
    : 0;

  const overallBalances: OverallBalances = {
    totalBalance: currentMonthTotalBalance,
    prevMonthBalance: prevMonthTotalBalance,
    balanceDifferencePercentage: parseFloat(balanceDifferencePercentage.toFixed(2))
  };

  return { sortedSummary, overallBalances };
};

export default sortAndSummarizeTransactions;
