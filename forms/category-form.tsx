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

const presetColors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#FFC733',
  '#33FFF6',
  '#8E44AD',
  '#E74C3C',
  '#2ECC71',
  '#5B5EA6',
  '#34495E',
  '#E67E22'
];

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
            style={{ borderWidth: '0px' }}
            className="h-10 w-10 p-0 cursor-pointer border-none outline-none"
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

      <div>
        <Label htmlFor="preset-colors" className="block text-sm font-medium text-gray-700">
          Preset Colors
        </Label>
        <div className="flex flex-row gap-2 flex-wrap mt-2">
          {presetColors.map((c) => (
            <div
              className="w-8 h-8 cursor-pointer rounded-full transition-transform transform hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-gray-400"
              key={c}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      <Button type="submit">{isEdit ? 'Update' : 'Add'}</Button>
    </form>
  );
}
