import { getCategoryExpensesAction, getExpensesAction } from '@/actions/expense-actions';
import ExpenseList from '@/components/expense-list';
import ExpensesByCategory from '@/components/expenses-by-category';
import SourceSummary from '@/components/source-summary';
import { ExpenseProvider } from '@/context/expense-context';

export default async function DashboardPage({
  searchParams
}: {
  searchParams: { month?: string; year?: string };
}) {
  const params = await searchParams;
  const month = params.month ? parseInt(params.month) : new Date().getMonth();
  const year = params.year ? parseInt(params.year) : new Date().getFullYear();

  const expenses = await getExpensesAction(month, year);
  const expensesByCategory = await getCategoryExpensesAction();
  return (
    <ExpenseProvider initialExpenses={expenses} initialExpensesByCategory={expensesByCategory}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="md:col-span-2">
          <ExpenseList />
        </div>
        <div className="flex flex-col gap-4">
          <SourceSummary />
          <ExpensesByCategory />
        </div>
      </div>
    </ExpenseProvider>
  );
}
