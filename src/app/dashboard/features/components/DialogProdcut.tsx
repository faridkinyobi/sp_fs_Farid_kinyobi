'use client';
import React from 'react';
import DialogTemplate from '@/components/molecule/DialogTemplate';
import { ProviderContext } from '@/context/ThemeContext';
import FormProject from './FormProject';

export const DialogProjectModal = React.memo(() => {
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { id, open, setOpen,setId } = context;

  const handleOpen = () => {
    return setOpen({ ...open, project: !open.project });
  };

  return (
    <DialogTemplate
      open={open.project}
      onOpenChange={() => handleOpen()}
      className="min-h-fit w-[400px]"
      title={`${id?.id ? 'Edit Project' : 'Add Project'}`}
    >
      <FormProject />
    </DialogTemplate>
  );
});
