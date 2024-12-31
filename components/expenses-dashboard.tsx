'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import DateChanger from './date-changer';
import ExpenseFilters from './expense-filters';
import ExpenseList from './expense-list';
import ExpensesByCategory from './expenses-by-category';
import SourceSummary from './source-summary';

export default function ExpensesDashboard() {
  const query = useSearchParams();

  const month = query.get('month');
  const year = query.get('year');
  return (
    <>
      <div className="md:hidden mb-4 w-full">
        <DateChanger className="justify-between" />
      </div>
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${month}-${year}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="md:col-span-2">
                <ExpenseFilters />
                <ExpenseList />
              </div>
              <div className="flex flex-col gap-4">
                <DateChanger className="justify-between" />
                <SourceSummary />
                <ExpensesByCategory />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
