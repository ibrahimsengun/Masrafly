import { getCategoryExpensesAction } from '@/actions/expense-actions';
import ExpenseList from '@/components/expense-list';
import ExpensesByCategory from '@/components/expenses-by-category';
import SourceSummary from '@/components/source-summary';

export default async function DashboardPage() {
  const expensesByCategory = await getCategoryExpensesAction();
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="col-span-2">
        <ExpenseList />
      </div>
      <div className="flex flex-col gap-4">
        <SourceSummary />
        <ExpensesByCategory data={expensesByCategory} />
      </div>
    </div>
  );
}
