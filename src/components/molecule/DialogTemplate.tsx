'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import React from 'react';

export type DialogCatagoryProps = {
  children: React.ReactNode;
  title?: string;
  desc?: string;
  className?: string;
  open: boolean;
  onOpenChange: () => void;
};
export default function DialogTemplate({
  open,
  children,
  title,
  desc,
  className,
  onOpenChange,
}: DialogCatagoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`[&>button.absolute]:hidden ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription aria-describedby={desc ? undefined : ''}>
            {desc}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
