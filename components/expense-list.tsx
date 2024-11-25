'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useExpense } from '@/context/expense-context';
import ExpenseForm from '@/forms/expense-form';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Expense } from '@/types/expense';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import PriceFormatter from './price-formatter';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpense();
  const [openAddExpenseDialog, setOpenAddExpenseDialog] = useState(false);
  const [openEditExpenseDialog, setOpenEditExpenseDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const isMobile = useMediaQuery('min-width: 768px');

  const handleDelete = (id: string) => {
    deleteExpense(id);
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-lg md:text-2xl font-semibold leading-none tracking-tight">
            Latest Activites
          </h1>
          <Dialog open={openAddExpenseDialog} onOpenChange={setOpenAddExpenseDialog}>
            <DialogTrigger asChild>
              <Button size={isMobile ? 'sm' : 'default'}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogClose />
              </DialogHeader>
              <DialogContent>
                <ExpenseForm closeDialog={() => setOpenAddExpenseDialog(false)} />
              </DialogContent>
            </DialogContent>
          </Dialog>
        </div>
        {expenses.length == 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg md:text-2xl font-semibold mb-4">No expenses yet</h3>
            <p className="text-muted-foreground mb-6">
              Start tracking your expenses by adding your first one!
            </p>
          </div>
        )}
        <ScrollArea className="h-[calc(60vh-180px)]">
          <AnimatePresence>
            {expenses.map((expense: Expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="mb-4 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center mb-1">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: expense.category?.color }}
                          />
                          <span className="text-sm font-medium">{expense.category?.name}</span>
                        </div>
                        <h3 className="text-lg font-bold">
                          <PriceFormatter price={expense.amount} />
                        </h3>
                        <p className="text-sm text-muted-foreground mr-4 self-center">
                          {expense.description}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium">{expense.source?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(expense.date, 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="ml-4 flex">
                        <Dialog
                          open={openEditExpenseDialog}
                          onOpenChange={setOpenEditExpenseDialog}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="mr-1"
                              onClick={() => setEditingExpense(expense)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Expense</DialogTitle>
                              <DialogClose />
                            </DialogHeader>
                            <DialogContent>
                              <ExpenseForm
                                isEdit
                                editingExpense={editingExpense!}
                                closeDialog={() => setOpenEditExpenseDialog(false)}
                              />
                            </DialogContent>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(expense.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
