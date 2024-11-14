import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCategory } from '@/context/category-context';
import { Category } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, 'Invalid hex color code')
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  isEdit?: boolean;
  editingCategory: Category | null;
  closeDialog?: () => void;
}

export default function CategoryForm({ isEdit, editingCategory, closeDialog }: CategoryFormProps) {
  const { updateCategory, createCategory } = useCategory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: editingCategory?.name || '',
      color: editingCategory?.color || '#000000'
    }
  });

  const [color, setColor] = useState(editingCategory?.color || '#000000');

  useEffect(() => {
    if (isEdit && editingCategory) {
      reset({ name: editingCategory.name, color: editingCategory.color });
      setColor(editingCategory.color);
    }
  }, [isEdit, editingCategory, reset]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
  };

  const onFormSubmit = (data: CategoryFormData) => {
    isEdit
      ? updateCategory(editingCategory!.id, data.name, color)
      : createCategory(data.name, color);
    if (closeDialog) closeDialog();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
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
        <Label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            id="colorPicker"
            value={color}
            onChange={handleColorChange}
            className="h-10 w-10 p-0 cursor-pointer"
          />
          <Input
            type="text"
            id="color"
            {...register('color')}
            value={color}
            onChange={(e) => {
              handleColorChange(e);
              register('color').onChange(e);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>}
      </div>

      <Button type="submit">{isEdit ? 'Update' : 'Add'}</Button>
    </form>
  );
}
