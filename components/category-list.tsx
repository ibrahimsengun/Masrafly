'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCategory } from '@/context/category-context';
import CategoryForm from '@/forms/category-form';
import { Category } from '@/types/category';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CategoryList() {
  const { categories, deleteCategory } = useCategory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  return (
    <div className="min-h-[70vh] w-full">
      <Card className="mx-auto">
        <CardHeader className="flex flex-row justify-between pt-6">
          <CardTitle className="text-lg md:text-2xl font-semibold leading-none tracking-tight">
            Manage Categories
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                <DialogDescription>
                  {editingCategory
                    ? 'Edit your category details here.'
                    : 'Create a new category for your expenses.'}
                </DialogDescription>
              </DialogHeader>
              <CategoryForm
                isEdit={!!editingCategory}
                editingCategory={editingCategory}
                closeDialog={() => setIsDialogOpen(false)}
              />
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't created any categories yet.</p>
              <Button onClick={() => setIsDialogOpen(true)}>Create Your First Category</Button>
            </div>
          ) : (
            <ScrollArea className="h-[50vh] md:h-[calc(80vh-170px)] pr-4">
              <AnimatePresence>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="flex flex-col justify-between">
                        <CardContent className="p-3 pt-6">
                          <div className="flex flex-col items-center gap-2 mb-2">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <h3 className="text-lg font-semibold">{category.name}</h3>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingCategory(category);
                                  setIsDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteCategory(category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
