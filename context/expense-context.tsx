// context/ExpenseContext.tsx
'use client';

import {
  addExpenseAction,
  deleteExpenseAction,
  getCategoryExpensesAction,
  getExpensesAction,
  updateExpenseAction
} from '@/actions/expense-actions';
import { Expense, ExpenseByCategory, Filter } from '@/types/expense';
import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSource } from './source-context';

interface ExpenseContextType {
  expenses: Expense[];
  expenseByCategory: ExpenseByCategory[];
  isLoading: boolean;
  currentFilters?: Filter;
  minAmount: number;
  maxAmount: number;
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
  getCategoryExpenses: () => Promise<ExpenseByCategory[] | undefined>;
  filterExpenses: (filter: Filter) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({
  children,
  initialExpenses,
  initialExpensesByCategory,
  date
}: {
  children: ReactNode;
  initialExpenses: Expense[];
  initialExpensesByCategory: ExpenseByCategory[];
  date: { month: number; year: number };
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [expenseByCategory, setExpenseByCategory] =
    useState<ExpenseByCategory[]>(initialExpensesByCategory);
  const { refreshSources } = useSource();
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<Filter>();

  useEffect(() => {
    setExpenses(initialExpenses);
  }, [initialExpenses]);

  useEffect(() => {
    setExpenseByCategory(initialExpensesByCategory);
  }, [initialExpensesByCategory]);

  const refreshExpenses = async (method: 'add' | 'delete' | 'update' | 'empty' = 'empty') => {
    try {
      setIsLoading(true);
      const _expenses = await getExpensesAction(date.month, date.year);
      setExpenses(_expenses);

      const _expensesByCategory = await getCategoryExpensesAction(date.month, date.year);
      setExpenseByCategory(_expensesByCategory);
      if (['add', 'update', 'delete'].includes(method)) refreshSources();
    } catch (error) {
      console.error('Failed to load expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterExpenses = (filter: Filter) => {
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
  };

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

  useEffect(() => {
    if (currentFilters) filterExpenses(currentFilters);
  }, [currentFilters]);

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

  const getCategoryExpenses = async () => {
    try {
      const data: ExpenseByCategory[] = await getCategoryExpensesAction();
      return data;
    } catch (error) {
      console.error('Failed to load category expenses:', error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        expenseByCategory,
        isLoading,
        currentFilters,
        minAmount: Math.min(...initialExpenses.map((expense) => expense.amount)),
        maxAmount: Math.max(...initialExpenses.map((expense) => expense.amount)),
        setCurrentFilters,
        refreshExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getCategoryExpenses,
        filterExpenses
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
