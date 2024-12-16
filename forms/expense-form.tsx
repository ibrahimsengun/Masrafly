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
import { cn } from '@/lib/utils';
import { Expense } from '@/types/expense';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
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

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openCategorySelect, setOpenCategorySelect] = useState(false);

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
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const nextInput = e.currentTarget
                    .closest('form')
                    ?.querySelector<HTMLInputElement>(`input[name="description"]`);
                  nextInput?.focus();
                }
              }}
            >
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} onChange={field.onChange} inputMode="numeric" pattern="[0-9]*" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  e.preventDefault();
                  setOpenCalendar(true);
                }
              }}
            >
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
              <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
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
                    onSelect={(e) => {
                      field.onChange(e);
                      setOpenCalendar(false);
                      setOpenCategorySelect(true);
                    }}
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                open={openCategorySelect}
                onOpenChange={setOpenCategorySelect}
              >
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
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  style={{ flexWrap: 'wrap' }}
                  className="flex flex-row"
                >
                  {sources.map((source) => (
                    <FormItem key={source.id}>
                      <FormControl>
                        <RadioGroupCard value={source.id}>
                          <div className="p-3">
                            <p className="font-semibold text-sm whitespace-nowrap">{source.name}</p>
                            <PriceFormatter price={source.balance} className="text-xs" />
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
