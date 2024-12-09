'use client';

import { useCategory } from '@/context/category-context';
import { useSource } from '@/context/source-context';
import { Tag, Wallet } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface Filter {
  selectedCategoryIds?: string[];
  selectedSourceIds?: string[];
  minAmount?: number;
  maxAmount?: number;
}

export default function ExpenseFilters() {
  const { categories } = useCategory();
  const { sources } = useSource();
  const [filters, setFilters] = useState<Filter>();

  const handleItemChange = useCallback(() => {}, []);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg">Filters</span>
      <div className="flex flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex flex-row gap-2" size="sm">
              <Tag className="w-4" /> Category
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <span className="text-base">Filter Categories</span>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex flex-row gap-2 items-center">
                    <Checkbox
                      id={category.id}
                      value={category.id}
                      checked={filters?.selectedCategoryIds?.includes(category.id)}
                      onCheckedChange={() => handleItemChange}
                    />
                    <Label
                      htmlFor={category.id}
                      className="flex flex-row gap-2 items-center text-base"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex flex-row gap-2" size="sm">
              <Wallet className="w-4" /> Source
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <span className="text-base">Filter Sources</span>
              <div className="flex flex-col gap-2">
                {sources.map((source) => (
                  <div key={source.id} className="flex flex-row gap-2 items-center">
                    <Checkbox
                      id={source.id}
                      value={source.id}
                      checked={filters?.selectedCategoryIds?.includes(source.id)}
                      onCheckedChange={() => handleItemChange}
                    />
                    <Label
                      htmlFor={source.id}
                      className="flex flex-row gap-2 items-center text-base"
                    >
                      {source.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
