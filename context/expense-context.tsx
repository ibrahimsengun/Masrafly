// context/ExpenseContext.tsx
'use client';

import {
  addExpenseAction,
  deleteExpenseAction,
  getExpensesAction,
  updateExpenseAction
} from '@/actions/expense-actions';
import { Expense } from '@/types/expense';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ExpenseContextType {
  expenses: Expense[];
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
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({
  children,
  initialExpenses
}: {
  children: ReactNode;
  initialExpenses: Expense[];
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const refreshExpenses = async () => {
    try {
      const data = await getExpensesAction();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to load expenses:', error);
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
      const newExpense = await addExpenseAction(amount, description, date, categoryId, sourceId);
      setExpenses((prev) => [newExpense, ...prev]);
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
      const updatedExpense = await updateExpenseAction(
        expenseId,
        amount,
        description,
        date,
        categoryId,
        sourceId
      );
      setExpenses((prev) =>
        prev.map((expense) => (expense.id === expenseId ? updatedExpense : expense))
      );
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  const deleteExpense = async (expenseId: string) => {
    try {
      await deleteExpenseAction(expenseId);
      setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{ expenses, refreshExpenses, addExpense, updateExpense, deleteExpense }}
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
