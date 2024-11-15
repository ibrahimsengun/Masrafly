import ExpenseList from '@/components/expense-list';

export default async function DashboardPage() {
  return (
    <div className="w-full">
      <ExpenseList />
    </div>
  );
}
