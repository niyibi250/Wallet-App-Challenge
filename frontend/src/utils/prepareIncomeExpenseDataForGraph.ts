import { Transaction } from "../types/transactionType";

type IncomeExpenseData = {
  month: string;
  income: number;
  expense: number;
};

const prepareIncomeExpenseDataForGraph = (
  transactions: Transaction[],
  periodMonths: number
): IncomeExpenseData[] => {
  const desiredMonths = Array.from({ length: periodMonths }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - index);
    return date;
  });

  const months = desiredMonths.map((date) =>
    date.toLocaleString("default", { month: "short" })
  );

  const validTransactions = transactions.filter((transaction) => {
    if (!transaction.date) return false;
    const transactionDate = new Date(transaction.date);
    return !isNaN(transactionDate.getTime());
  });

  const groupedData: { [key: string]: Transaction[] } = validTransactions.reduce(
    (acc, transaction) => {
      const type = transaction.type.toLowerCase();
      if (!acc[type]) acc[type] = [];
      acc[type].push(transaction);
      return acc;
    },
    {} as { [key: string]: Transaction[] }
  );

  const data: IncomeExpenseData[] = months.map((month, index) => {
    const monthStartDate = desiredMonths[index];

    const totalIncome =
      groupedData["income"]?.reduce(
        (sum, t) =>
          new Date(t.date).getMonth() === monthStartDate.getMonth() &&
          new Date(t.date).getFullYear() === monthStartDate.getFullYear()
            ? sum + t.amount
            : sum,
        0
      ) || 0;

    const totalExpense =
      groupedData["expense"]?.reduce(
        (sum, t) =>
          new Date(t.date).getMonth() === monthStartDate.getMonth() &&
          new Date(t.date).getFullYear() === monthStartDate.getFullYear()
            ? sum + t.amount
            : sum,
        0
      ) || 0;

    return {
      month,
      income: totalIncome,
      expense: totalExpense,
    };
  });

  return data;
};

export default prepareIncomeExpenseDataForGraph;

