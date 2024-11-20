'use client';

import { useSource } from '@/context/source-context';
import SourceForm from '@/forms/source-form';
import { Source } from '@/types/source';
import { format } from 'date-fns';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { AddSourceButton } from './add-source-button';
import PriceFormatter from './price-formatter';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const SourceTable = () => {
  const { sources, deleteSource } = useSource();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [editingSource, setEditingSource] = useState<Source>();
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Your Sources</CardTitle>
          <AddSourceButton />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.map((source) => {
              return (
                <TableRow key={source.id}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>
                    <PriceFormatter price={source.balance} />
                  </TableCell>
                  <TableCell>{format(source.created_at, 'PPP')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSource(source)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Update Source</DialogTitle>
                          <SourceForm
                            isEdit
                            editingSource={editingSource}
                            closeDialog={() => setOpenUpdateDialog(false)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>You remove "{source.name}" source.</DialogDescription>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">No</Button>
                            </DialogClose>
                            <Button variant="default" onClick={() => deleteSource(source.id)}>
                              Yes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
