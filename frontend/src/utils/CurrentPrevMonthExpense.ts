import {Transaction} from "../types/transactionType";

const calculateCategoryExpensesCurrentPrevMonth = (transactions: Transaction[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthStart = new Date(currentYear, currentMonth, 1);
  const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);

  const prevMonthStart = new Date(currentYear, currentMonth - 1, 1);
  const prevMonthEnd = new Date(currentYear, currentMonth, 0);

  const currentMonthExpenses: { [key: string]: number } = {};
  const prevMonthExpenses: { [key: string]: number } = {};

  const addExpense = (expenseMap: { [key: string]: number }, category: string, amount: number): void => {
    if (!expenseMap[category]) {
      expenseMap[category] = 0;
    }
    expenseMap[category] += amount;
  };

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const category = transaction.category.name;
    const amount = transaction.amount;

    if (transactionDate >= currentMonthStart && transactionDate <= currentMonthEnd) {
      addExpense(currentMonthExpenses, category, amount);
    }

    if (transactionDate >= prevMonthStart && transactionDate <= prevMonthEnd) {
      addExpense(prevMonthExpenses, category, amount);
    }
  });

  const categories = [
    ...new Set([
      ...Object.keys(currentMonthExpenses),
      ...Object.keys(prevMonthExpenses),
    ]),
  ];

  const currentMonthExpensesArray = categories.map((category) => currentMonthExpenses[category] || 0);
  const prevMonthExpensesArray = categories.map((category) => prevMonthExpenses[category] || 0);

  return {
    currentMonthExpenses: currentMonthExpensesArray,
    prevMonthExpenses: prevMonthExpensesArray,
    categories,
  };
};

export default calculateCategoryExpensesCurrentPrevMonth;
