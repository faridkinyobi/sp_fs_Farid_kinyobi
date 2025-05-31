import CategoryForm from './CategoryForm';
import { DialogCatagoryProps } from '../types/types';

import DialogTemplate from '@/components/molecule/DialogTemplate';
import React from 'react';
import { ProviderContext } from '@/context/ThemeContext';
export default function DialogCatagory({
  onOpenChange,
  open,
}: DialogCatagoryProps) {
  const context = React.useContext(ProviderContext);
  if (!context) return null;
  const { idCatagory } = context;

  return (
    <DialogTemplate
      className="h-[240px]"
      open={open}
      onOpenChange={onOpenChange}
      title={`${idCatagory?.id ? 'Edit Category' : 'Add Category'}`}
    >
      <CategoryForm onClose={() => onOpenChange(!open)} />
    </DialogTemplate>
  );
}
