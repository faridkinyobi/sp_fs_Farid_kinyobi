import { z } from 'zod';
import { SchemaZod } from '../schemas/schemaZod';

export type IcategoryForm = z.infer<typeof SchemaZod>;

export type IuseCategoryProps = {
  onSuccess: (data: IreponsCatagory) => void;
};

export type IreponsCatagory = {
  id: string;
  name: string;
};

export type DialogCatagoryProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  handleCloseModelComfrime?: () => void;
};

export type CatagoryFormProps = {
  onClose: () => void;
};

export type Icategory = {
  id: string;
  name: string;
  createdAt: string;
};

export type IstateTableCatagory = {
  title?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
  search?: string;
  select?: string;
};
export type TypePropsPegination = {
  page: number;
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};
