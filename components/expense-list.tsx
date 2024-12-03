'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useExpense } from '@/context/expense-context';
import { Expense } from '@/types/expense';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import ExpenseFormDialog from './expense-form-dialog';
import PriceFormatter from './price-formatter';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpense();

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex justify-between">
          <CardTitle className="md:text-lg">Latest Expenses</CardTitle>
          <ExpenseFormDialog />
        </div>

        <ScrollArea className="lg:h-[calc(80vh-170px)]">
          <AnimatePresence>
            {expenses.length == 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center py-12">
                  <h3 className="text-lg md:text-2xl font-semibold mb-4">No expenses yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start tracking your expenses by adding your first one!
                  </p>
                </div>
              </motion.div>
            )}
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
                    <div className="flex items-center p-2 md:p-3 hover:bg-muted/50 transition-colors">
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
                        <ExpenseFormDialog isEdit expense={expense} />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Are you sure?</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">No</Button>
                              </DialogClose>
                              <Button variant="default" onClick={() => deleteExpense(expense.id)}>
                                Yes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
