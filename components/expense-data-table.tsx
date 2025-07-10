'use client';

import { Expense } from '@/types/expense';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { DataTable } from './data-table';
import PriceFormatter from './price-formatter';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      const amount = props.row.original.amount;
      return <PriceFormatter price={amount} />;
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      const date = props.row.original.date;
      return format(new Date(date), 'dd MMM yyyy');
    }
  },
  {
    accessorKey: 'category',
    accessorFn: (row) => row.category?.name,
    header: ({ column }) => {
      return (
        <Button
          className="px-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      const category = props.row.original.category;
      return <Badge style={{ backgroundColor: category?.color }}>{category?.name}</Badge>;
    }
  },
  {
    accessorKey: 'description',
    header: 'Description'
  }
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const ExpenseDataTable = ({ expenses }: { expenses: Expense[] }) => {
  console.log(expenses);
  return (
    <div className="w-full">
      <DataTable columns={columns} data={expenses} />
    </div>
  );
};

export default ExpenseDataTable;
