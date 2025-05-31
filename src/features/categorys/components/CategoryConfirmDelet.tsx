import { DialogCatagoryProps } from '../types/types';
import DialogTemplate from '@/components/molecule/DialogTemplate';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { ProviderContext } from '@/context/ThemeContext';

export default function CatagoryComfirmDelet({
  onOpenChange,
  open,
  handleCloseModelComfrime,
}: DialogCatagoryProps) {
  // Context
  const context = useContext(ProviderContext);
  if (!context) return null;
  const { idCatagory } = context;
  // console.log('context=comfrem', idCatagory);

  return (
    <DialogTemplate
      className="h-[180px]"
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Category"
      desc={`Delete category “${idCatagory?.name}”? This will remove it from master data permanently.`}
    >
      <DialogFooter className="flex justify-end flex-row gap-2">
        <Button
          type="button"
          variant={'outline'}
          className="font-medium"
          onClick={() => onOpenChange(!open)}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCloseModelComfrime}
          type="submit"
          variant={'destructive'}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogTemplate>
  );
}
