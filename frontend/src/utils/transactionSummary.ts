import { Transaction } from '../types/transactionType';

type TransactionSummary = {
  totalAmount: number;
  prevMonthTotal: number;
  differencePercentage: number;
};

function calculateTransactionSummary(transactions: Transaction[] | undefined): TransactionSummary {
  if (!transactions) {
    return {
      totalAmount: 0,
      prevMonthTotal: 0,
      differencePercentage: 0,
    };
  }

  const currentMonth = new Date().getMonth();
  const previousSixMonthsAgo = new Date();
  previousSixMonthsAgo.setMonth(currentMonth - 12);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentMonth - 6);

  let totalAmount = 0;
  let prevMonthTotal = 0;

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const isCurrentMonth = transactionDate.getMonth() === currentMonth;
    const isPrevSixMonths = transactionDate >= previousSixMonthsAgo && transactionDate < sixMonthsAgo;

    if (isCurrentMonth) {
      totalAmount += transaction.amount;
    }

    if (isPrevSixMonths) {
      prevMonthTotal += transaction.amount;
    }
  });

  const differencePercentage = (totalAmount / (prevMonthTotal !== 0 ? prevMonthTotal : totalAmount)) * 100;

  return {
    totalAmount,
    prevMonthTotal,
    differencePercentage,
  };
}

export default calculateTransactionSummary;

