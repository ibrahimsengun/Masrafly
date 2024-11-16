'use client';

import { ExpenseByCategory } from '@/types/expense';
import { AnimatePresence, motion } from 'framer-motion';
import PriceFormatter from './price-formatter';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function ExpensesByCategory({ data }: { data: ExpenseByCategory[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses By Category</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <div className="flex flex-col gap-2">
            {data?.map((category) => (
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
                    <PriceFormatter price={category.total_amount} />
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
