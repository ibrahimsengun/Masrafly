'use client';

import PriceFormatter from '@/components/price-formatter';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupCard } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCategory } from '@/context/category-context';
import { useExpense } from '@/context/expense-context';
import { useSource } from '@/context/source-context';
import { useToast } from '@/hooks/use-toast';
import { Expense } from '@/types/expense';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const expenseSchema = z.object({
  amount: z.number().positive('Amount must be a positive number'),
  description: z.string().optional(),
  date: z.date({
    required_error: 'Date is required'
  }),
  categoryId: z.string({ required_error: 'Select a category' }),
  sourceId: z.string({ required_error: 'Select a source' })
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  isEdit?: boolean;
  editingExpense?: Expense;
  closeDialog?: () => void;
}

export default function ExpenseForm({
  isEdit = false,
  editingExpense,
  closeDialog
}: ExpenseFormProps) {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: editingExpense?.amount || 0,
      description: editingExpense?.description || '',
      date: editingExpense?.date ? new Date(editingExpense.date) : new Date(),
      categoryId: editingExpense?.category?.id || undefined,
      sourceId: editingExpense?.source?.id || undefined
    }
  });

  const { categories } = useCategory();
  const { sources } = useSource();
  const { addExpense, updateExpense } = useExpense();
  const { toast } = useToast();

  const onFormSubmit = (data: ExpenseFormData) => {
    const { amount, date, categoryId, description, sourceId } = data;
    isEdit
      ? updateExpense(
          editingExpense?.id!,
          amount,
          description,
          date.toISOString(),
          categoryId!,
          sourceId!
        )
      : addExpense(amount, description!, date.toISOString(), categoryId!, sourceId!);
    toast({
      title: isEdit ? 'Expense Updated' : 'Expense Added',
      description: isEdit ? 'Your expense has been updated' : 'Your expense has been added'
    });
    if (closeDialog) closeDialog();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Source</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-y-1"
                >
                  {sources.map((source) => (
                    <FormItem key={source.id} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupCard value={source.id}>
                          <div className="p-3">
                            <p className="font-semibold">{source.name}</p>
                            <PriceFormatter price={source.balance} className="text-sm text-muted" />
                          </div>
                        </RadioGroupCard>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEdit ? 'Update Expense' : 'Add Expense'}
        </Button>
      </form>
    </Form>
  );
}
