import { DashboardLayout } from "./components/layout/DashboardLayout";
import { SummaryCards } from "./components/dashboard/SummaryCards";
import { BalanceChart } from "./components/dashboard/BalanceChart";
import { SpendingChart } from "./components/dashboard/SpendingChart";
import { Insights } from "./components/dashboard/Insights";
import { TransactionList } from "./components/transactions/TransactionList";

function App() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 lg:gap-8">
        <SummaryCards />
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          <BalanceChart />
          <SpendingChart />
        </div>

        <Insights />
      </div>

      <TransactionList />
    </DashboardLayout>
  );
}

export default App;
