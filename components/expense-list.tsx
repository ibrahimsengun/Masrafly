'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useExpense } from '@/context/expense-context';
import { Expense } from '@/types/expense';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpense();

  const handleDelete = (id: string) => {
    deleteExpense(id);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">No expenses yet</h3>
        <p className="text-muted-foreground mb-6">
          Start tracking your expenses by adding your first one!
        </p>
        <img
          src="/placeholder.svg?height=200&width=200"
          alt="No expenses"
          className="mx-auto mb-6"
        />
        <Button>Add Your First Expense</Button>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">Latest Activites</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Expense
          </Button>
        </div>
        <ScrollArea className="h-[calc(80vh-200px)]">
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
                    <div className="flex items-center p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center mb-1">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: expense.category?.color }}
                          />
                          <span className="text-sm font-medium">{expense.category?.name}</span>
                        </div>
                        <h3 className="text-lg font-bold">${expense.amount.toFixed(2)}</h3>
                        <p className="text-sm text-muted-foreground">{expense.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{expense.source?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(expense.date, 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="ml-4 flex">
                        <Button variant="ghost" size="icon" className="mr-1">
                          <Edit className="h-4 w-4" />
                        </Button>
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
