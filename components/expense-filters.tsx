'use client';

import { useCategory } from '@/context/category-context';
import { useExpense } from '@/context/expense-context';
import { useSource } from '@/context/source-context';
import { OrderEnum, orderOptions } from '@/types/expense';
import { ArrowDownUp, ListRestart, Tag, Wallet } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function ExpenseFilters() {
  const { currentFilters, setCurrentFilters, orderExpenses } = useExpense();
  const { categories } = useCategory();
  const { sources } = useSource();

  const [selectedOrderType, setSelectedOrderType] = useState<string>();

  const handleSelectChange = (value: string) => {
    setSelectedOrderType(value);
    orderExpenses(value as OrderEnum);
  };

  // const [amountFilterValue, setAmountFilterValue] = useState([minAmount, maxAmount]);

  //  const handleSliderChange = useCallback((value: number[]) => {
  //    setCurrentFilters((prev) => ({ ...prev, minAmount: value[0], maxAmount: value[1] }));
  //  }, []);

  const setCategoryFilter = useCallback((selectedCategoryIds: string[]) => {
    setCurrentFilters((prev) => ({ ...prev, selectedCategoryIds }));
  }, []);

  const setSourceFilter = useCallback((selectedSourceIds: string[]) => {
    setCurrentFilters((prev) => ({ ...prev, selectedSourceIds }));
  }, []);

  const handleItemChange = useCallback(
    (checked: boolean, id: string, type: 'source' | 'category') => {
      if (checked) {
        if (type === 'category') {
          setCategoryFilter([...(currentFilters?.selectedCategoryIds || []), id]);
        }
        if (type === 'source') {
          setSourceFilter([...(currentFilters?.selectedSourceIds || []), id]);
        }
      } else {
        if (type === 'category') {
          setCategoryFilter(
            (currentFilters?.selectedCategoryIds || []).filter((categoryId) => categoryId !== id)
          );
        }
        if (type === 'source') {
          setSourceFilter(
            (currentFilters?.selectedSourceIds || []).filter((sourceId) => sourceId !== id)
          );
        }
      }
    },
    [currentFilters]
  );

  return (
    <div className="flex flex-row justify-between my-4 md:mt-0">
      <div className="flex flex-row  flex-wrap gap-4">
        <Popover modal>
          <PopoverTrigger asChild>
            <Button
              variant={currentFilters?.selectedCategoryIds?.length ? 'default' : 'outline'}
              className="flex flex-row gap-2"
              size="sm"
            >
              <Tag className="w-4" /> Category
              {(currentFilters?.selectedCategoryIds?.length || 0) > 0 ? (
                <span className="font-bold">{`(${currentFilters?.selectedCategoryIds?.length})`}</span>
              ) : (
                ''
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="flex flex-col gap-4">
              <span className="text-base">Filter Categories</span>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex flex-row gap-2 items-center">
                    <Checkbox
                      id={category.id}
                      value={category.id}
                      checked={currentFilters?.selectedCategoryIds?.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleItemChange(checked as boolean, category.id, 'category')
                      }
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

        <Popover modal>
          <PopoverTrigger asChild>
            <Button
              variant={currentFilters?.selectedSourceIds?.length ? 'default' : 'outline'}
              className="flex flex-row gap-2"
              size="sm"
            >
              <Wallet className="w-4" /> Source
              {(currentFilters?.selectedSourceIds?.length || 0) > 0 ? (
                <span className="font-bold">{`(${currentFilters?.selectedSourceIds?.length})`}</span>
              ) : (
                ''
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="flex flex-col gap-4">
              <span className="text-base">Filter Sources</span>
              <div className="flex flex-col gap-2">
                {sources.map((source) => (
                  <div key={source.id} className="flex flex-row gap-2 items-center">
                    <Checkbox
                      id={source.id}
                      value={source.id}
                      checked={currentFilters?.selectedSourceIds?.includes(source.id)}
                      onCheckedChange={(checked) =>
                        handleItemChange(checked as boolean, source.id, 'source')
                      }
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

        {/* <div className="flex flex-row gap-2 border rounded-md px-3 items-center">
        <Hash className="w-4" />
        <Slider
          className="w-24"
          multipleThumb
          min={minAmount}
          max={maxAmount}
          value={amountFilterValue}
          defaultValue={[minAmount, maxAmount]}
          onValueChange={setAmountFilterValue}
          onValueCommit={handleSliderChange}
        />
        {amountFilterValue[0] + ' - ' + amountFilterValue[1]}
      </div> */}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentFilters({ selectedCategoryIds: [], selectedSourceIds: [] })}
          className="flex flex-row items-center gap-2"
        >
          <ListRestart className="w-5" />
          Reset Filters
        </Button>
      </div>
      <div>
        <Select value={selectedOrderType} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-42 h-9">
            <SelectValue
              placeholder={
                <span className="flex flex-row items-center gap-2">
                  <ArrowDownUp className="w-4" /> Order
                </span>
              }
            />
            <SelectContent>
              {orderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex flex-row gap-2 items-center">
                    <option.icon className="w-4" />
                    <span className="text-nowrap pr-2">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
}
