import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BalanceCard from "@/components/cards/BalanceCard";
import MonthlySpendingCard from "@/components/cards/MonthlySpendingCard";
import CardPreview from "@/components/cards/CardPreview";
import BudgetUsageCard from "@/components/cards/BudgetUsageCard";

const CashBreakdownChart = dynamic(
  () => import("@/components/charts/CashBreakdownChart"),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const TransactionsTable = dynamic(
  () => import("@/components/tables/TransactionsTable"),
  { ssr: false, loading: () => <TableSkeleton /> }
);

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-card border border-brand-gray-100 p-6 h-[420px] animate-pulse">
      <div className="h-4 w-40 bg-brand-gray-100 rounded mb-6" />
      <div className="h-full bg-brand-gray-50 rounded-xl" />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-white rounded-card border border-brand-gray-100 p-6 animate-pulse">
      <div className="h-4 w-48 bg-brand-gray-100 rounded mb-6" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-12 bg-brand-gray-50 rounded mb-2" />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 lg:gap-6">
        {/* Row 1: Balance, Spending, Card + Budget */}
        <div className="xl:col-span-4">
          <BalanceCard />
        </div>
        <div className="xl:col-span-4">
          <MonthlySpendingCard />
        </div>
        <div className="xl:col-span-4 grid grid-cols-1 gap-4 lg:gap-6">
          <CardPreview />
        </div>

        {/* Row 2: Chart + Budget */}
        <div className="xl:col-span-8">
          <CashBreakdownChart />
        </div>
        <div className="xl:col-span-4">
          <BudgetUsageCard />
        </div>

        {/* Row 3: Transactions */}
        <div className="xl:col-span-12">
          <TransactionsTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
