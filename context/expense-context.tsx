// context/ExpenseContext.tsx
'use client';

import {
  addExpenseAction,
  deleteExpenseAction,
  getCategoryExpensesAction,
  getExpensesAction,
  updateExpenseAction
} from '@/actions/expense-actions';
import { Expense, ExpenseByCategory } from '@/types/expense';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useSource } from './source-context';

interface ExpenseContextType {
  expenses: Expense[];
  expenseByCategory: ExpenseByCategory[];
  isLoading: boolean;
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

  useEffect(() => {
    if (!isLoading && (expenses || initialExpenses)) {
      setIsLoading(false);
    }
  }, [expenses, initialExpenses]);

  useEffect(() => {
    setExpenses(initialExpenses);
  }, [initialExpenses]);

  const refreshExpenses = async (method: 'add' | 'delete' | 'update' | 'empty' = 'empty') => {
    try {
      setIsLoading(true);
      const _expenses = await getExpensesAction(date.month, date.year);
      setExpenses(_expenses);

      const _expensesByCategory = await getCategoryExpensesAction();
      setExpenseByCategory(_expensesByCategory);
      if (['add', 'update', 'delete'].includes(method)) refreshSources();
    } catch (error) {
      console.error('Failed to load expenses:', error);
    } finally {
      setIsLoading(false);
    }
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
        refreshExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getCategoryExpenses
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
