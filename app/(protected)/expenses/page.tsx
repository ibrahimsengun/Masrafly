import { getExpensesAction } from '@/actions/expense-actions';
import ExpenseDataTable from '@/components/expense-data-table';

export default async function ExpensesPage() {
  const expenses = await getExpensesAction();

  return <ExpenseDataTable expenses={expenses} />;
}
