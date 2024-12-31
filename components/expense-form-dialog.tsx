import ExpenseForm from '@/forms/expense-form';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Expense } from '@/types/expense';
import { Edit, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';

const MobileDrawer = ({ isEdit, expense }: { isEdit: boolean; expense?: Expense }) => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Trigger isEdit={isEdit} setOpen={setOpen} />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          <DrawerHeader>
            <DrawerTitle>{isEdit ? 'Update Expense' : 'Add New Expense'}</DrawerTitle>
          </DrawerHeader>
          <div>
            <ExpenseForm
              isEdit={isEdit}
              editingExpense={isEdit ? expense : undefined}
              closeDialog={() => setOpen(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Trigger = ({
  isEdit,
  setOpen
}: {
  isEdit: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Button
      variant={isEdit ? 'ghost' : 'default'}
      size={isEdit ? 'icon' : 'default'}
      className="mr-1"
      onClick={() => setOpen(true)}
    >
      {isEdit ? (
        <Edit className="h-4 w-4" />
      ) : (
        <>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Expense
        </>
      )}
    </Button>
  );
};

export default function ExpenseFormDialog({
  isEdit = false,
  expense
}: {
  isEdit?: boolean;
  expense?: Expense;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [open, setOpen] = useState(false);
  return isMobile ? (
    <MobileDrawer isEdit={isEdit} expense={expense} />
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trigger isEdit={isEdit} setOpen={setOpen} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Update Expense' : 'Add New Expense'}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <ExpenseForm
          isEdit={isEdit}
          editingExpense={isEdit ? expense : undefined}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
