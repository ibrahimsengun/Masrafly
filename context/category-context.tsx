'use client';

import {
  createCategoryAction,
  deleteCategoryAction,
  getCategoriesAction,
  updateCategoryAction
} from '@/actions/category-actions';
import { Category } from '@/types/category';
import { createContext, ReactNode, useContext, useState } from 'react';

interface CategoryContextType {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  refreshCategories: () => Promise<void>;
  createCategory: (name: string, color: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, name: string, color: string) => Promise<void>;
}
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({
  children,
  initialCategories
}: {
  children: ReactNode;
  initialCategories: Category[];
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const refreshCategories = async () => {
    try {
      const updatedCategories = await getCategoriesAction();
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Failed to refresh sources:', error);
    }
  };

  const createCategory = async (name: string, color: string) => {
    try {
      await createCategoryAction(name, color);
      refreshCategories();
    } catch (error) {
      console.error('Failed to refresh sources:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteCategoryAction(id);
      refreshCategories();
    } catch (error) {
      console.error('Failed to refresh sources:', error);
    }
  };

  const updateCategory = async (id: string, name: string, color: string) => {
    try {
      await updateCategoryAction(id, name, color);
      refreshCategories();
    } catch (error) {
      console.error('Failed to refresh sources:', error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        refreshCategories,
        createCategory,
        deleteCategory,
        updateCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useSourceContext must be used within a SourceProvider');
  }
  return context;
};
