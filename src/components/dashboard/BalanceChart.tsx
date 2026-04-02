import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../lib/utils";
import { useFinance } from "../../context/FinanceContext";
import { getBalanceHistory } from "../../lib/chartData";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function BalanceChart() {
  const { transactions } = useFinance();
  const data = getBalanceHistory(transactions);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Balance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: "#888888" }} 
                dy={10}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                tick={{ fontSize: 12, fill: "#888888" }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-card)", color: "var(--color-card-foreground)" }}
                formatter={(value: any) => [`${formatCurrency(Number(value))}`, "Balance"]} 
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
