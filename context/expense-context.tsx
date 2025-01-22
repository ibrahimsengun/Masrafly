// context/ExpenseContext.tsx
'use client';

import {
  addExpenseAction,
  deleteExpenseAction,
  getExpensesAction,
  updateExpenseAction
} from '@/actions/expense-actions';
import { Expense, Filter, OrderEnum } from '@/types/expense';
import {
  createContext,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useSource } from './source-context';

interface ExpenseContextType {
  expenses: Expense[];
  currentFilters?: Filter;
  minAmount: number;
  maxAmount: number;
  totalAmount: number;
  setCurrentFilters: React.Dispatch<SetStateAction<Filter | undefined>>;
  refreshExpenses: () => Promise<void>;
  addExpense: (
    amount: number,
    description: string | null,
    date: string,
    categoryId: string | null,
    sourceId: string | null
  ) => Promise<void>;
  updateExpense: (
    expenseId: string,
    amount?: number,
    description?: string | null,
    date?: string,
    categoryId?: string | null,
    sourceId?: string | null
  ) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
  filterExpenses: (filter: Filter) => void;
  orderExpenses: (order: OrderEnum) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({
  children,
  initialExpenses,
  date
}: {
  children: ReactNode;
  initialExpenses: Expense[];
  date: { month: number; year: number };
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const { refreshSources } = useSource();
  const [currentFilters, setCurrentFilters] = useState<Filter>();

  useEffect(() => {
    setExpenses(initialExpenses);
  }, [initialExpenses]);

  useEffect(() => {
    if (currentFilters) filterExpenses(currentFilters);
  }, [currentFilters]);

  const refreshExpenses = async (method: 'add' | 'delete' | 'update' | 'empty' = 'empty') => {
    try {
      const _expenses = await getExpensesAction(date.month, date.year);
      setExpenses(_expenses);

      if (['add', 'update', 'delete'].includes(method)) refreshSources();
    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  };

  const filterExpenses = useCallback((filter: Filter) => {
    let filteredExpenses = initialExpenses;
    if ((filter.selectedCategoryIds?.length ?? 0) > 0) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        filter.selectedCategoryIds?.includes(expense.category?.id || '')
      );
    }
    if ((filter.selectedSourceIds?.length ?? 0) > 0) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => filter.selectedSourceIds?.includes(expense.source?.id || '') ?? false
      );
    }
    if (filter.minAmount) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.amount >= filter.minAmount!);
    }
    if (filter.maxAmount) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.amount <= filter.maxAmount!);
    }
    setExpenses(filteredExpenses);
  }, []);

  const addExpense = async (
    amount: number,
    description: string | null,
    date: string,
    categoryId: string | null,
    sourceId: string | null
  ) => {
    try {
      await addExpenseAction(amount, description, date, categoryId, sourceId);
      refreshExpenses('add');
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const updateExpense = async (
    expenseId: string,
    amount?: number,
    description?: string | null,
    date?: string,
    categoryId?: string | null,
    sourceId?: string | null
  ) => {
    try {
      await updateExpenseAction(expenseId, amount, description, date, categoryId, sourceId);
      refreshExpenses('update');
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  const deleteExpense = async (expenseId: string) => {
    try {
      await deleteExpenseAction(expenseId);
      refreshExpenses('delete');
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const orderExpenses = (order: OrderEnum) => {
    let sortedExpenses = [...expenses];
    switch (order) {
      case OrderEnum.DateNew:
        sortedExpenses = sortedExpenses.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case OrderEnum.DateOld:
        sortedExpenses = sortedExpenses.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case OrderEnum.AmountAsc:
        sortedExpenses = sortedExpenses.sort((a, b) => a.amount - b.amount);
        break;
      case OrderEnum.AmountDesc:
        sortedExpenses = sortedExpenses.sort((a, b) => b.amount - a.amount);
        break;
    }
    setExpenses(sortedExpenses);
  };

  const minAmount = useMemo(
    () => Math.min(...initialExpenses.map((expense) => expense.amount)),
    [initialExpenses]
  );

  const maxAmount = useMemo(
    () => Math.max(...initialExpenses.map((expense) => expense.amount)),
    [initialExpenses]
  );

  const totalAmount = useMemo(
    () => initialExpenses.reduce((acc, expense) => acc + expense.amount, 0),
    [initialExpenses]
  );

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        currentFilters,
        minAmount,
        maxAmount,
        totalAmount,
        setCurrentFilters,
        refreshExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        filterExpenses,
        orderExpenses
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};
