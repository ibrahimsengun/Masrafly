import { getCategoryExpensesAction, getExpensesAction } from '@/actions/expense-actions';
import ExpensesDashboard from '@/components/expenses-dashboard';
import { ExpenseProvider } from '@/context/expense-context';

type SearchParams = Promise<{ [key: string]: string }>;

export default async function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const month = params.month ? parseInt(params.month) : new Date().getMonth() + 1;
  const year = params.year ? parseInt(params.year) : new Date().getFullYear();

  const expenses = await getExpensesAction(month, year);
  const expensesByCategory = await getCategoryExpensesAction(month, year);

  return (
    <ExpenseProvider
      initialExpenses={expenses}
      initialExpensesByCategory={expensesByCategory}
      date={{ month, year }}
    >
      <ExpensesDashboard />
    </ExpenseProvider>
  );
}
