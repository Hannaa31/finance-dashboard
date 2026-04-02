import { Calendar, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useFinance } from "../../context/FinanceContext";
import { getSpendingBreakdown } from "../../lib/chartData";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { formatCurrency } from "../../lib/utils";
import { differenceInDays, subDays } from "date-fns";

export function Insights() {
  const { transactions } = useFinance();
  
  // Highest Spending Category
  const spendingBreakdown = getSpendingBreakdown(transactions);
  const highestCategory = spendingBreakdown.length > 0 ? spendingBreakdown[0] : null;

  // Average Daily Spending (Last 30 days)
  const last30Days = subDays(new Date(), 30);
  const recentExpenses = transactions.filter(
    (tx) => tx.type === "expense" && new Date(tx.date) >= last30Days
  );

  const totalRecentExpenses = recentExpenses.reduce((sum, tx) => sum + tx.amount, 0);
  // Using actually exactly 30 days
  const avgDaily = totalRecentExpenses / 30;

  // Basic monthly comparison logic (comparing current month vs previous)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthExpenses = transactions.filter(
    (tx) => tx.type === "expense" && 
            new Date(tx.date).getMonth() === currentMonth && 
            new Date(tx.date).getFullYear() === currentYear
  ).reduce((sum, tx) => sum + tx.amount, 0);

  const prevMonthDate = new Date();
  prevMonthDate.setMonth(currentMonth - 1);
  const prevMonth = prevMonthDate.getMonth();
  const prevYear = prevMonthDate.getFullYear();

  const prevMonthExpenses = transactions.filter(
    (tx) => tx.type === "expense" && 
            new Date(tx.date).getMonth() === prevMonth && 
            new Date(tx.date).getFullYear() === prevYear
  ).reduce((sum, tx) => sum + tx.amount, 0);

  let percentChange = 0;
  if (prevMonthExpenses > 0) {
    percentChange = ((currentMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100;
  }

  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle>Financial Insights</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        {/* Insight 1: Highest Category */}
        <div className="flex flex-col space-y-2 rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-2 w-max rounded-md bg-red-100/50 p-2 dark:bg-red-500/10">
            <TrendingUp className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-xs text-muted-foreground uppercase opacity-80">Highest Spending Category</p>
          <p className="text-lg font-bold">
            {highestCategory ? highestCategory.name : "N/A"}
          </p>
          <p className="text-xs text-muted-foreground">
            {highestCategory ? formatCurrency(highestCategory.value) : "No expenses"}
          </p>
        </div>

        {/* Insight 2: Monthly Comparison */}
        <div className="flex flex-col space-y-2 rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-2 w-max rounded-md bg-green-100/50 p-2 dark:bg-green-500/10">
            <Calendar className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-xs text-muted-foreground uppercase opacity-80">Monthly Comparison</p>
          <p className="text-lg font-bold text-green-500">
            {percentChange > 0 ? "+" : ""}{percentChange.toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">vs last month ({formatCurrency(prevMonthExpenses)})</p>
        </div>

        {/* Insight 3: Avg Daily Spending */}
        <div className="flex flex-col space-y-2 rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-2 w-max rounded-md bg-blue-100/50 p-2 dark:bg-blue-500/10">
            <Wallet className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-xs text-muted-foreground uppercase opacity-80">Avg. Daily Spending</p>
          <p className="text-lg font-bold">
            {formatCurrency(avgDaily)}
          </p>
          <p className="text-xs text-muted-foreground">Last 30 days total: {formatCurrency(totalRecentExpenses)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
