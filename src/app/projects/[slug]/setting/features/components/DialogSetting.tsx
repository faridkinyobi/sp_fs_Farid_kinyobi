'use client';
import React from 'react';
import DialogTemplate from '@/components/molecule/DialogTemplate';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface DialogTaskDeletProps {
  deletShowModel: boolean;
  handleOpen: () => void;
  handleDelet: () => void;
}

export const DialogSettingDelet = (props: DialogTaskDeletProps) => {
  const { deletShowModel, handleOpen, handleDelet } = props;

  return (
    <DialogTemplate
      className="h-[180px] w-[400px]"
      open={deletShowModel}
      onOpenChange={handleOpen}
      title="Delete Project"
      desc="Are you sure you want to delete this Project?"
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
};
