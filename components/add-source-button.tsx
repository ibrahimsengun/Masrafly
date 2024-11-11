'use client';

import { Button } from '@/components/ui/button';
import AddSourceForm from '@/forms/add-source-form';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';

export const AddSourceButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="flex flex-row items-center justify-start gap-3">
            <Plus size={16} /> Add Source
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Source</DialogTitle>
            <DialogDescription>For your expenses</DialogDescription>
          </DialogHeader>
          <AddSourceForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
