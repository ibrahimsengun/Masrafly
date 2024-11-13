import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';

export default function RemoveDialog({
  trigger,
  handleDelete,
  description
}: {
  trigger: ReactNode;
  handleDelete: () => void;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <DialogFooter>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button variant="default" onClick={handleDelete}>
            Yes
          </Button>
        </DialogFooter>
      </DialogFooter>
    </Dialog>
  );
}
