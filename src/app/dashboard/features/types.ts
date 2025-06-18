export type IuseProjectProps = {
  onSuccess: (data: any) => void;
};

export type DialogProjectProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  handleCloseModelComfrime?: () => void;
};
