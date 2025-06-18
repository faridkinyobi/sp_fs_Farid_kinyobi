'use client';
import React from 'react';
import DialogTemplate from '@/components/molecule/DialogTemplate';
import { ProviderContext } from '@/context/ThemeContext';
import FormTask from './FormTask';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useMutationDeletTask } from '../useMutation';
import toast from 'react-hot-toast';

export const DialogTaskModal = React.memo(() => {
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { id, open, setOpen } = context;

  const handleOpen = () => {
    return setOpen((prev: typeof open) => ({ ...prev, task: !prev.task }));
  };
  return (
    <DialogTemplate
      open={open.task}
      onOpenChange={() => handleOpen()}
      className="min-h-fit w-[400px]"
      title={`${id?.id ? 'Edit Task' : 'Add Task'}`}
    >
      <FormTask />
    </DialogTemplate>
  );
});

interface DialogTaskDeletProps {
  deletShowModel: boolean;
  setDeletShowModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogTaskDelet = React.memo(
  ({ deletShowModel, setDeletShowModel }: DialogTaskDeletProps) => {
    const context = React.useContext(ProviderContext);
    if (!context) return null;
    const { id } = context;
    const handleOpen = () => {
      setDeletShowModel((prev) => !prev);
    };

    const { mutate } = useMutationDeletTask({
      onSuccess: (res) => {
        if (res.status === 'error') {
          toast.error(res.error.message);
          return;
        }
        toast.success('Create Successfully');
        setTimeout(() => {
          setDeletShowModel(!deletShowModel);
          window.location.reload();
        }, 400);
      },
    });

    const handleDelet = () => {
      if (id && id.id) {
        mutate(id.id as string);
      }
    };
    
    return (
      <DialogTemplate
        className="h-[180px] w-[400px]"
        open={deletShowModel}
        onOpenChange={handleOpen}
        title="Delete Task"
        desc="Are you sure you want to delete this task?"
      >
        <DialogFooter className="flex justify-end flex-row gap-2">
          <Button
            type="button"
            variant={'outline'}
            onClick={handleOpen}
            className="font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelet()}
            type="button"
            variant={'destructive'}
            className=" cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogTemplate>
    );
  },
);
