'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSource } from '@/context/source-context';
import { useToast } from '@/hooks/use-toast';
import { Source } from '@/types/source';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const sourceSchema = z.object({
  name: z.string().min(1, 'Source name is required'),
  balance: z.number().min(0, 'Balance must be a positive number')
});

type SourceFormData = z.infer<typeof sourceSchema>;

interface AddSourceFormProps {
  isEdit?: boolean;
  editingSource?: Source;
  closeDialog?: () => void;
}

export default function SourceForm({
  isEdit = false,
  editingSource,
  closeDialog
}: AddSourceFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { addSource, updateSource } = useSource();

  const { refreshSources } = useSource();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SourceFormData>({
    resolver: zodResolver(sourceSchema),
    defaultValues: editingSource || { name: '', balance: 0 }
  });

  const onSubmit = async (data: SourceFormData) => {
    setError(null);
    setSuccess(false);

    try {
      if (isEdit && editingSource) {
        // Kaynak düzenleme işlemi
        await updateSource(editingSource.id, data.name, data.balance);
        toast({
          title: 'Source updated successfully!',
          description: 'Your source has been updated.'
        });
      } else {
        // Yeni kaynak ekleme işlemi
        await addSource(data.name, data.balance);
        toast({
          title: 'Source added successfully!',
          description: 'Your source has been added to your account.'
        });
      }

      reset();
      setSuccess(true);
      refreshSources();
      if (closeDialog) closeDialog();
    } catch (err: any) {
      setError(err.message || 'Failed to process the request');
      toast({
        title: `Failed to ${isEdit ? 'update' : 'add'} source`,
        description: err.message || 'An error occurred.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Source Name
        </Label>
        <Input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="balance" className="block text-sm font-medium text-gray-700">
          Balance
        </Label>
        <Input
          type="number"
          id="balance"
          {...register('balance', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.balance && <p className="mt-1 text-sm text-red-600">{errors.balance.message}</p>}
      </div>

      <Button type="submit">{isEdit ? 'Update Source' : 'Add Source'}</Button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && (
        <p className="mt-2 text-sm text-green-600">
          {isEdit ? 'Source updated successfully!' : 'Source added successfully!'}
        </p>
      )}
    </form>
  );
}
