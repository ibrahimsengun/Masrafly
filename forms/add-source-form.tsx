// components/AddSourceForm.tsx
'use client';

import { addSource } from '@/actions/source-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const sourceSchema = z.object({
  name: z.string().min(1, 'Source name is required'),
  balance: z.number().min(0, 'Balance must be a positive number')
});

type SourceFormData = z.infer<typeof sourceSchema>;

export default function AddSourceForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SourceFormData>({
    resolver: zodResolver(sourceSchema)
  });

  const onSubmit = async (data: SourceFormData) => {
    setError(null);
    setSuccess(false);

    try {
      await addSource(data.name, data.balance);
      reset();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to add source');
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
          Initial Balance
        </Label>
        <Input
          type="number"
          id="balance"
          {...register('balance', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.balance && <p className="mt-1 text-sm text-red-600">{errors.balance.message}</p>}
      </div>

      <Button type="submit">Add Source</Button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">Source added successfully!</p>}
    </form>
  );
}
