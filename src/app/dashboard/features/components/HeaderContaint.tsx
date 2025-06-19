'use client';
import React, { useCallback } from 'react';
import { Plus } from 'lucide-react';
import { DialogProjectModal } from './DialogProdcut';
import { ProviderContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

interface HeaderTableProps {
  titleLink?: string;
  title?: string;
}

export function HeaderProject({ titleLink, title }: HeaderTableProps) {
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { open, setOpen, setId } = context;

  const handleOpen = useCallback(() => {
    setId(null);
    setOpen((prev) => ({ ...prev, project: !prev.project }));
  }, [setOpen, setId]);

  return (
    <>
      {open.project && <DialogProjectModal />}
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="font-extrabold text-xl md:text-2xl uppercase">
          {title || 'Untitled'}
        </h1>
        <Button
          onClick={handleOpen}
          className="gap-1.5 cursor-pointer "
          size={'lg'}
        >
          <Plus />
          Add {titleLink}
        </Button>
      </div>
    </>
  );
}
