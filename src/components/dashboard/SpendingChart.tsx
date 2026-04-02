import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { getSpendingBreakdown } from "../../lib/chartData";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { formatCurrency } from "../../lib/utils";

const COLORS = ["#3b82f6", "#ef4444", "#eab308", "#22c55e", "#a855f7", "#f97316", "#14b8a6"];

export function SpendingChart() {
  const { transactions } = useFinance();
  const data = getSpendingBreakdown(transactions);

  return (
    <Card className="col-span-1 md:col-span-1">
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {data.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No expenses recorded.
          </div>
        ) : (
          <div className="h-[350px] w-full pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius="50%"
                  outerRadius="75%"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => formatCurrency(Number(value))}
                  contentStyle={{ 
                    borderRadius: "8px", 
                    border: "1px solid var(--color-border)", 
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-card-foreground)"
                  }}
                  itemStyle={{ color: "var(--color-card-foreground)" }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                  wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  iconSize={10} 
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
