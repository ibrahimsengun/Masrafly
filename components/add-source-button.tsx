'use client';

import { Button } from '@/components/ui/button';
import SourceForm from '@/forms/source-form';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';

export const AddSourceButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="flex flex-row items-center justify-start gap-3">
            <PlusCircle size={16} /> Add New Source
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Source</DialogTitle>
            <DialogDescription>For your expenses</DialogDescription>
          </DialogHeader>
          <SourceForm closeDialog={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
