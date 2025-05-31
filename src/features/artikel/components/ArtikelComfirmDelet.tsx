import { DialogArtikelProps } from '../types/types';
import DialogTemplate from '@/components/molecule/DialogTemplate';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ArtikelComfirmDelet({
  onOpenChange,
  open,
 handleSuksesModelComfrime,
}: DialogArtikelProps) {
  return (
    <DialogTemplate
      className="h-[180px]"
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Articles"
      desc={`Deleting this article is permanent and cannot be undone. All related content will be removed.`}
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
          onClick={handleSuksesModelComfrime}
          type="submit"
          variant={'destructive'}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogTemplate>
  );
}
