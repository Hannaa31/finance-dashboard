import { format } from "date-fns";
import { Transaction } from "../types/finance";

export function getBalanceHistory(transactions: Transaction[]) {
  // Sort from oldest to newest
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let currentBalance = 0;
  const historyMap = new Map<string, number>();

  sorted.forEach((tx) => {
    if (tx.type === "income") {
      currentBalance += tx.amount;
    } else {
      currentBalance -= tx.amount;
    }
    
    // Group by Month (e.g., "Nov 2025")
    const monthKey = format(new Date(tx.date), "MMM yyyy");
    // Update map with the latest balance for that month
    historyMap.set(monthKey, currentBalance);
  });

  const history = Array.from(historyMap.entries()).map(([month, balance]) => ({
    month,
    balance,
  }));

  return history;
}

export function getSpendingBreakdown(transactions: Transaction[]) {
  const expenseTransactions = transactions.filter((tx) => tx.type === "expense");
  const categoryMap = new Map<string, number>();

  expenseTransactions.forEach((tx) => {
    const current = categoryMap.get(tx.category) || 0;
    categoryMap.set(tx.category, current + tx.amount);
  });

  // Sort by highest spending
  const breakdown = Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return breakdown;
}
