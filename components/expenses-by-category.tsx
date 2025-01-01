'use client';

import { ExpenseByCategory } from '@/types/expense';
import { AnimatePresence, motion } from 'framer-motion';
import PriceFormatter from './price-formatter';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function ExpensesByCategory({
  expensesByCategory
}: {
  expensesByCategory: ExpenseByCategory[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-lg">Expenses By Category</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <div className="flex flex-col gap-2">
            {expensesByCategory.length == 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-muted-foreground">There is no data</div>
              </motion.div>
            )}
            {expensesByCategory?.map((category) => (
              <motion.div
                key={category.category_name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between">
                  <div className="flex flex-row gap-1 items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.category_color }}
                    />
                    <span>{category.category_name}</span>
                  </div>
                  <span>
                    <PriceFormatter price={category.total_expense} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
