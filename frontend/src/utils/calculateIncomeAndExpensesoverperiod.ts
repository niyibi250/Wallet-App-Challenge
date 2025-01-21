import { Transaction } from "../types/transactionType";

type IncomeExpenseData = {
  month: string;
  [key: string]: number | string;
};

export const prepareIncomeExpenseDataForGraph = (
  transactions: Transaction[],
  periodMonths: number
): IncomeExpenseData[] => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const desiredMonths = Array.from({ length: periodMonths }, (_, index) =>
    new Date(currentYear, currentMonth - index)
  );

  const months = desiredMonths.map((month) =>
    month.toLocaleString("default", { month: "short" })
  );

  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction.date) return false;
    const transactionDate = new Date(transaction.date);
    return desiredMonths.some(
      (month) =>
        transactionDate.getMonth() === month.getMonth() &&
        transactionDate.getFullYear() === month.getFullYear()
    );
  });

  const groupedData: { [key: string]: Transaction[] } = filteredTransactions.reduce((acc, transaction) => {
    const key = transaction.type;
    const validKey = typeof key === "string" ? key : JSON.stringify(key);
    if (!acc[validKey]) {
      acc[validKey] = [];
    }
    acc[validKey].push(transaction);
    return acc;
  }, {} as { [key: string]: Transaction[] });

  const data: IncomeExpenseData[] = months.map((month, index) => {
    const monthStartDate = desiredMonths[index];
    const monthData: IncomeExpenseData = { month };

    for (const key in groupedData) {
      const total = groupedData[key]
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() === monthStartDate.getMonth() &&
            transactionDate.getFullYear() === monthStartDate.getFullYear()
          );
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      monthData[key] = total || 0;
    }

    return monthData;
  });

  return data;
};

