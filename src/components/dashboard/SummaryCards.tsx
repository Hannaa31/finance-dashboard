import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { useFinance } from "../../context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { formatCurrency } from "../../lib/utils";

export function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Total Balance
          </CardTitle>
          <div className="rounded-md bg-blue-100/50 p-2 dark:bg-blue-500/10">
            <Wallet className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold sm:text-3xl">
            {formatCurrency(totalBalance)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Total Income
          </CardTitle>
          <div className="rounded-md bg-green-100/50 p-2 dark:bg-green-500/10">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500 sm:text-3xl">
            {formatCurrency(totalIncome)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Total Expenses
          </CardTitle>
          <div className="rounded-md bg-red-100/50 p-2 dark:bg-red-500/10">
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500 sm:text-3xl">
            {formatCurrency(totalExpenses)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
