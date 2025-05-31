'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export type DialogCatagoryProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  children: React.ReactNode;
  title: string;
  desc?: string;
  className?: string;
};
export default function DialogTemplate({
  onOpenChange,
  open,
  children,
  title,
  desc,
  className,
}: DialogCatagoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`[&>button.absolute]:hidden ${className}  w-[400px]`}
      >
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
